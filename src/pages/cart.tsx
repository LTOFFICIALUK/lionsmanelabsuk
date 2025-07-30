import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useCart } from '../contexts/CartContext';
import { HiPlus, HiMinus, HiTrash, HiShoppingBag, HiTag, HiArrowUp, HiCheck } from 'react-icons/hi';
import { PRODUCTS } from '../constants/products';
import { calculateShippingCost } from '../constants/shipping-options';

const CartPage: React.FC = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    applyDiscountCode, 
    removeDiscountCode,
    addToCartSilently
  } = useCart();
  
  const [discountCodeInput, setDiscountCodeInput] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const [addedUpgrades, setAddedUpgrades] = useState<Set<string>>(new Set());


  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleApplyDiscount = async () => {
    if (!discountCodeInput.trim()) {
      setDiscountError('Please enter a discount code');
      return;
    }

    setIsApplyingDiscount(true);
    setDiscountError('');

    try {
      const success = await applyDiscountCode(discountCodeInput.trim());
      if (success) {
        setDiscountCodeInput('');
      } else {
        setDiscountError('Invalid discount code or minimum order not met');
      }
    } catch (error) {
      setDiscountError('Error applying discount code');
    } finally {
      setIsApplyingDiscount(false);
    }
  };

  const handleRemoveDiscount = () => {
    removeDiscountCode();
    setDiscountError('');
  };

  // Function to get upsell products for items in cart
  const getUpsellProducts = () => {
    const upsellProducts: Array<{
      originalItem: any;
      upsellVariant: any;
      product: any;
      savings: number;
    }> = [];

    cart.items.forEach((cartItem) => {
      const product = PRODUCTS[cartItem.productSlug as keyof typeof PRODUCTS];
      if (!product) return;

      // Find the current variant (handle both ProductVariant and ProductVariantGroup)
      let currentVariant: any = null;
      for (const variant of product.variants) {
        if ('value' in variant && variant.value === cartItem.selectedVariants.size) {
          currentVariant = variant;
          break;
        } else if ('options' in variant) {
          const matchingOption = variant.options.find(opt => opt.value === cartItem.selectedVariants.size);
          if (matchingOption) {
            currentVariant = matchingOption;
            break;
          }
        }
      }
      
      if (!currentVariant) return;

      // Find larger variants (higher weight/quantity)
      const largerVariants: any[] = [];
      for (const variant of product.variants) {
        if ('value' in variant) {
          const currentValue = parseFloat(currentVariant.value.replace(/[^\d.]/g, ''));
          const variantValue = parseFloat(variant.value.replace(/[^\d.]/g, ''));
          if (variantValue > currentValue) {
            largerVariants.push(variant);
          }
        } else if ('options' in variant) {
          for (const option of variant.options) {
            const currentValue = parseFloat(currentVariant.value.replace(/[^\d.]/g, ''));
            const optionValue = parseFloat(option.value.replace(/[^\d.]/g, ''));
            if (optionValue > currentValue) {
              largerVariants.push(option);
            }
          }
        }
      }

      // Get the next size up (or best value)
      const nextVariant = largerVariants[0];
      if (nextVariant) {
        const currentPrice = currentVariant.salePrice || currentVariant.price;
        const nextPrice = nextVariant.salePrice || nextVariant.price;
        const savings = (currentPrice * 2) - nextPrice; // Assuming they'd buy 2 of current size

        upsellProducts.push({
          originalItem: cartItem,
          upsellVariant: nextVariant,
          product,
          savings
        });
      }
    });

    return upsellProducts;
  };

  const handleUpsellAddToCart = (upsellProduct: any) => {
    const upgradeKey = `${upsellProduct.originalItem.id}-${upsellProduct.upsellVariant.value}`;
    
    if (addedUpgrades.has(upgradeKey)) {
      return;
    }

    // Add new product first
    addToCartSilently({
      productSlug: upsellProduct.product.slug || Object.keys(PRODUCTS).find(key => PRODUCTS[key as keyof typeof PRODUCTS] === upsellProduct.product) || '',
      productTitle: upsellProduct.product.title,
      productImage: upsellProduct.product.images.main,
      variantLabel: upsellProduct.upsellVariant.label,
      selectedVariants: { size: upsellProduct.upsellVariant.value },
      price: upsellProduct.upsellVariant.salePrice || upsellProduct.upsellVariant.price,
      originalPrice: upsellProduct.upsellVariant.price,
      salePrice: upsellProduct.upsellVariant.salePrice || upsellProduct.upsellVariant.price,
      quantity: upsellProduct.originalItem.quantity,
    });

    // Then remove old product
    removeFromCart(upsellProduct.originalItem.id);

    // Apply discount
    applyDiscountCode('UPGRADE15');

    // Mark button as added
    setAddedUpgrades(prev => new Set(prev).add(upgradeKey));
  };

  const upsellProducts = getUpsellProducts();

  // Calculate shipping cost using the same logic as checkout (default to Standard Shipping)
  const shippingCost = calculateShippingCost(cart.total, 1); // Default to Standard Shipping (ID: 1)

  return (
    <>
      <Helmet>
        <title>Shopping Cart - Blue Dream Tea UK</title>
        <meta name="description" content="Review your blue lotus flower tea products and proceed to checkout." />
      </Helmet>

      <div className="max-w-6xl mx-auto py-8 lg:py-12 px-4 sm:px-6 lg:px-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.items.length === 0 ? (
          <div className="text-center py-16">
            <HiShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Discover our beautiful collection of blue lotus flower products and start your wellness journey.
            </p>
            <Link
              to="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Shop Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column: Cart Items */}
            <div className="space-y-8">
              {/* Cart Items Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
                
                <div className="space-y-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                      {/* Product Image */}
                      <img
                        src={item.productImage}
                        alt={item.productTitle}
                        className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-lg flex-shrink-0"
                      />

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">
                          {item.productTitle}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {item.variantLabel}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <span className="text-xs sm:text-sm font-medium text-gray-700">Quantity:</span>
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <HiMinus className="h-4 w-4" />
                            </button>
                            <span className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-900 min-w-[2.5rem] sm:min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <HiPlus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-base sm:text-lg font-semibold text-gray-900">
                          £{(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.originalPrice !== item.price && (
                          <div className="text-sm text-gray-500 line-through">
                            £{(item.originalPrice * item.quantity).toFixed(2)}
                          </div>
                        )}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors mt-2 ml-auto"
                        >
                          <HiTrash className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm font-medium">Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upsell Section */}
              {upsellProducts.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <HiArrowUp className="h-5 w-5 text-green-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Upgrade & Save</h2>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Get better value with larger quantities and enjoy free shipping on orders over £30!
                  </p>
                  
                  <div className="space-y-4">
                    {upsellProducts.map((upsell, index) => {
                      const upgradeKey = `${upsell.originalItem.id}-${upsell.upsellVariant.value}`;
                      const isAdded = addedUpgrades.has(upgradeKey);
                      
                      return (
                        <div key={index} className="bg-gray-50 rounded-lg border border-gray-100 p-4">
                          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                            {/* Product Image */}
                            <img
                              src={upsell.product.images.main}
                              alt={upsell.product.title}
                              className="h-16 w-16 object-cover rounded-lg flex-shrink-0 mx-auto sm:mx-0"
                            />

                            {/* Product Details */}
                            <div className="flex-1 min-w-0 text-center sm:text-left">
                              <h4 className="text-base font-medium text-gray-900 mb-1 leading-snug">
                                {upsell.product.title}
                              </h4>
                              <p className="text-sm text-gray-500 mb-2 leading-snug">
                                {upsell.upsellVariant.label} (instead of {upsell.originalItem.variantLabel})
                              </p>
                              
                              {/* Savings Badge */}
                              {upsell.savings > 0 && (
                                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">
                                  Save £{upsell.savings.toFixed(2)}
                                </div>
                              )}
                            </div>

                            {/* Price and Action */}
                            <div className="text-center sm:text-right flex-shrink-0">
                              <div className="text-base font-semibold text-gray-900">
                                £{(upsell.upsellVariant.salePrice || upsell.upsellVariant.price).toFixed(2)}
                              </div>
                              {upsell.upsellVariant.salePrice && (
                                <div className="text-xs text-gray-500 line-through">
                                  £{upsell.upsellVariant.price.toFixed(2)}
                                </div>
                              )}
                              <button
                                onClick={() => handleUpsellAddToCart(upsell)}
                                disabled={isAdded}
                                className={`mt-2 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 whitespace-nowrap w-full sm:w-auto ${
                                  isAdded 
                                    ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <HiCheck className="inline h-3 w-3 mr-1" />
                                    Added
                                  </>
                                ) : (
                                  'Upgrade & Save'
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                {/* Discount Code */}
                <div className="mb-6">
                  <label htmlFor="discount-code" className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Code
                  </label>
                  {cart.discountCode ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-3">
                      <div className="flex items-center space-x-2">
                        <HiTag className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">
                          {cart.discountCode} Applied
                        </span>
                      </div>
                      <button
                        onClick={handleRemoveDiscount}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex">
                        <input
                          type="text"
                          id="discount-code"
                          value={discountCodeInput}
                          onChange={(e) => setDiscountCodeInput(e.target.value)}
                          placeholder="Enter discount code"
                          className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onKeyDown={(e) => e.key === 'Enter' && handleApplyDiscount()}
                        />
                        <button
                          onClick={handleApplyDiscount}
                          disabled={isApplyingDiscount}
                          className="bg-gray-900 text-white px-4 py-2 rounded-r-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {isApplyingDiscount ? 'Applying...' : 'Apply'}
                        </button>
                      </div>
                      {discountError && (
                        <p className="text-sm text-red-600">{discountError}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Order Totals */}
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Subtotal ({cart.totalItems} items)</span>
                    <span className="text-sm font-medium text-gray-900">
                      £{cart.subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Shipping (Standard)</span>
                    <span className="text-sm font-medium text-gray-900">
                      {shippingCost === 0 ? 'Free' : `£${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  {cart.subtotal > cart.total && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600">Total Savings</span>
                      <span className="text-sm font-medium text-green-600">
                        -£{(cart.subtotal - cart.total).toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      £{(cart.total + shippingCost).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {cart.total < 30 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-700">
                      Add £{(30 - cart.total).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <div className="mt-8 space-y-3">
                  <Link
                    to="/checkout"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium text-center hover:bg-blue-700 transition-colors block"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    to="/products"
                    className="w-full bg-white text-gray-900 py-3 px-4 rounded-md font-medium text-center border border-gray-300 hover:bg-gray-50 transition-colors block"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-2 text-xs text-gray-500">
                    <p>✓ Free UK delivery on orders over £30</p>
                    <p>✓ 48-hour delivery</p>
                    <p>✓ 100% satisfaction guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage; 