import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CartItem } from '../types';

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      throw new Error('Stripe publishable key is not configured');
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Create checkout session
export const createCheckoutSession = async (
  cartItems: CartItem[],
  customerEmail: string,
  shippingAddress: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  },
  shippingCost: number,
  discountCode?: string,
  discountAmount?: number
) => {
  try {
    // Transform cart items to Stripe line items format
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.productTitle,
          description: item.variantLabel,
          images: [item.productImage],
        },
        unit_amount: Math.round(item.price * 100), // Convert to pence
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item if there's a cost
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Shipping',
            description: 'Shipping cost',
            images: [],
          },
          unit_amount: Math.round(shippingCost * 100), // Convert to pence
        },
        quantity: 1,
      });
    }

    // Add discount as a negative line item if there's a discount
    if (discountAmount && discountAmount > 0) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Discount',
            description: discountCode ? `Discount code: ${discountCode}` : 'Discount',
            images: [],
          },
          unit_amount: -Math.round(discountAmount * 100), // Negative amount for discount
        },
        quantity: 1,
      });
    }

    const response = await fetch('/api/create-checkout-session-v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        line_items: lineItems,
        customer_email: customerEmail,
        shipping_address: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          line1: shippingAddress.addressLine1,
          line2: shippingAddress.addressLine2 || '',
          city: shippingAddress.city,
          postal_code: shippingAddress.postalCode,
          country: getCountryCode(shippingAddress.country),
        },
        phone: shippingAddress.phone,
        success_url: `${window.location.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/checkout`,
        metadata: {
          discount_code: discountCode || '',
          discount_amount: discountAmount?.toString() || '0',
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Redirect to Stripe Checkout
export const redirectToCheckout = async (sessionId: string) => {
  try {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
};

// Get country code for Stripe
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
    'Hong Kong': 'HK',
  };
  return countryCodes[countryName] || 'GB';
};

// Retrieve checkout session (for success page)
export const retrieveCheckoutSession = async (sessionId: string) => {
  try {
    const response = await fetch(`/api/retrieve-checkout-session?session_id=${sessionId}`);
    
    if (!response.ok) {
      throw new Error('Failed to retrieve checkout session');
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    throw error;
  }
};

export { getStripe };
