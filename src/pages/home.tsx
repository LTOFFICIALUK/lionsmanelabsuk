import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants/products';
import { HiStar, HiShieldCheck, HiTruck, HiClock, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import CustomerReviews from '../components/CustomerReviews';
import { ProductVariant, ProductVariantGroup } from '../types';

// Tea product categories
const teaCategories = [
  {
    title: 'All Products',
    description: 'All your blue lotus flower needs in one place.',
    path: '/products',
    gradient: 'from-pink-500 to-pink-700',
    icon: '🌸'
  },
  {
    title: 'Blue Lotus Flower Packs',
    description: 'Pure blue lotus flower in various pack sizes and quantities.',
    path: '/products',
    gradient: 'from-purple-500 to-purple-700',
    icon: '🌸'
  },
  {
    title: 'Pre Rolls',
    description: 'Ready-to-use blue lotus flower pre rolls. 100% pure and natural.',
    path: '/products/blue-lotus-flower-pre-rolls',
    gradient: 'from-blue-500 to-blue-700',
    icon: '🌿'
  },
  {
    title: 'Blue Lotus Tea',
    description: 'Premium blue lotus tea bags for a soothing experience.',
    path: '/products',
    gradient: 'from-green-500 to-green-700',
    icon: '🫖'
  }
];

// Available articles for recommendations
const recommendedArticles = [
  {
    title: 'What is Blue Lotus Flower?',
    description: 'Learn everything about blue lotus flower, its history, effects, and uses.',
    path: '/articles/what-is-blue-lotus-flower',
    readTime: '12 min read',
    category: 'Education'
  },
  {
    title: 'Smoking Blue Lotus Flower: A User\'s Guide',
    description: 'Complete guide to smoking blue lotus flower safely and effectively.',
    path: '/articles/smoking-blue-lotus-flower-a-users-guide',
    readTime: '10 min read',
    category: 'Usage Guide'
  },
  {
    title: 'Is Blue Lotus Flower Legal in the UK?',
    description: 'Understand the legal status of blue lotus flower in the United Kingdom.',
    path: '/articles/is-blue-lotus-flower-legal-in-the-uk',
    readTime: '12 min read',
    category: 'Legal Guide'
  }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Helper function to check if variants are grouped
  const isVariantGrouped = (variants: (ProductVariant | ProductVariantGroup)[]): variants is ProductVariantGroup[] => {
    return variants.length > 0 && 'name' in variants[0];
  };

  // Helper function to get starting price from variants
  const getStartingPrice = (variants: (ProductVariant | ProductVariantGroup)[], fallbackPrice: number) => {
    if (!variants || variants.length === 0) return fallbackPrice;
    
    if (isVariantGrouped(variants)) {
      // For variant groups, find the size group and get the lowest price
      const sizeGroup = variants.find(group => group.name === 'size');
      if (sizeGroup && sizeGroup.options.length > 0) {
        const lowestPriceOption = sizeGroup.options.reduce((lowest, option) => 
          (option.salePrice || option.price) < (lowest.salePrice || lowest.price) ? option : lowest
        );
        return lowestPriceOption.salePrice || lowestPriceOption.price;
      }
      return fallbackPrice;
    } else {
      // For simple variants, get the lowest price
      const simpleVariants = variants as ProductVariant[];
      const lowestPriceVariant = simpleVariants.reduce((lowest, variant) => 
        (variant.salePrice || variant.price) < (lowest.salePrice || lowest.price) ? variant : lowest
      );
      return lowestPriceVariant.salePrice || lowestPriceVariant.price;
    }
  };

  // Get featured products
  const featuredProducts = Object.entries(PRODUCTS).map(([slug, product]) => ({
    slug,
    ...product
  }));

  // Scroll functions for featured products
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  // Search through products and articles
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    
    // Search through products
    const productResults = featuredProducts.filter(product => 
      product.title.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    ).map(product => ({
      type: 'product' as const,
      title: product.title,
      description: product.description,
      path: `/products/${product.slug}`,
      price: product.salePrice || product.price
    }));

    // Search through articles
    const articleResults = recommendedArticles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query)
    ).map(article => ({
      type: 'article' as const,
      ...article
    }));

    return [...productResults, ...articleResults];
  }, [searchQuery, featuredProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      if (!searchQuery.trim()) {
        setIsSearching(false);
      }
    }, 200);
  };

  const trustFeatures = [
    { icon: HiTruck, text: 'Free UK Delivery on orders over £30' },
    { icon: HiClock, text: '48-Hour Delivery' },
    { icon: HiShieldCheck, text: '100% Satisfaction Guarantee' },
  ];

  return (
    <div className="space-y-16 lg:px-12 md:px-8 sm:px-4 px-4">
      {/* Hero Section with Search */}
      <section className="text-center lg:py-24 md:py-12 sm:py-8 py-8 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Blue Dream Tea UK
        </h1>
        <p className="text-lg text-gray-500 mb-6 lg:px-36">
          Your one-stop shop for premium Blue Lotus Flower products. We've been the UK's leading supplier of Blue Lotus Flower since early 2023, bringing you the finest quality products for relaxation and wellness.
        </p>
        <div className="max-w-2xl mx-auto lg:mt-12 md:mt-8 sm:mt-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearching(true)}
              onBlur={handleSearchBlur}
              placeholder="Search for products..."
              className="w-full px-6 py-4 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
              aria-label="Submit search"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Search Results Dropdown */}
            {isSearching && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                {searchResults.length === 0 ? (
                  <div className="p-4 text-gray-500 text-center">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  <div className="p-2">
                    {searchResults.map((result, index) => (
                      <Link
                        key={index}
                        to={result.path}
                        className="block px-3 py-2 hover:bg-gray-100 rounded-lg"
                      >
                        <div className="flex items-start space-x-4">
                          {result.type === 'product' && (
                            <div className="flex-shrink-0 w-16 h-16">
                              {PRODUCTS[result.path.split('/').pop() || '']?.images?.main ? (
                                <img
                                  src={PRODUCTS[result.path.split('/').pop() || '']?.images?.main}
                                  alt={result.title}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                                  <span className="text-gray-400 text-xs">No image</span>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="flex-1 min-w-0 text-left">
                            <div className="font-medium truncate">{result.title}</div>
                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">{result.description}</div>
                            <div className="text-xs text-blue-600 mt-1">
                              {result.type === 'product' ? 'Product' : result.category}
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-1 ml-4 flex-shrink-0">
                            {result.type === 'product' && result.price && (
                              <span className="text-sm font-semibold text-green-600">
                                £{result.price.toFixed(2)}
                              </span>
                            )}
                            {result.type === 'article' && result.readTime && (
                              <span className="text-xs text-gray-500">
                                {result.readTime}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Trust Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="flex items-center justify-center space-x-2 text-gray-600">
              <feature.icon className="h-5 w-5 text-blue-500" />
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-0">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button
                onClick={handleScrollLeft}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Scroll left"
              >
                <HiChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={handleScrollRight}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Scroll right"
              >
                <HiChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <Link
              to="/products"
              className="text-blue-500 hover:text-blue-600 font-semibold"
              aria-label="View all products"
            >
              Shop All
            </Link>
          </div>
        </div>
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredProducts.map((product) => (
            <Link
              key={product.slug}
              to={`/products/${product.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 w-80"
              aria-label={`View ${product.title}`}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                {product.images?.main ? (
                  <img
                    src={product.images.main}
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-gray-500">
                    No image available
                  </div>
                )}
              </div>
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
                          i < Math.floor(product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length)
                            ? 'text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.reviews.length} reviews)
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
                  <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    From £{getStartingPrice(product.variants, product.salePrice || product.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-4 bg-gray-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600">Discover our range of premium blue lotus products</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {teaCategories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className="relative group overflow-hidden rounded-xl aspect-square"
              aria-label={`View ${category.title} category`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-transform group-hover:scale-105`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-lg text-center mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-center opacity-90">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* Recommended Articles */}
      {recommendedArticles.length > 0 && (
        <section className="pt-4 pb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recommended Reading</h2>
            <Link
              to="/articles"
              className="text-blue-500 hover:text-blue-600 font-semibold"
              aria-label="View all"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedArticles.map((article) => (
              <Link
                key={article.path}
                to={article.path}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                aria-label={`Read article: ${article.title}`}
              >
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600">{article.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home; 