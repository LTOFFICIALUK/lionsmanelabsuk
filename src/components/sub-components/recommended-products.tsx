import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../constants/products';
import { HiStar } from 'react-icons/hi';

interface RecommendedProduct {
  slug: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
}

interface RecommendedProductsProps {
  currentProductSlug?: string;
  title?: string;
  maxProducts?: number;
  // For article pages - show specific products
  heading?: string;
  description?: string;
  productSlugs?: string[];
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ 
  currentProductSlug, 
  title = "You Might Also Like",
  maxProducts = 4,
  heading,
  description,
  productSlugs
}) => {
  let allProducts: RecommendedProduct[] = [];

  if (productSlugs && productSlugs.length > 0) {
    // For article pages - show specific products
    allProducts = productSlugs
      .map(slug => {
        const product = PRODUCTS[slug];
        if (!product) return null;
        return {
          slug,
          title: product.title,
          description: product.description,
          price: product.price,
          salePrice: product.salePrice,
          image: product.images.main,
          rating: product.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / product.reviews.length,
          reviewCount: product.reviews.length
        };
      })
      .filter(Boolean) as RecommendedProduct[];
  } else if (currentProductSlug) {
    // For product pages - show all products except the current one
    allProducts = Object.entries(PRODUCTS)
      .filter(([slug]) => slug !== currentProductSlug)
      .map(([slug, product]) => ({
        slug,
        title: product.title,
        description: product.description,
        price: product.price,
        salePrice: product.salePrice,
        image: product.images.main,
        rating: product.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / product.reviews.length,
        reviewCount: product.reviews.length
      }))
      .slice(0, maxProducts);
  }

  if (allProducts.length === 0) {
    return null;
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <HiStar
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {heading || title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description || "Discover more premium Blue Lotus products to enhance your experience"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allProducts.map((product) => (
            <div
              key={product.slug}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              <Link to={`/products/${product.slug}`} className="block">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex space-x-1 mr-2">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviewCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {product.salePrice ? (
                        <>
                          <span className="text-lg font-bold text-green-600">
                            £{product.salePrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            £{product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          £{product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      View Product →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
