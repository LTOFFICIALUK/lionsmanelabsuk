import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useCart } from '../contexts/CartContext';
import { ShippingAddress, BillingAddress, Order } from '../types';
import { HiLockClosed, HiCreditCard, HiTruck } from 'react-icons/hi';
import { orderService } from '../utils/supabase';
import { discountService } from '../utils/discount-service';
import { shippingOptions, calculateShippingCost, getShippingOptionsByCountry } from '../constants/shipping-options';
import { createCheckoutSession, redirectToCheckout } from '../utils/stripe';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // Form state
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

  const [selectedShippingOptionId, setSelectedShippingOptionId] = useState<number>(1); // Default to Standard Shipping

  // Debug logging for shipping option changes
  const handleShippingOptionChange = (optionId: number) => {
    console.log('Shipping option changed from', selectedShippingOptionId, 'to', optionId);
    setSelectedShippingOptionId(optionId);
  };
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [showAlert, setShowAlert] = useState(false);

  // Get available shipping options based on selected country
  const availableShippingOptions = getShippingOptionsByCountry(shippingAddress.country);

  // Reset shipping option when country changes
  useEffect(() => {
    const firstOption = availableShippingOptions[0];
    if (firstOption && firstOption.id !== selectedShippingOptionId) {
      console.log('Country changed, resetting shipping option to:', firstOption.id);
      setSelectedShippingOptionId(firstOption.id);
    }
  }, [shippingAddress.country, availableShippingOptions]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.items.length === 0) {
      navigate('/cart');
    }
  }, [cart.items.length, navigate]);



  // Calculate shipping cost
  const shippingCost = calculateShippingCost(cart.total, selectedShippingOptionId);
  const finalTotal = cart.total + shippingCost;

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
    let hasErrors = false; // Track if there are errors

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
    setShowAlert(hasErrors); // Show alert if there are errors
    return !hasErrors; // Return true if no errors
  };

  const generateOrderNumber = (): string => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `BDT-${timestamp.slice(-6)}${random}`;
  };

  const handleContinueToPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    // Proceed directly to Stripe Checkout
    await handleStripeCheckout();
  };

  const handleStripeCheckout = async () => {
    setIsPlacingOrder(true);

    try {
      // Create Stripe checkout session
      const sessionId = await createCheckoutSession(
        cart.items,
        billingAddress.email,
        shippingAddress,
        shippingCost,
        cart.discountCode,
        cart.discountAmount
      );

      // Redirect to Stripe Checkout
      await redirectToCheckout(sessionId);
    } catch (error) {
      console.error('Error initiating Stripe checkout:', error);
      alert('There was an error processing your payment. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handlePaymentSuccess = async (paymentResponse: any) => {
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
            status: 'paid',
            notes: `Payment processed. Transaction ID: ${paymentResponse?.transactionID || 'N/A'}, XRef: ${paymentResponse?.xref || 'N/A'}`,
            tracking_number: '',
            payment_transaction_id: paymentResponse?.transactionID || '',
            payment_xref: paymentResponse?.xref || '',
            payment_authorisation_code: paymentResponse?.authorisationCode || ''
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
                // Get the discount code details to record usage
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
                // Don't throw error - we don't want to break the checkout flow
            }
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
            // Add sender details from environment variables if available
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
                unitWeightInGrams: 50, // Default weight per item - adjust based on your products
                // Add customs information for international orders
                ...(shippingAddress.country !== 'United Kingdom' && {
                    customsDescription: item.productTitle,
                    customsValue: item.price,
                    countryOfOrigin: 'GB'
                })
            })),
            parcel: {
                weightInGrams: cart.items.reduce((total, item) => total + (item.quantity * 50), 0), // Calculate total weight
                lengthInCm: 20,
                widthInCm: 15,
                heightInCm: 10
            },
            shippingService: {
                code: 'STANDARD', // Royal Mail service removed - using default
                name: selectedShipping.name
            },
            label: {
                includeLabelInResponse: true
            },
            // Add customs information for international orders
            ...(shippingAddress.country !== 'United Kingdom' && {
                customsInformation: {
                    reasonForExport: 'Sale of goods',
                    incoterms: 'DDP',
                    shippingCharges: shippingCost,
                    shippingChargesCurrency: 'GBP'
                }
            }),
            // Request next day delivery for express services (UK only)
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
            // Royal Mail service removed - using mock response
            // royalMailResponse = await royalMailService.createOrder(royalMailOrderData);
            // console.log('Royal Mail response:', royalMailResponse);

            // Create shipping label
            // labelResponse = await royalMailService.createShippingLabel(savedOrder.order_number);
            // console.log('Shipping label response:', labelResponse);
            
            // Mock response for testing
            royalMailResponse = { trackingNumber: 'MOCK-TRACKING-' + savedOrder.order_number };
            labelResponse = { success: true };

            // Get tracking number from response
            trackingNumber = royalMailResponse.trackingNumber || '';
            
            // Update order with tracking number and status
            await orderService.updateOrder(savedOrder.id, {
                tracking_number: trackingNumber,
                status: 'confirmed',
                updated_at: new Date().toISOString()
            });

            console.log('Order updated with tracking number:', trackingNumber);
        } catch (royalMailError) {
            console.error('Royal Mail submission failed:', royalMailError);
            
            // Update order status to indicate manual processing needed
            await orderService.updateOrder(savedOrder.id, {
                status: 'pending_manual',
                notes: 'Royal Mail submission failed - manual processing required',
                updated_at: new Date().toISOString()
            });
            
            // Don't throw error - order is still saved, just needs manual processing
            console.log('Order saved but Royal Mail submission failed. Manual processing required.');
        }

        // Clear cart and redirect to confirmation
        clearCart();
        const confirmationUrl = `/order-confirmation?order=${savedOrder.order_number}`;
        console.log('Navigating to:', confirmationUrl);
        navigate(confirmationUrl, { replace: true });
    } catch (error) {
        console.error('Error placing order:', error);
        
        // Provide more specific error messages
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

  const handleOrderPlacement = async () => {
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
        notes: 'Order placed via checkout',
        tracking_number: '',
        payment_transaction_id: '',
        payment_xref: '',
        payment_authorisation_code: ''
      };

      const { data: savedOrder, error } = await orderService.createOrder(orderData);

      if (error || !savedOrder) {
        throw new Error(error?.message || 'Failed to save order');
      }

      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-confirmation', { 
        state: { 
          orderNumber: savedOrder.order_number,
          total: finalTotal
        } 
      });
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Order created but there was an error. Please contact support.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout - Lion's Mane Labs UK</title>
        <meta name="description" content="Complete your Lion's Mane mushroom supplement order securely." />
      </Helmet>

      <div className="max-w-6xl mx-auto py-12 lg:px-12 md:px-8 sm:px-4 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>


        <form onSubmit={handleContinueToPayment}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Forms */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={billingAddress.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Order confirmation and tracking info will be sent here
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={shippingAddress.firstName}
                      onChange={(e) => handleShippingChange('firstName', e.target.value)}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.firstName && (
                      <p className="text-sm text-red-600 mt-1">{formErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={shippingAddress.lastName}
                      onChange={(e) => handleShippingChange('lastName', e.target.value)}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.lastName && (
                      <p className="text-sm text-red-600 mt-1">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    value={shippingAddress.addressLine1}
                    onChange={(e) => handleShippingChange('addressLine1', e.target.value)}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.addressLine1 ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Street address"
                  />
                  {formErrors.addressLine1 && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.addressLine1}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={shippingAddress.city}
                      onChange={(e) => handleShippingChange('city', e.target.value)}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.city && (
                      <p className="text-sm text-red-600 mt-1">{formErrors.city}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={(e) => handleShippingChange('postalCode', e.target.value)}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.postalCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.postalCode && (
                      <p className="text-sm text-red-600 mt-1">{formErrors.postalCode}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <select
                    id="country"
                    value={shippingAddress.country}
                    onChange={(e) => handleShippingChange('country', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Spain">Spain</option>
                    <option value="Italy">Italy</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Austria">Austria</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Norway">Norway</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Finland">Finland</option>
                    <option value="Ireland">Ireland</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Japan">Japan</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={shippingAddress.phone}
                    onChange={(e) => handleShippingChange('phone', e.target.value)}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={shippingAddress.country === 'United Kingdom' ? '07123 456789' : '+1234567890'}
                  />
                  {formErrors.phone && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Shipping Method Selection */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <HiTruck className="h-6 w-6 mr-2" />
                  Shipping Method
                  {shippingAddress.country !== 'United Kingdom' && (
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      (International)
                    </span>
                  )}
                </h2>
                
                <div className="space-y-4">
                  {availableShippingOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`block relative border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedShippingOptionId === option.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                      onClick={() => handleShippingOptionChange(option.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleShippingOptionChange(option.id);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={selectedShippingOptionId === option.id}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={option.id}
                        checked={selectedShippingOptionId === option.id}
                        onChange={() => handleShippingOptionChange(option.id)}
                        className="sr-only"
                        aria-label={`Select ${option.name} shipping`}
                      />
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <p className="font-medium text-gray-900">{option.name}</p>
                            {selectedShippingOptionId === option.id && (
                              <svg className="ml-2 h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{option.description}</p>
                          <p className="text-sm text-gray-500">Estimated delivery: {option.estimatedDays}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {cart.total >= 30 && (option.id === 1 || option.id === 2) ? (
                              <>
                                <span className="line-through text-gray-400 mr-2">£{option.price.toFixed(2)}</span>
                                <span className="text-green-600">Free</span>
                              </>
                            ) : (
                              `£${option.price.toFixed(2)}`
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {formErrors.shipping && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.shipping}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                {/* Order Items */}
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
                      <div className="text-sm font-medium text-gray-900">
                        £{(item.price * item.quantity).toFixed(2)}
                      </div>
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

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Shipping</span>
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
                  
                  {shippingAddress.country !== 'United Kingdom' && (
                    <div className="text-xs text-gray-500 italic">
                      International shipping rates apply
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      £{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Proceed to Stripe Checkout Button */}
                <button
                  type="submit"
                  disabled={isPlacingOrder}
                  className="w-full mt-8 bg-blue-600 text-white py-4 px-6 rounded-md font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <HiCreditCard className="h-5 w-5" />
                  <span>{isPlacingOrder ? 'Processing...' : 'Proceed to Secure Checkout'}</span>
                </button>

                {/* Alert Message */}
                {showAlert && (
                  <p className="mt-4 text-red-600 text-center">
                    Please fill out all required information.
                  </p>
                )}

                {/* Security Notice */}
                <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <HiLockClosed className="h-4 w-4" />
                  <span>Your information is secure and encrypted</span>
                </div>

                <p className="text-xs text-gray-500 text-center mt-2">
                  Secure payment processing powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </form>

      </div>
    </>
  );
};

export default CheckoutPage; 