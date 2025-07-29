import React, { useState } from 'react';
import { HiTruck, HiScale, HiCube, HiCheck, HiDocumentText, HiClipboardList, HiShoppingCart, HiBookOpen } from 'react-icons/hi';
import { ProductDetailsContent, ProductSpecification } from '../../types';
import { Helmet } from 'react-helmet';

interface ProductDetailsTableProps {
  details: ProductDetailsContent;
  productTitle: string;
}

type TabType = 'description' | 'specifications' | 'instructions' | 'shipping';

const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({ details, productTitle }) => {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  // Only show tabs that have content
  const availableTabs: TabType[] = [];
  
  // Add tabs only if they have content
  if (details?.description?.content?.length) availableTabs.push('description');
  if (details?.specifications?.content?.length) availableTabs.push('specifications');
  if (details?.instructions?.content?.length) availableTabs.push('instructions');
  if (details?.shipping?.content?.length) availableTabs.push('shipping');

  // If no tabs are available, show at least description
  if (availableTabs.length === 0) availableTabs.push('description');

  // Set active tab to first available if current is not available
  React.useEffect(() => {
    if (!availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0]);
    }
  }, [availableTabs, activeTab]);

  const getTabIcon = (tab: TabType) => {
    const icons = {
      description: HiDocumentText,
      specifications: HiClipboardList,
      instructions: HiBookOpen,
      shipping: HiTruck
    };
    const Icon = icons[tab];
    return <Icon className="h-5 w-5" />;
  };

  const getSpecificationIcon = (spec: ProductSpecification) => {
    if (!spec.icon) return <HiCheck className="w-5 h-5 text-gray-400 mt-0.5" />;
    
    const icons = {
      weight: HiScale,
      packSize: HiCube,
      quantity: HiCheck,
      origin: HiCheck,
      storage: HiCheck,
      custom: HiCheck
    };
    
    const Icon = icons[spec.icon];
    return <Icon className="w-5 h-5 text-gray-400 mt-0.5" />;
  };

  // Prepare schema data safely
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productTitle,
    "description": details?.description?.content?.join(" ") || "",
    ...(details?.description?.schema || {}),
    "additionalProperty": [
      ...(details?.specifications?.schema || []),
      ...(details?.instructions?.schema?.steps?.map((step: any) => ({
        "@type": "PropertyValue",
        "name": "instruction",
        "value": step.text
      })) || [])
    ],
    "offers": {
      "@type": "Offer",
      "shippingDetails": details?.shipping?.schema || []
    }
  };

  return (
    <>
      {/* Schema.org markup */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {availableTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-4 text-sm font-medium border-b-2 transition-colors flex items-center justify-center space-x-2 ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {getTabIcon(tab)}
              <span className="capitalize">{tab}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="prose prose-sm max-w-none">
              {(details?.description?.content || ['No description available.']).map((paragraph, index) => (
                <p 
                  key={index} 
                  className="mb-4 text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === 'specifications' && (
            <div className="space-y-4">
              {(details?.specifications?.content || []).map((spec, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {getSpecificationIcon(spec)}
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      {spec.label}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">{spec.value}</dd>
                  </div>
                </div>
              ))}
              {(!details?.specifications?.content || details.specifications.content.length === 0) && (
                <p className="text-gray-500">No specifications available.</p>
              )}
            </div>
          )}

          {/* Instructions Tab */}
          {activeTab === 'instructions' && (
            <div className="space-y-2">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 flex items-center">
                  <HiBookOpen className="w-5 h-5 mr-2" />
                  Follow these instructions carefully for the best experience with your {productTitle}.
                </p>
              </div>
              
              <div className="grid gap-2">
                {(details?.instructions?.content || []).map((instruction, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <span className="text-sm font-semibold">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 text-base font-medium leading-relaxed">
                        {instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {(!details?.instructions?.content || details.instructions.content.length === 0) && (
                <div className="text-center py-8">
                  <HiBookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No instructions available.</p>
                </div>
              )}
            </div>
          )}

          {/* Shipping Tab */}
          {activeTab === 'shipping' && (
            <div className="space-y-6">
              {(details?.shipping?.content || []).map((method, index) => (
                <div key={index} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                  <HiTruck className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <dt className="text-sm font-medium text-gray-900">{method.name}</dt>
                    <dd className="mt-1 text-sm text-gray-500">
                      {method.price === 0 ? (
                        <span className="text-green-600 font-medium">FREE</span>
                      ) : (
                        <span>£{method.price.toFixed(2)}</span>
                      )}
                      <span className="mx-2">•</span>
                      {method.estimatedDays}
                    </dd>
                  </div>
                </div>
              ))}
              
              {details?.shipping?.freeShippingThreshold && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-800 flex items-center">
                    <HiShoppingCart className="w-5 h-5 mr-2" />
                    Free shipping on orders over £{details.shipping.freeShippingThreshold}
                  </p>
                </div>
              )}
              {(!details?.shipping?.content || details.shipping.content.length === 0) && (
                <p className="text-gray-500">No shipping information available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsTable; 