const crypto = require('crypto');

const MERCHANT_ID = process.env.PIXXLES_MERCHANT_ID;
const SIGNATURE_KEY = process.env.PIXXLES_SIGNATURE_KEY;
const GATEWAY_URL = process.env.PIXXLES_GATEWAY_URL;

module.exports = async (req, res) => {
  console.log('Pixxles API route called:', req.method, req.url);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!MERCHANT_ID || !SIGNATURE_KEY || !GATEWAY_URL) {
    return res.status(500).json({ error: 'Pixxles configuration not found' });
  }

  try {
    // Parse form-urlencoded data from request body
    let transactionData;
    
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      // Parse form-urlencoded data
      const params = new URLSearchParams(req.body);
      transactionData = Object.fromEntries(params);
    } else {
      // Parse JSON data
      const { transactionData: jsonData } = req.body;
      if (!jsonData) {
        return res.status(400).json({ error: 'Transaction data is required' });
      }
      transactionData = jsonData;
    }

    // Add merchant ID and calculate signature
    const dataWithMerchant = {
      ...transactionData,
      merchantID: MERCHANT_ID
    };

    // Create signature
    const signatureData = Object.keys(dataWithMerchant)
      .sort()
      .map(key => `${key}=${dataWithMerchant[key]}`)
      .join('&') + SIGNATURE_KEY;

    const signature = crypto.createHash('sha512').update(signatureData).digest('hex');
    dataWithMerchant.signature = signature;

    // Convert to form-urlencoded
    const formData = new URLSearchParams();
    Object.entries(dataWithMerchant).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    // Make request to Pixxles
    const response = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    const responseText = await response.text();
    
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
      const expectedSignature = crypto.createHash('sha512')
        .update(responseText.replace(`&signature=${responseData.signature}`, '') + SIGNATURE_KEY)
        .digest('hex');
      
      if (expectedSignature !== responseData.signature) {
        console.warn('Pixxles response signature verification failed');
      }
    }

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Pixxles API Error:', error);
    return res.status(500).json({
      error: error.message || 'Payment processing failed'
    });
  }
}; 