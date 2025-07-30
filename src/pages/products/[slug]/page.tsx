// src/pages/products/[slug].tsx
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PRODUCTS } from '../../../constants/products';
import { useCart } from '../../../contexts/CartContext';
import { HiShieldCheck, HiTruck, HiClock, HiStar, HiChevronDown, HiChevronUp, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Product, ProductVariant, ProductVariantGroup } from '../../../types';
import ProductDetailsTable from '../../../components/sub-components/product-details-table';
import RelatedArticles from '../../../components/sub-components/related-articles';
import CustomerReviews from '../../../components/CustomerReviews';

const ProductPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const product = PRODUCTS[slug as keyof typeof PRODUCTS];
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{[key: string]: string}>({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllVariants, setShowAllVariants] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Helper function to check if variants are grouped
  const isVariantGrouped = (variants: (ProductVariant | ProductVariantGroup)[]): variants is ProductVariantGroup[] => {
    return variants.length > 0 && 'name' in variants[0];
  };

  // Helper function to get simple variants
  const getSimpleVariants = (): ProductVariant[] => {
    if (isVariantGrouped(product.variants)) {
      return [];
    }
    return product.variants as ProductVariant[];
  };

  // Helper function to get variant groups
  const getVariantGroups = (): ProductVariantGroup[] => {
    if (isVariantGrouped(product.variants)) {
      return product.variants as ProductVariantGroup[];
    }
    return [];
  };

  // Initialize selected variants based on product structure
  const initializeSelectedVariants = useMemo(() => {
    if (isVariantGrouped(product.variants)) {
      const groups = product.variants as ProductVariantGroup[];
      const initial: {[key: string]: string} = {};
      groups.forEach(group => {
        if (group.options.length > 0) {
          initial[group.name] = group.options[0].value;
        }
      });
      return initial;
    } else {
      const simple = product.variants as ProductVariant[];
      return simple.length > 0 ? { size: simple[0].value } : {};
    }
  }, [product.variants]);

  // Update selectedVariants when product changes
  React.useEffect(() => {
    setSelectedVariants(initializeSelectedVariants);
  }, [initializeSelectedVariants]);

  // Combine all images into a single array for easy management
  const allImages = product.images 
    ? [
        product.images.main,
        product.images.thumbnail,
        ...product.images.additional,
      ]
    : [];

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handlePreviousImage = () => {
    setSelectedImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Generate variant label for display
  const getVariantLabel = () => {
    if (isVariantGrouped(product.variants)) {
      const groups = product.variants as ProductVariantGroup[];
      return groups
        .map(group => {
          const selectedOption = group.options.find(option => option.value === selectedVariants[group.name]);
          return selectedOption ? selectedOption.label : '';
        })
        .filter(Boolean)
        .join(', ');
    } else {
      const simple = product.variants as ProductVariant[];
      const selectedVariant = simple.find(v => v.value === selectedVariants.size);
      return selectedVariant ? selectedVariant.label : '';
    }
  };

  const handleAddToCart = () => {
    if (!product || !currentPrice) return;

    const cartItem = {
      productSlug: slug!,
      productTitle: product.title,
      productImage: product.images?.main || '',
      price: currentPrice,
      originalPrice: currentVariant?.price || product.price,
      salePrice: currentPrice, // Initially the same as currentPrice (sale price)
      quantity,
      selectedVariants,
      variantLabel: getVariantLabel(),
    };

    addToCart(cartItem);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout after a brief delay to allow cart to update
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 100);
  };

  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

  const trustFeatures = [
    { icon: HiTruck, text: 'Free UK Delivery on orders over £30' },
    { icon: HiClock, text: '48-Hour Delivery' },
    { icon: HiShieldCheck, text: '100% Satisfaction Guarantee' },
  ];

  // Calculate current price based on selected variants
  const currentPrice = useMemo(() => {
    if (isVariantGrouped(product.variants)) {
      // For variant groups, sum up all selected variant prices
      const groups = product.variants as ProductVariantGroup[];
      let totalPrice = product.price;
      let totalSalePrice = product.salePrice || product.price;
      
      groups.forEach(group => {
        const selectedValue = selectedVariants[group.name];
        const selectedOption = group.options.find(option => option.value === selectedValue);
        if (selectedOption) {
          if (group.name === 'size') {
            // Size determines base price
            totalPrice = selectedOption.price;
            totalSalePrice = selectedOption.salePrice || selectedOption.price;
          } else {
            // Other options add to the price
            totalPrice += selectedOption.price;
            totalSalePrice += selectedOption.salePrice || selectedOption.price;
          }
        }
      });
      
      return totalSalePrice;
    } else {
      // For simple variants, find the selected variant
      const simple = product.variants as ProductVariant[];
      const selectedVariant = simple.find(v => v.value === selectedVariants.size) || simple[0];
      return selectedVariant ? (selectedVariant.salePrice || selectedVariant.price) : (product.salePrice || product.price);
    }
  }, [product, selectedVariants]);

  // Get current variant for regular price display
  const currentVariant = useMemo(() => {
    if (isVariantGrouped(product.variants)) {
      const groups = product.variants as ProductVariantGroup[];
      const sizeGroup = groups.find(g => g.name === 'size');
      if (sizeGroup) {
        const selectedSize = selectedVariants.size;
        return sizeGroup.options.find(option => option.value === selectedSize) || sizeGroup.options[0];
      }
      return null;
    } else {
      const simple = product.variants as ProductVariant[];
      return simple.find(v => v.value === selectedVariants.size) || simple[0];
    }
  }, [product.variants, selectedVariants]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return currentPrice * quantity;
  }, [currentPrice, quantity]);

  // Determine which variants to show (for simple variants only)
  const visibleVariants = useMemo(() => {
    const simple = getSimpleVariants();
    if (simple.length <= 4 || showAllVariants) {
      return simple;
    }
    return simple.slice(0, 4);
  }, [product.variants, showAllVariants]);

  const hasMoreVariants = getSimpleVariants().length > 4;

  // Prepare product details for the table
  const productDetails = {
    description: product.description,
    specifications: {
      weight: isVariantGrouped(product.variants) 
        ? getVariantGroups().find(g => g.name === 'size')?.options[0].label || 'Standard Pack'
        : getSimpleVariants()[0]?.label || 'Standard Pack',
      packSize: 'Resealable pouch',
      quantity: isVariantGrouped(product.variants)
        ? `${getVariantGroups().find(g => g.name === 'size')?.options.length || 1} size options`
        : `${getSimpleVariants().length} pack sizes`,
      origin: 'Sri Lanka',
      storage: 'Store in a cool, dry place away from direct sunlight',
      ingredients: '100% Pure Blue Lotus Flower (Nymphaea Caerulea)',
      quality: 'Premium grade, carefully selected and processed',
    },
    shippingMethods: [
      {
        name: "Standard UK Delivery",
        price: 3.99,
        estimatedDays: "3-5 working days"
      },
      {
        name: "Express UK Delivery",
        price: 6.99,
        estimatedDays: "Next working day if ordered before 2pm"
      },
      {
        name: "Free UK Delivery",
        price: 0,
        estimatedDays: "3-5 working days on orders over £30"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{product.title} - Blue Dream Tea UK</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={product.images?.main || ''} />
        <meta property="og:url" content={`https://yourdomain.com/products/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            offers: {
              "@type": "Offer",
              priceCurrency: "GBP",
              price: currentPrice || product.price,
              itemCondition: "https://schema.org/NewCondition",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: averageRating.toFixed(1),
              reviewCount: product.reviews.length,
            },
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-12">
        <div className="md:grid md:grid-cols-2 md:gap-x-8 md:items-start">
          {/* Product Images */}
          <div className="flex flex-col">
            {/* Main Image */}
            <div className="relative w-full aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
              {allImages.length > 0 ? (
                <img
                  src={allImages[selectedImage]}
                  alt={`${product.title} - View ${selectedImage + 1}`}
                  className="w-full h-full object-center object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No image available
                </div>
              )}
              
              {/* Navigation Buttons for Mobile/Small/Medium Screens */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all lg:hidden"
                    aria-label="Previous image"
                  >
                    <HiChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all lg:hidden"
                    aria-label="Next image"
                  >
                    <HiChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                  
                  {/* Image Indicator Dots for Mobile/Small/Medium Screens */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 lg:hidden">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          selectedImage === index ? 'bg-white' : 'bg-white/50'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Thumbnail Navigation - Hidden on mobile/small/medium screens, visible on large screens only */}
            {allImages.length > 1 && (
              <div className="mt-4 hidden lg:grid grid-cols-3 gap-4">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index 
                        ? 'border-blue-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      className="w-full h-full object-center object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 md:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.title}</h1>
            
            {/* Rating */}
            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <HiStar
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="ml-3 text-sm text-gray-500">
                {product.reviews.length} reviews
              </p>
            </div>

            {/* Price */}
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">£{currentPrice.toFixed(2)}</p>
              {currentVariant && currentVariant.salePrice && currentVariant.price > currentVariant.salePrice && (
                <p className="mt-1">
                  <span className="text-lg line-through text-gray-500">£{currentVariant.price.toFixed(2)}</span>
                  <span className="ml-2 text-green-600 font-medium">
                    Save £{(currentVariant.price - currentVariant.salePrice).toFixed(2)}
                  </span>
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <p className="text-base text-gray-700">{product.description}</p>
            </div>

            {/* Variant Selection */}
            <div className="mt-8">
              {isVariantGrouped(product.variants) ? (
                // Render variant groups
                getVariantGroups().map((group) => (
                  <div key={group.name} className="mb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">{group.label}</h3>
                      <span className="text-sm text-gray-500">Choose your {group.label.toLowerCase()}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-3">
                      {group.options.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`
                            relative px-4 py-3 border rounded-lg text-sm font-medium
                            ${selectedVariants[group.name] === option.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                            }
                          `}
                          onClick={() => setSelectedVariants(prev => ({
                            ...prev,
                            [group.name]: option.value
                          }))}
                        >
                          <span className="block">{option.label}</span>
                          {group.name === 'size' && (
                            <div className="mt-1">
                              <span className="block font-semibold">
                                £{(option.salePrice || option.price).toFixed(2)}
                              </span>
                            </div>
                          )}
                          {group.name === 'type' && option.price > 0 && (
                            <div className="mt-1">
                              <span className="block text-xs text-green-600">+£{option.price.toFixed(2)}</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                // Render simple variants
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Pack Size</h3>
                    <span className="text-sm text-gray-500">Select your preferred pack size</span>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-3">
                    {visibleVariants.map((variant) => (
                      <button
                        key={variant.value}
                        type="button"
                        className={`
                          relative px-4 py-3 border rounded-lg text-sm font-medium
                          ${selectedVariants.size === variant.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                          }
                        `}
                        onClick={() => setSelectedVariants(prev => ({
                          ...prev,
                          size: variant.value
                        }))}
                      >
                        <span className="block">{variant.label}</span>
                        <div className="mt-1">
                          <span className="block font-semibold">
                            £{(variant.salePrice || variant.price).toFixed(2)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Show More/Less Button */}
                  {hasMoreVariants && (
                    <button
                      type="button"
                      className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => setShowAllVariants(!showAllVariants)}
                    >
                      {showAllVariants ? (
                        <>
                          <HiChevronUp className="h-4 w-4 mr-2" />
                          Show Less Options
                        </>
                      ) : (
                        <>
                          <HiChevronDown className="h-4 w-4 mr-2" />
                          Show More Options ({getSimpleVariants().length - 4} more)
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <div className="flex items-center">
                <span className="mr-4 text-sm font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    type="button"
                    className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 text-center border-x border-gray-300 p-2"
                  />
                  <button
                    type="button"
                    className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="mt-6 w-full bg-white py-3 px-4 text-gray-900 font-semibold rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                style={{ border: '1px solid #d1d5db' }}
              >
                Add to Cart - £{totalPrice.toFixed(2)}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="mt-3 w-full bg-blue-600 py-3 px-4 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Buy Now
              </button>

              <p className="mt-4 text-center text-sm text-gray-500">
                Free shipping on orders over £30
              </p>

              {/* Trust Features */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-200 pt-8">
                {trustFeatures.map((feature, index) => (
                  <div key={index} className="text-center">
                    <feature.icon className="h-8 w-8 mx-auto text-blue-500" />
                    <p className="mt-2 text-sm text-gray-600">{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Table */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <ProductDetailsTable 
            details={product.details} 
            productTitle={product.title}
          />
          
          {/* Related Articles */}
          {product.details.relatedArticles && (
            <RelatedArticles 
              articles={product.details.relatedArticles}
              title={`Learn More About ${product.title}`}
            />
          )}
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <CustomerReviews productSlug={slug} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;