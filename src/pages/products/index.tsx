import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PRODUCTS } from '../../constants/products';
import { HiStar, HiSearch } from 'react-icons/hi';

const ProductsIndex: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'rating'>('name');

  // Convert products object to array with slugs
  const allProducts = Object.entries(PRODUCTS).map(([slug, product]) => ({
    slug,
    ...product
  }));

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = allProducts.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case 'price-high':
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case 'rating':
          const aRating = a.reviews.reduce((acc, review) => acc + review.rating, 0) / a.reviews.length;
          const bRating = b.reviews.reduce((acc, review) => acc + review.rating, 0) / b.reviews.length;
          return bRating - aRating;
        case 'name':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return sorted;
  }, [searchQuery, sortBy, allProducts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as typeof sortBy);
  };

  return (
    <>
      <Helmet>
        <title>All Products - Blue Dream Tea UK</title>
        <meta name="description" content="Browse our complete collection of premium blue lotus flower products including tea bags, pre rolls, and flower packs." />
        <meta property="og:title" content="All Products - Blue Dream Tea UK" />
        <meta property="og:description" content="Browse our complete collection of premium blue lotus flower products including tea bags, pre rolls, and flower packs." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete range of premium blue lotus flower products, 
            carefully sourced and prepared for the perfect relaxation experience.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {searchQuery.trim() ? (
              <>Showing {filteredAndSortedProducts.length} results for "{searchQuery}"</>
            ) : (
              <>Showing all {filteredAndSortedProducts.length} products</>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">
              {searchQuery.trim() ? (
                <>Try adjusting your search terms or browse all products.</>
              ) : (
                <>We're working on adding more products. Check back soon!</>
              )}
            </p>
            {searchQuery.trim() && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProducts.map((product) => {
              const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
              
              return (
                <Link
                  key={product.slug}
                  to={`/products/${product.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  aria-label={`View ${product.title}`}
                >
                  {/* Product Image */}
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                    {product.images?.main ? (
                      <img
                        src={product.images.main}
                        alt={product.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-64 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <div className="text-6xl mb-2">🌸</div>
                          <div className="text-sm">Blue Lotus Product</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <HiStar
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {averageRating.toFixed(1)} ({product.reviews.length} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          £{(product.salePrice || product.price).toFixed(2)}
                        </span>
                        {product.salePrice && product.price > product.salePrice && (
                          <span className="ml-2 text-lg line-through text-gray-500">
                            £{product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {product.salePrice && (
                        <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          Save £{(product.price - product.salePrice).toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Variants preview */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="mt-3 text-sm text-gray-500">
                        Available in {product.variants.length} sizes
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        {filteredAndSortedProducts.length > 0 && (
          <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Not sure which blue lotus product is right for you? Our customer service team 
              is here to help you find the perfect product for your needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Help Choosing
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsIndex;
