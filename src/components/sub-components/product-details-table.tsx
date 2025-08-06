import React, { useState, useRef, useEffect } from 'react';
import { HiTruck, HiScale, HiCube, HiCheck, HiDocumentText, HiClipboardList, HiShoppingCart, HiBookOpen, HiInformationCircle, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { ProductDetailsContent, ProductSpecification } from '../../types';
import { Helmet } from 'react-helmet';

interface ProductDetailsTableProps {
  details: ProductDetailsContent;
  productTitle: string;
}

type TabType = 'description' | 'productInformation' | 'specifications' | 'instructions' | 'shipping';

const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({ details, productTitle }) => {
  const [activeTab, setActiveTab] = useState<TabType>('description');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  // Only show tabs that have content
  const availableTabs: TabType[] = [];
  
  // Add tabs only if they have content
  if (details?.description?.content?.length) availableTabs.push('description');
  if (details?.productInformation?.content?.length) availableTabs.push('productInformation');
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

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (tabContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll left
  const scrollLeft = () => {
    if (tabContainerRef.current) {
      tabContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (tabContainerRef.current) {
      tabContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Check scroll position on mount and resize
  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [availableTabs]);

  // Check scroll position when tabs change
  useEffect(() => {
    setTimeout(checkScrollPosition, 100);
  }, [availableTabs]);

  const getTabIcon = (tab: TabType) => {
    const icons = {
      description: HiDocumentText,
      productInformation: HiInformationCircle,
      specifications: HiClipboardList,
      instructions: HiBookOpen,
      shipping: HiTruck
    };
    const Icon = icons[tab];
    return <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />;
  };

  const getSpecificationIcon = (spec: ProductSpecification) => {
    if (!spec.icon) return <HiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-0.5" />;
    
    const icons = {
      weight: HiScale,
      packSize: HiCube,
      quantity: HiCheck,
      origin: HiCheck,
      storage: HiCheck,
      custom: HiCheck
    };
    
    const Icon = icons[spec.icon];
    return <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-0.5" />;
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
        <div className="relative border-b border-gray-200">
          {/* Left Scroll Arrow */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-8 bg-white bg-opacity-90 hover:bg-opacity-100 border-r border-gray-200 transition-all duration-200 scroll-arrow scroll-fade-left"
              aria-label="Scroll left"
            >
              <HiChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
          )}
          
          {/* Right Scroll Arrow */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-8 bg-white bg-opacity-90 hover:bg-opacity-100 border-l border-gray-200 transition-all duration-200 scroll-arrow scroll-fade-right"
              aria-label="Scroll right"
            >
              <HiChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          )}
          
          {/* Tab Container */}
          <div 
            ref={tabContainerRef}
            className="flex flex-nowrap overflow-x-auto tab-container"
            onScroll={checkScrollPosition}
            style={{ 
              paddingLeft: canScrollLeft ? '32px' : '0',
              paddingRight: canScrollRight ? '32px' : '0'
            }}
          >
            {availableTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 min-w-fit max-w-full ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                style={{ minWidth: 'max-content' }}
              >
                <span className="flex-shrink-0">
                  {getTabIcon(tab)}
                </span>
                <span className="capitalize tab-text text-center">
                  {tab === 'productInformation' ? 'Product Info' : tab}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="prose prose-sm max-w-none">
              {(details?.description?.content || ['No description available.']).map((paragraph, index) => (
                <p 
                  key={index} 
                  className="mb-4 text-base sm:text-lg text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          )}

          {/* Product Information Tab */}
          {activeTab === 'productInformation' && (
            <div className="space-y-3 sm:space-y-4">
              {(details?.productInformation?.content || []).map((item, index) => (
                <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                  <HiInformationCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm sm:text-base lg:text-lg font-medium text-gray-500 mb-1">
                      {item.heading}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-900 leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
              {(!details?.productInformation?.content || details.productInformation.content.length === 0) && (
                <p className="text-base text-gray-500">No product information available.</p>
              )}
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === 'specifications' && (
            <div className="space-y-3 sm:space-y-4">
              {(details?.specifications?.content || []).map((spec, index) => (
                <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                  <span className="flex-shrink-0">
                    {getSpecificationIcon(spec)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <dt className="text-sm sm:text-base lg:text-lg font-medium text-gray-500 mb-1">
                      {spec.label}
                    </dt>
                    <dd className="text-sm sm:text-base text-gray-900 leading-relaxed">{spec.value}</dd>
                  </div>
                </div>
              ))}
              {(!details?.specifications?.content || details.specifications.content.length === 0) && (
                <p className="text-base text-gray-500">No specifications available.</p>
              )}
            </div>
          )}

          {/* Instructions Tab */}
          {activeTab === 'instructions' && (
            <div className="space-y-2">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-sm sm:text-base text-blue-800 flex items-center">
                  <HiBookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" />
                  Follow these instructions carefully for the best experience with your {productTitle}.
                </p>
              </div>
              
              <div className="grid gap-2">
                {(details?.instructions?.content || []).map((instruction, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-2 sm:space-x-4 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <span className="text-sm sm:text-base font-semibold">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                        {instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {(!details?.instructions?.content || details.instructions.content.length === 0) && (
                <div className="text-center py-6 sm:py-8">
                  <HiBookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                  <p className="text-sm sm:text-base text-gray-500">No instructions available.</p>
                </div>
              )}
            </div>
          )}

          {/* Shipping Tab */}
          {activeTab === 'shipping' && (
            <div className="space-y-3 sm:space-y-6">
              {(details?.shipping?.content || []).map((method, index) => (
                <div key={index} className="flex items-start space-x-2 sm:space-x-3 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <HiTruck className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <dt className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 mb-1">{method.name}</dt>
                    <dd className="text-sm sm:text-base text-gray-500">
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
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
                  <p className="text-sm sm:text-base text-blue-800 flex items-center">
                    <HiShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" />
                    Free shipping on orders over £{details.shipping.freeShippingThreshold}
                  </p>
                </div>
              )}
              {(!details?.shipping?.content || details.shipping.content.length === 0) && (
                <p className="text-base text-gray-500">No shipping information available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsTable; 