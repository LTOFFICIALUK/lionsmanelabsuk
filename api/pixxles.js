const crypto = require('crypto');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const data = req.body;

    // Environment variables
    const MERCHANT_ID = process.env.PIXXLES_MERCHANT_ID || '132779';
    const SIGNATURE_KEY = process.env.PIXXLES_SIGNATURE_KEY || 'test_signature_key';
    const GATEWAY_URL = process.env.PIXXLES_GATEWAY_URL || 'https://qa-transactions.pixxlesportal.com/direct';

    // Add merchant ID
    const transactionData = {
      ...data,
      merchantID: MERCHANT_ID,
    };

    // Create signature
    const signatureData = Object.keys(transactionData)
      .sort()
      .map(key => `${key}=${transactionData[key]}`)
      .join('&') + SIGNATURE_KEY;

    const signature = crypto.createHash('sha512').update(signatureData).digest('hex');
    transactionData.signature = signature;

    // Convert to form-urlencoded
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(transactionData)) {
      if (value !== null && value !== undefined) {
        if (typeof value === 'object') {
          // Handle nested objects (like threeDSResponse)
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            formData.append(`${key}[${nestedKey}]`, nestedValue.toString());
          }
        } else {
          formData.append(key, value.toString());
        }
      }
    }

    console.log('Sending to Pixxles:', GATEWAY_URL);
    console.log('Form data:', formData.toString());

    // Make request to Pixxles
    const response = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'User-Agent': 'BlueDreamTea-Payment-Gateway/1.0',
      },
      body: formData.toString(),
    });

    const responseText = await response.text();
    console.log('Pixxles response status:', response.status);
    console.log('Pixxles response:', responseText);
    
    // Parse the response
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      // If not JSON, parse as form-urlencoded
      const params = new URLSearchParams(responseText);
      responseData = Object.fromEntries(params);
    }

    // Verify response signature if present
    if (responseData.signature) {
      const expectedSignature = crypto
        .createHash('sha512')
        .update(responseText.replace(`&signature=${responseData.signature}`, '') + SIGNATURE_KEY)
        .digest('hex');
      
      if (expectedSignature !== responseData.signature) {
        console.warn('Pixxles response signature verification failed');
      }
    }

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Pixxles API Error:', error);
    res.status(500).json({
      error: error.message || 'Payment processing failed'
    });
  }
}; 