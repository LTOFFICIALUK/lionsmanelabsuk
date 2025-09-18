import React, { useState } from 'react';
import { createCheckoutSession, redirectToCheckout } from '../utils/stripe';
import { useCart } from '../contexts/CartContext';

const StripeTestButton: React.FC = () => {
  const { cart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleTestCheckout = async () => {
    if (cart.items.length === 0) {
      alert('Please add items to your cart first');
      return;
    }

    setIsLoading(true);

    try {
      // Create a test checkout session
      const sessionId = await createCheckoutSession(
        cart.items,
        'test@example.com',
        {
          firstName: 'Test',
          lastName: 'Customer',
          addressLine1: '123 Test Street',
          city: 'London',
          postalCode: 'SW1A 1AA',
          country: 'United Kingdom',
          phone: '+44 20 7946 0958'
        },
        5.99, // Shipping cost
        cart.discountCode,
        cart.discountAmount
      );

      // Redirect to Stripe Checkout
      await redirectToCheckout(sessionId);
    } catch (error) {
      console.error('Test checkout failed:', error);
      alert('Test checkout failed. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  // Only show in development mode
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleTestCheckout}
        disabled={isLoading || cart.items.length === 0}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
      >
        {isLoading ? 'Testing...' : 'Test Stripe Checkout'}
      </button>
    </div>
  );
};

export default StripeTestButton;
