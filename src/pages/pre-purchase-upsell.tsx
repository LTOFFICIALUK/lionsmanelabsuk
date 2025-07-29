import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useCart } from '../contexts/CartContext';
import { HiArrowUp, HiX, HiChevronLeft, HiChevronRight, HiTag, HiClock, HiChevronDown, HiChevronUp, HiTrash, HiMinus, HiPlus, HiCheck, HiLockClosed, HiCreditCard, HiTruck } from 'react-icons/hi';
import { PRODUCTS } from '../constants/products';
import { calculateShippingCost, shippingOptions, getShippingOptionsByCountry } from '../constants/shipping-options';
import { ShippingAddress, BillingAddress } from '../types';
import { orderService } from '../utils/supabase';
import { royalMailService } from '../utils/royal-mail-api';
import { brevoApiService } from '../utils/brevo-api';
import { discountService } from '../utils/discount-service';

const PrePurchaseUpsellPage: React.FC = () => {
  const { cart, addToCartSilently, removeFromCart, updateQuantity, applyDiscountCode, replaceCartItem, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // State for slideshow and cart summary
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasSeenUpsell, setHasSeenUpsell] = useState(false);
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  const [addedUpgrades, setAddedUpgrades] = useState<Set<string>>(new Set());
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());
  const [initialUpgradeProducts, setInitialUpgradeProducts] = useState<any[]>([]);
  const [initialAdditionalProducts, setInitialAdditionalProducts] = useState<any[]>([]);

  // State for checkout data (retrieved from localStorage)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    company: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    phone: '',
  });

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    ...shippingAddress,
    email: '',
  });

  const [selectedShippingOptionId, setSelectedShippingOptionId] = useState<number>(1);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [showAlert, setShowAlert] = useState(false);

  // Check if user has seen upsell in this session
  useEffect(() => {
    const seen = sessionStorage.getItem('blueDreamTea_upsell_seen');
    if (seen) {
      setHasSeenUpsell(true);
    }
  }, []);

  // Mark as seen when component mounts
  useEffect(() => {
    sessionStorage.setItem('blueDreamTea_upsell_seen', 'true');
  }, []);

  // For testing: Reset session storage when component mounts in development
  useEffect(() => {
    if (import.meta.env.DEV) {
      // Clear session storage for testing - remove this in production
      sessionStorage.removeItem('blueDreamTea_upsell_seen');
    }
  }, []);

  // Initialize upgrade and additional products only once
  useEffect(() => {
    if (initialUpgradeProducts.length === 0) {
      setInitialUpgradeProducts(getUpgradeProducts());
    }
    if (initialAdditionalProducts.length === 0) {
      setInitialAdditionalProducts(getAdditionalProducts());
    }
  }, [cart.items.length]); // Only recalculate if cart items change (not when items are added)

  // Get upgrade products (same logic as cart)
  const getUpgradeProducts = () => {
    const upgradeProducts: Array<{
      originalItem: any;
      upgradeVariant: any;
      product: any;
      savings: number;
    }> = [];

    cart.items.forEach((cartItem) => {
      const product = PRODUCTS[cartItem.productSlug as keyof typeof PRODUCTS];
      if (!product) return;

      // Find the current variant
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

      // Find larger variants
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

      // Get the next size up
      const nextVariant = largerVariants[0];
      if (nextVariant) {
        const currentPrice = currentVariant.salePrice || currentVariant.price;
        const nextPrice = nextVariant.salePrice || nextVariant.price;
        const savings = (currentPrice * 2) - nextPrice;

        upgradeProducts.push({
          originalItem: cartItem,
          upgradeVariant: nextVariant,
          product,
          savings
        });
      }
    });

    return upgradeProducts;
  };

  // Get additional products for slideshow (excluding items already in cart)
  const getAdditionalProducts = () => {
    const cartProductSlugs = cart.items.map(item => item.productSlug);
    const additionalProducts = Object.entries(PRODUCTS)
      .filter(([slug]) => !cartProductSlugs.includes(slug))
      .map(([slug, product]) => ({
        slug,
        ...product,
        // Apply 25% discount to all additional products
        discountedPrice: (product.salePrice || product.price) * 0.75,
        originalPrice: product.salePrice || product.price
      }))
      .slice(0, 6); // Limit to 6 products

    return additionalProducts;
  };

  const upgradeProducts = initialUpgradeProducts;
  const additionalProducts = initialAdditionalProducts;

  // Handle upgrade selection
  const handleUpgrade = (upgradeProduct: any) => {
    // Create unique key for this upgrade
    const upgradeKey = `${upgradeProduct.originalItem.id}-${upgradeProduct.upgradeVariant.value}`;
    
    // Check if already added
    if (addedUpgrades.has(upgradeKey)) {
      return;
    }
    
    // Replace the original item with the upgraded variant (15% discount)
    const upgradePrice = (upgradeProduct.upgradeVariant.salePrice || upgradeProduct.upgradeVariant.price) * 0.85;
    
    replaceCartItem(upgradeProduct.originalItem.id, {
      productSlug: upgradeProduct.product.slug || Object.keys(PRODUCTS).find(key => PRODUCTS[key as keyof typeof PRODUCTS] === upgradeProduct.product) || '',
      productTitle: upgradeProduct.product.title,
      productImage: upgradeProduct.product.images.main,
      variantLabel: upgradeProduct.upgradeVariant.label,
      selectedVariants: { size: upgradeProduct.upgradeVariant.value },
      price: upgradePrice,
      originalPrice: upgradeProduct.upgradeVariant.salePrice || upgradeProduct.upgradeVariant.price,
      quantity: upgradeProduct.originalItem.quantity, // Keep the same quantity
    });

    // Apply automatic discount code
    applyDiscountCode('UPGRADE15');
    
    // Mark as added
    setAddedUpgrades(prev => new Set(prev).add(upgradeKey));
  };

  // Handle additional product selection
  const handleAddProduct = (product: any) => {
    // Get the first variant, handling both ProductVariant and ProductVariantGroup
    let variant: any = product.variants[0];
    if ('options' in variant) {
      variant = variant.options[0]; // Get first option from group
    }
    
    // Create unique key for this product
    const productKey = `${product.slug}-${variant.value}`;
    
    // Check if already added
    if (addedProducts.has(productKey)) {
      return;
    }
    
    const discountedPrice = (variant.salePrice || variant.price) * 0.75;
    
    addToCartSilently({
      productSlug: product.slug,
      productTitle: product.title,
      productImage: product.images.main,
      variantLabel: variant.label,
      selectedVariants: { size: variant.value },
      price: discountedPrice,
      originalPrice: variant.salePrice || variant.price,
      quantity: 1,
    });

    // Apply automatic discount code
    applyDiscountCode('ADDON25');
    
    // Mark as added
    setAddedProducts(prev => new Set(prev).add(productKey));
  };

  // Slideshow controls
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(additionalProducts.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(additionalProducts.length / 2)) % Math.ceil(additionalProducts.length / 2));
  };

  // Form handling functions
  const handleShippingChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
    setBillingAddress(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleEmailChange = (value: string) => {
    setBillingAddress(prev => ({ ...prev, email: value }));
    if (formErrors.email) {
      setFormErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    let hasErrors = false;

    if (!shippingAddress.firstName.trim()) {
      errors.firstName = 'First name is required';
      hasErrors = true;
    }
    if (!shippingAddress.lastName.trim()) {
      errors.lastName = 'Last name is required';
      hasErrors = true;
    }
    if (!shippingAddress.addressLine1.trim()) {
      errors.addressLine1 = 'Address is required';
      hasErrors = true;
    }
    if (!shippingAddress.city.trim()) {
      errors.city = 'City is required';
      hasErrors = true;
    }
    if (!shippingAddress.postalCode.trim()) {
      errors.postalCode = 'Postal code is required';
      hasErrors = true;
    }
    if (!shippingAddress.phone.trim()) {
      errors.phone = 'Phone number is required';
      hasErrors = true;
    }
    if (!selectedShippingOptionId) {
      errors.shipping = 'Please select a shipping method';
      hasErrors = true;
    }

    if (!billingAddress.email.trim()) {
      errors.email = 'Email is required';
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingAddress.email)) {
      errors.email = 'Please enter a valid email address';
      hasErrors = true;
    }

    setFormErrors(errors);
    setShowAlert(hasErrors);
    return !hasErrors;
  };

  const generateOrderNumber = (): string => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `BDT-${timestamp.slice(-6)}${random}`;
  };

  // Continue to checkout - directly place order since data is already available
  const handleContinueToCheckout = () => {
    handlePlaceOrder();
  };

  // Place order function (same as checkout page)
  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsPlacingOrder(true);

    try {
      const selectedShipping = shippingOptions.find(option => option.id === selectedShippingOptionId)!;
      
      // Create order data for database
      const orderData = {
        order_number: generateOrderNumber(),
        customer_first_name: shippingAddress.firstName,
        customer_last_name: shippingAddress.lastName,
        customer_email: billingAddress.email,
        customer_phone: shippingAddress.phone,
        shipping_address_line1: shippingAddress.addressLine1,
        shipping_address_line2: shippingAddress.addressLine2 || '',
        shipping_city: shippingAddress.city,
        shipping_postal_code: shippingAddress.postalCode,
        shipping_country: shippingAddress.country,
        billing_email: billingAddress.email,
        items: JSON.stringify(cart.items),
        subtotal: cart.subtotal,
        shipping_cost: shippingCost,
        shipping_method: `${selectedShipping.name} - ${selectedShipping.description}`,
        discount_code: cart.discountCode || '',
        discount_amount: cart.discountAmount || 0,
        total: finalTotal,
        status: 'pending',
        notes: '',
        tracking_number: ''
      };

      console.log('Creating order with data:', orderData);

      // Save order to database
      const { data: savedOrder, error } = await orderService.createOrder(orderData);
      console.log('Order creation response:', { savedOrder, error });

      if (error || !savedOrder) {
        throw new Error(error?.message || 'Failed to save order');
      }

      // Record discount code usage if a discount was applied
      if (cart.discountCode && cart.discountAmount > 0) {
        try {
          const { data: discountCode } = await discountService.validateDiscountCode(cart.discountCode, cart.subtotal);
          if (discountCode) {
            await discountService.recordDiscountUsage(
              discountCode.id,
              savedOrder.id,
              billingAddress.email,
              cart.discountAmount,
              finalTotal
            );
            console.log('✅ Discount code usage recorded');
          }
        } catch (discountError) {
          console.error('Failed to record discount code usage:', discountError);
        }
      }

      // Create customer in Brevo
      try {
        const productNames = cart.items.map(item => item.productTitle);
        await brevoApiService.createOrUpdateCustomer({
          email: billingAddress.email,
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          phone: shippingAddress.phone,
          address: shippingAddress.addressLine1 + (shippingAddress.addressLine2 ? `, ${shippingAddress.addressLine2}` : ''),
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country,
          company: shippingAddress.company,
          orderNumber: savedOrder.order_number,
          orderTotal: finalTotal,
          products: productNames,
        });

        await brevoApiService.trackEvent(billingAddress.email, 'order_completed', {
          orderNumber: savedOrder.order_number,
          orderTotal: finalTotal,
          products: productNames,
          shippingMethod: selectedShipping.name,
        });

        console.log('✅ Customer created/updated in Brevo');
      } catch (brevoError) {
        console.error('Brevo customer creation failed:', brevoError);
      }

      // Get country code for Royal Mail
      const getCountryCode = (countryName: string): string => {
        const countryCodes: { [key: string]: string } = {
          'United Kingdom': 'GB',
          'United States': 'US',
          'Canada': 'CA',
          'Australia': 'AU',
          'Germany': 'DE',
          'France': 'FR',
          'Spain': 'ES',
          'Italy': 'IT',
          'Netherlands': 'NL',
          'Belgium': 'BE',
          'Switzerland': 'CH',
          'Austria': 'AT',
          'Sweden': 'SE',
          'Norway': 'NO',
          'Denmark': 'DK',
          'Finland': 'FI',
          'Ireland': 'IE',
          'New Zealand': 'NZ',
          'Japan': 'JP',
          'South Korea': 'KR',
          'Singapore': 'SG',
          'Hong Kong': 'HK'
        };
        return countryCodes[countryName] || 'GB';
      };

      // Transform order data for Royal Mail submission
      const royalMailOrderData = {
        orderReference: savedOrder.order_number,
        recipient: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          email: billingAddress.email,
          phoneNumber: shippingAddress.phone,
          address: {
            addressLine1: shippingAddress.addressLine1,
            addressLine2: shippingAddress.addressLine2,
            city: shippingAddress.city,
            postcode: shippingAddress.postalCode,
            countryCode: getCountryCode(shippingAddress.country)
          }
        },
        sender: import.meta.env.VITE_ROYAL_MAIL_SENDER_NAME ? {
          name: import.meta.env.VITE_ROYAL_MAIL_SENDER_NAME,
          companyName: import.meta.env.VITE_ROYAL_MAIL_SENDER_COMPANY,
          email: import.meta.env.VITE_ROYAL_MAIL_SENDER_EMAIL,
          phoneNumber: import.meta.env.VITE_ROYAL_MAIL_SENDER_PHONE,
          address: {
            addressLine1: import.meta.env.VITE_ROYAL_MAIL_SENDER_ADDRESS_LINE1,
            addressLine2: import.meta.env.VITE_ROYAL_MAIL_SENDER_ADDRESS_LINE2,
            city: import.meta.env.VITE_ROYAL_MAIL_SENDER_CITY,
            county: import.meta.env.VITE_ROYAL_MAIL_SENDER_COUNTY,
            postcode: import.meta.env.VITE_ROYAL_MAIL_SENDER_POSTCODE,
            countryCode: 'GB'
          }
        } : undefined,
        items: cart.items.map(item => ({
          orderItemReference: item.id,
          quantity: item.quantity,
          description: item.productTitle,
          unitValue: item.price,
          unitWeightInGrams: 50,
          ...(shippingAddress.country !== 'United Kingdom' && {
            customsDescription: item.productTitle,
            customsValue: item.price,
            countryOfOrigin: 'GB'
          })
        })),
        parcel: {
          weightInGrams: cart.items.reduce((total, item) => total + (item.quantity * 50), 0),
          lengthInCm: 20,
          widthInCm: 15,
          heightInCm: 10
        },
        shippingService: {
          code: royalMailService.getServiceCode(selectedShipping.name),
          name: selectedShipping.name
        },
        label: {
          includeLabelInResponse: true
        },
        ...(shippingAddress.country !== 'United Kingdom' && {
          customsInformation: {
            reasonForExport: 'Sale of goods',
            incoterms: 'DDP',
            shippingCharges: shippingCost,
            shippingChargesCurrency: 'GBP'
          }
        }),
        requestedDeliveryDate: selectedShipping.id === 3 && shippingAddress.country === 'United Kingdom' ? 
          new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
          undefined
      };

      console.log('Submitting to Royal Mail:', royalMailOrderData);

      // Submit order to Royal Mail
      let royalMailResponse;
      let labelResponse;
      let trackingNumber = '';
      
      try {
        royalMailResponse = await royalMailService.createOrder(royalMailOrderData);
        console.log('Royal Mail response:', royalMailResponse);

        labelResponse = await royalMailService.createShippingLabel(savedOrder.order_number);
        console.log('Shipping label response:', labelResponse);

        trackingNumber = royalMailResponse.trackingNumber || royalMailResponse.orderReference || '';
        
        await orderService.updateOrder(savedOrder.id, {
          tracking_number: trackingNumber,
          status: 'confirmed',
          updated_at: new Date().toISOString()
        });

        console.log('Order updated with tracking number:', trackingNumber);
      } catch (royalMailError) {
        console.error('Royal Mail submission failed:', royalMailError);
        
        await orderService.updateOrder(savedOrder.id, {
          status: 'pending_manual',
          notes: 'Royal Mail submission failed - manual processing required',
          updated_at: new Date().toISOString()
        });
        
        console.log('Order saved but Royal Mail submission failed. Manual processing required.');
      }

      // Clear cart and redirect to confirmation
      clearCart();
      const confirmationUrl = `/order-confirmation?order=${savedOrder.order_number}`;
      console.log('Navigating to:', confirmationUrl);
      navigate(confirmationUrl, { replace: true });
    } catch (error) {
      console.error('Error placing order:', error);
      
      let errorMessage = 'There was an error placing your order. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('Royal Mail')) {
          errorMessage = 'Order saved but there was an issue with shipping setup. We will process your order manually.';
        } else if (error.message.includes('database')) {
          errorMessage = 'There was an issue saving your order. Please try again.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Handle quantity changes
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  // Get available shipping options based on selected country
  const availableShippingOptions = getShippingOptionsByCountry(shippingAddress.country);

  // Load checkout data from localStorage on component mount
  useEffect(() => {
    try {
      const savedCheckoutData = localStorage.getItem('blueDreamTea_checkout_data');
      if (savedCheckoutData) {
        const checkoutData = JSON.parse(savedCheckoutData);
        setShippingAddress(checkoutData.shippingAddress);
        setBillingAddress(checkoutData.billingAddress);
        setSelectedShippingOptionId(checkoutData.selectedShippingOptionId);
        setShippingCost(checkoutData.shippingCost);
        setFinalTotal(checkoutData.finalTotal);
      }
    } catch (error) {
      console.error('Error loading checkout data:', error);
    }
  }, []);

  // Calculate total savings from discounts
  const totalSavings = cart.items.reduce((total, item) => {
    if (item.originalPrice !== item.price) {
      return total + ((item.originalPrice - item.price) * item.quantity);
    }
    return total;
  }, 0) + cart.discountAmount;

  return (
    <>
      <Helmet>
        <title>Special Offers - Blue Dream Tea UK</title>
        <meta name="description" content="Exclusive pre-purchase offers on blue lotus flower products." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">


        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
          {/* Limited Time Banner */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center space-x-2">
              <HiClock className="h-5 w-5" />
              <span className="font-semibold">Limited Time Offer - You Won't See This Discount Again!</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column: Upgrade Options */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <HiArrowUp className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Upgrade & Save 15%</h2>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Get better value with larger quantities and enjoy additional savings!
                </p>
                
                {upgradeProducts.length > 0 ? (
                  <div className="space-y-4">
                    {upgradeProducts.map((upgrade, index) => {
                      const upgradePrice = (upgrade.upgradeVariant.salePrice || upgrade.upgradeVariant.price) * 0.85;
                      const savings = ((upgrade.upgradeVariant.salePrice || upgrade.upgradeVariant.price) - upgradePrice) + upgrade.savings;
                      
                      const upgradeKey = `${upgrade.originalItem.id}-${upgrade.upgradeVariant.value}`;
                      const isAdded = addedUpgrades.has(upgradeKey);
                      
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start space-x-3 sm:space-x-4">
                            <img
                              src={upgrade.product.images.main}
                              alt={upgrade.product.title}
                              className="h-16 w-16 object-cover rounded-lg"
                            />
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                                {upgrade.product.title}
                              </h3>
                              <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                                {upgrade.upgradeVariant.label} (instead of {upgrade.originalItem.variantLabel})
                              </p>
                              
                              <div className="flex items-center space-x-2">
                                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">
                                  Save £{savings.toFixed(2)}
                                </div>
                                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">
                                  15% OFF
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right flex-shrink-0">
                              <div className="text-sm font-bold text-gray-900">
                                £{upgradePrice.toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500 line-through">
                                £{(upgrade.upgradeVariant.salePrice || upgrade.upgradeVariant.price).toFixed(2)}
                              </div>
                              <button
                                onClick={() => handleUpgrade(upgrade)}
                                disabled={isAdded}
                                className={`mt-2 px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                                  isAdded 
                                    ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <HiCheck className="inline h-3 w-3 mr-1" />
                                    Upgraded
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
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No upgrade options available for your current items.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Additional Products Slideshow */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Add These Popular Products</h2>
                <p className="text-gray-600 mb-4">
                  Complete your wellness journey with these complementary products at 25% off!
                </p>
                
                {additionalProducts.length > 0 ? (
                  <div className="relative">
                    <div className="overflow-hidden">
                      <div 
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {Array.from({ length: Math.ceil(additionalProducts.length / 2) }, (_, slideIndex) => (
                          <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-1 gap-4">
                                                         {additionalProducts.slice(slideIndex * 2, slideIndex * 2 + 2).map((product, index) => {
                               // Get the first variant, handling both ProductVariant and ProductVariantGroup
                               let variant: any = product.variants[0];
                               if ('options' in variant) {
                                 variant = variant.options[0]; // Get first option from group
                               }
                               const discountedPrice = (variant.salePrice || variant.price) * 0.75;
                               const savings = (variant.salePrice || variant.price) - discountedPrice;
                              
                              const productKey = `${product.slug}-${variant.value}`;
                              const isAdded = addedProducts.has(productKey);
                              
                              return (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                  <div className="flex items-start space-x-3 sm:space-x-4">
                                    <img
                                      src={product.images.main}
                                      alt={product.title}
                                      className="h-16 w-16 object-cover rounded-lg"
                                    />
                                    
                                    <div className="flex-1 min-w-0">
                                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                                        {product.title}
                                      </h3>
                                      <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                                        {variant.label}
                                      </p>
                                      
                                      <div className="flex items-center space-x-2">
                                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">
                                          Save £{savings.toFixed(2)}
                                        </div>
                                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 whitespace-nowrap">
                                          25% OFF
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="text-right flex-shrink-0">
                                      <div className="text-sm font-bold text-gray-900">
                                        £{discountedPrice.toFixed(2)}
                                      </div>
                                      <div className="text-xs text-gray-500 line-through">
                                        £{(variant.salePrice || variant.price).toFixed(2)}
                                      </div>
                                      <button
                                        onClick={() => handleAddProduct(product)}
                                        disabled={isAdded}
                                        className={`mt-2 px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                                          isAdded 
                                            ? 'bg-purple-100 text-purple-800 cursor-not-allowed' 
                                            : 'bg-purple-600 text-white hover:bg-purple-700'
                                        }`}
                                      >
                                        {isAdded ? (
                                          <>
                                            <HiCheck className="inline h-3 w-3 mr-1" />
                                            Added
                                          </>
                                        ) : (
                                          'Add to Cart'
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Slideshow Controls */}
                    {additionalProducts.length > 2 && (
                      <div className="flex items-center justify-center space-x-3 mt-6">
                        <button
                          onClick={prevSlide}
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors shadow-sm"
                          aria-label="Previous slide"
                        >
                          <HiChevronLeft className="h-5 w-5 text-gray-600" />
                        </button>
                        
                        <div className="flex items-center space-x-2">
                          {Array.from({ length: Math.ceil(additionalProducts.length / 2) }, (_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentSlide(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                currentSlide === index 
                                  ? 'bg-blue-600 shadow-sm' 
                                  : 'bg-gray-300 hover:bg-gray-400'
                              }`}
                              aria-label={`Go to slide ${index + 1}`}
                            />
                          ))}
                        </div>
                        
                        <button
                          onClick={nextSlide}
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors shadow-sm"
                          aria-label="Next slide"
                        >
                          <HiChevronRight className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No additional products available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="mt-12 bg-white rounded-lg shadow-lg border border-gray-200">
            {/* Cart Summary Header */}
            <div 
              className="p-6 cursor-pointer border-b border-gray-100"
              onClick={() => setIsCartExpanded(!isCartExpanded)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900">Your Order Summary</h3>
                </div>
                <div className="flex items-center space-x-4">
                  {!isCartExpanded && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        £{(cart.total + shippingCost).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total
                      </div>
                    </div>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    {isCartExpanded ? <HiChevronUp className="h-5 w-5" /> : <HiChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Cart Summary Content */}
            {isCartExpanded && (
              <div className="p-6 space-y-4">
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.productImage}
                        alt={item.productTitle}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.productTitle}
                        </h4>
                        <p className="text-xs text-gray-500">{item.variantLabel}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          £{(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.originalPrice !== item.price && (
                          <div className="text-xs text-gray-500 line-through">
                            £{(item.originalPrice * item.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Remove item"
                      >
                        <HiTrash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="space-y-3 border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm font-medium text-gray-900">
                      £{cart.subtotal.toFixed(2)}
                    </span>
                  </div>

                  {cart.discountAmount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600">
                        Discount ({cart.discountCode})
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        -£{cart.discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Shipping</span>
                    <span className="text-sm font-medium text-gray-900">
                      {shippingCost === 0 ? 'Free' : `£${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      £{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {cart.total < 30 && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-700">
                      Add £{(30 - cart.total).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Customer Information Summary */}
          <div className="mt-8 bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                  <p>{shippingAddress.addressLine1}</p>
                  {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                  <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
                  <p>{shippingAddress.country}</p>
                  <p>Phone: {shippingAddress.phone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Email: {billingAddress.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleContinueToCheckout}
              disabled={isPlacingOrder}
              className="bg-blue-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
            >
              <HiCreditCard className="h-5 w-5" />
              <span>
                {isPlacingOrder ? 'Placing Order...' : 'Pay Now'}
              </span>
            </button>
          </div>

          {/* Alert Message */}
          {showAlert && (
            <div className="mt-4 text-center">
              <p className="text-red-600">
                Please fill out all required information.
              </p>
            </div>
          )}

          {/* Trust Badges */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-6 text-sm text-gray-500">
              <span>✓ Secure Checkout</span>
              <span>✓ Free UK Delivery over £30</span>
              <span>✓ 100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrePurchaseUpsellPage; 