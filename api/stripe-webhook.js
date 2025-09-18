const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Stripe webhook secret not configured');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

async function handleCheckoutSessionCompleted(session) {
  console.log('Processing checkout session completed:', session.id);

  try {
    // Generate order number
    const orderNumber = generateOrderNumber();

    // Parse line items to get cart items
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const cartItems = lineItems.data.map(item => ({
      id: item.id,
      productTitle: item.description,
      productImage: item.price_data?.product_data?.images?.[0] || '',
      price: item.price_data.unit_amount / 100,
      quantity: item.quantity,
      variantLabel: item.description,
      originalPrice: item.price_data.unit_amount / 100,
      salePrice: item.price_data.unit_amount / 100,
      selectedVariants: {}
    }));

    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
    const total = session.amount_total / 100;
    const shippingCost = session.total_details?.amount_shipping ? session.total_details.amount_shipping / 100 : 0;
    const taxAmount = session.total_details?.amount_tax ? session.total_details.amount_tax / 100 : 0;

    // Create order data
    const orderData = {
      order_number: orderNumber,
      customer_first_name: session.shipping_details?.name?.split(' ')[0] || '',
      customer_last_name: session.shipping_details?.name?.split(' ').slice(1).join(' ') || '',
      customer_email: session.customer_details?.email || '',
      customer_phone: session.customer_details?.phone || '',
      shipping_address_line1: session.shipping_details?.address?.line1 || '',
      shipping_address_line2: session.shipping_details?.address?.line2 || '',
      shipping_city: session.shipping_details?.address?.city || '',
      shipping_postal_code: session.shipping_details?.address?.postal_code || '',
      shipping_country: getCountryName(session.shipping_details?.address?.country || ''),
      billing_email: session.customer_details?.email || '',
      items: JSON.stringify(cartItems),
      subtotal: subtotal,
      shipping_cost: shippingCost,
      shipping_method: 'Stripe Checkout',
      discount_code: session.metadata?.discount_code || '',
      discount_amount: session.metadata?.discount_amount ? parseFloat(session.metadata.discount_amount) : 0,
      total: total,
      status: 'paid',
      notes: `Payment processed via Stripe. Session ID: ${session.id}`,
      tracking_number: '',
      payment_transaction_id: session.payment_intent?.id || '',
      payment_xref: session.id,
      payment_authorisation_code: session.payment_intent?.charges?.data?.[0]?.id || ''
    };

    // Save order to database
    const { data: savedOrder, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error('Error saving order to database:', error);
      throw error;
    }

    console.log('Order created successfully:', savedOrder.order_number);

    // TODO: Send confirmation email
    // TODO: Create shipping label
    // TODO: Update inventory

  } catch (error) {
    console.error('Error processing checkout session:', error);
    throw error;
  }
}

async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log('Payment intent succeeded:', paymentIntent.id);
  // Additional processing if needed
}

function generateOrderNumber() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `BDT-${timestamp.slice(-6)}${random}`;
}

function getCountryName(countryCode) {
  const countries = {
    'GB': 'United Kingdom',
    'US': 'United States',
    'CA': 'Canada',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
    'ES': 'Spain',
    'IT': 'Italy',
    'NL': 'Netherlands',
    'BE': 'Belgium',
    'CH': 'Switzerland',
    'AT': 'Austria',
    'SE': 'Sweden',
    'NO': 'Norway',
    'DK': 'Denmark',
    'FI': 'Finland',
    'IE': 'Ireland',
    'NZ': 'New Zealand',
    'JP': 'Japan',
    'KR': 'South Korea',
    'SG': 'Singapore',
    'HK': 'Hong Kong'
  };
  return countries[countryCode] || countryCode;
}
