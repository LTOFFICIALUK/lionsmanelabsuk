const axios = require('axios');

const API_KEY = process.env.VITE_ROYAL_MAIL_API_KEY;
const API_URL = 'https://api.parcel.royalmail.com/api/v1';

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'Royal Mail API key not configured' });
  }

  try {
    const { method, endpoint, data } = req.body;

    if (!method || !endpoint) {
      return res.status(400).json({ error: 'Method and endpoint are required' });
    }

    const response = await axios({
      method: method.toLowerCase(),
      url: `${API_URL}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'BlueDreamTea-Payment-Gateway/1.0'
      },
      data: data || undefined,
      responseType: endpoint.includes('/label') ? 'arraybuffer' : 'json'
    });

    // Handle binary responses (like PDF labels)
    if (response.data instanceof ArrayBuffer) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="shipping-label.pdf"');
      return res.send(Buffer.from(response.data));
    }

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Royal Mail API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });

    return res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
}; 