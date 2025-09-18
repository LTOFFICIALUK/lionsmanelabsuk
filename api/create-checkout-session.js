const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      line_items,
      customer_email,
      shipping_address,
      phone,
      success_url,
      cancel_url,
      metadata
    } = req.body;

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

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
