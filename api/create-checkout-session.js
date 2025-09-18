const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Creating checkout session with data:', req.body);
    
    const {
      line_items,
      customer_email,
      shipping_address,
      phone,
      success_url,
      cancel_url,
      metadata
    } = req.body;

    if (!line_items || line_items.length === 0) {
      return res.status(400).json({ error: 'No line items provided' });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email,
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA', 'AU', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'CH', 'AT', 'SE', 'NO', 'DK', 'FI', 'IE', 'NZ', 'JP', 'KR', 'SG', 'HK'],
      },
      phone_number_collection: {
        enabled: true,
      },
      success_url,
      cancel_url,
      metadata,
      // Enable automatic tax calculation if available
      automatic_tax: { enabled: true },
      // Set shipping address if provided
      ...(shipping_address && {
        shipping_address_collection: {
          allowed_countries: ['GB', 'US', 'CA', 'AU', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'CH', 'AT', 'SE', 'NO', 'DK', 'FI', 'IE', 'NZ', 'JP', 'KR', 'SG', 'HK'],
        },
      }),
    });

    console.log('Checkout session created successfully:', session.id);
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message 
    });
  }
}
