import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../constants/products';

interface RecommendedProductsProps {
  heading?: string;
  description?: string;
  productSlugs: string[];
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ 
  heading = "Recommended Products",
  description,
  productSlugs 
}) => {
  const recommendedProducts = productSlugs
    .map(slug => ({ slug, ...PRODUCTS[slug] }))
    .filter(product => product.title); // Only include products that exist

  if (recommendedProducts.length === 0) return null;

  return (
    <section className="my-12">
      <h2 className="text-2xl font-semibold mb-4">{heading}</h2>
      {description && <p className="text-gray-600 mb-6">{description}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedProducts.map((product) => (
          <Link
            key={product.slug}
            to={`/products/${product.slug}`}
            className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            {product.images?.main && (
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                <img
                  src={product.images.main}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {product.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <div className="mt-2 flex items-center">
                {product.salePrice ? (
                  <>
                    <span className="text-lg font-bold text-gray-900">
                      £{product.salePrice.toFixed(2)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      £{product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    £{product.price.toFixed(2)}
                  </span>
                )}
          </div>
        </div>
          </Link>
      ))}
    </div>
    </section>
  );
};

export default RecommendedProducts;
