import type { VercelRequest, VercelResponse } from '@vercel/node';

// Pixxles configuration from environment variables
const PIXXLES_CONFIG = {
  merchantID: process.env.VITE_PIXXLES_MERCHANT_ID || '132779',
  signatureKey: process.env.VITE_PIXXLES_SIGNATURE_KEY || 'gpfu2XDYLKWvbZi',
  gatewayUrl: process.env.VITE_PIXXLES_GATEWAY_URL || 'https://qa-transactions.pixxlesportal.com/direct',
  environment: process.env.VITE_PIXXLES_ENVIRONMENT || 'sandbox'
};

// Utility functions for signature calculation
const ksort = (data: Record<string, any>): Record<string, any> => {
  const keys = Object.keys(data).sort((a, b) => a.localeCompare(b));
  const ret: Record<string, any> = {};
  for (const k of keys) {
    ret[k] = data[k];
  }
  return ret;
};

const urlencode = (str: string): string => {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/~/g, '%7E')
    .replace(/%20/g, '+');
};

const http_build_query = (data: Record<string, any>): string => {
  const build = (key: string, val: any): string => {
    if (val === true) {
      val = '1';
    } else if (val === false) {
      val = '0';
    }

    if (val === null) {
      return '';
    } else if (typeof val === 'object') {
      const tmp: string[] = [];
      for (const k in val) {
        if (val[k] !== null) {
          tmp.push(build(key + '[' + k + ']', val[k]));
        }
      }
      return tmp.join('&');
    } else if (typeof val !== 'function') {
      return urlencode(key) + '=' + urlencode(val);
    } else {
      throw new Error('There was an error processing for http_build_query().');
    }
  };

  const ret: string[] = [];
  for (const key in data) {
    const val = data[key];
    const tmp = build(key, val);
    if (tmp !== '') {
      ret.push(tmp);
    }
  }

  return ret.join('&');
};

const createSignature = (data: Record<string, any>, key: string): string => {
  const crypto = require('crypto');
  
  // Sort the data in ascending ascii key order
  const sortedData = ksort(data);

  // Convert to a URL encoded string
  let ret = http_build_query(sortedData);

  // Normalise all line endings (CRNL|NLCR|NL|CR) to just NL (%0A)
  ret = ret.replace(/%0D%0A|%0A%0D|%0D/gi, '%0A');

  // Hash the string and secret together using SHA-512
  return crypto.createHash('sha512').update(ret + key).digest('hex');
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the transaction data from the request body
    const transactionData = req.body;

    // Create signature
    const signature = createSignature(transactionData, PIXXLES_CONFIG.signatureKey);
    transactionData.signature = signature;

    // Convert data to form-urlencoded format
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(transactionData)) {
      if (value !== null && value !== undefined) {
        if (typeof value === 'object') {
          // Handle nested objects (like threeDSResponse)
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            formData.append(`${key}[${nestedKey}]`, nestedValue as string);
          }
        } else {
          formData.append(key, value.toString());
        }
      }
    }

    // Send request to Pixxles
    const response = await fetch(PIXXLES_CONFIG.gatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    
    // Parse the response (it's form-urlencoded)
    const responseData: Record<string, string> = {};
    const params = new URLSearchParams(responseText);
    for (const [key, value] of params.entries()) {
      responseData[key] = value;
    }

    // Verify response signature
    const responseSignature = responseData.signature;
    delete responseData.signature;
    
    const expectedSignature = createSignature(responseData, PIXXLES_CONFIG.signatureKey);
    
    if (responseSignature !== expectedSignature) {
      throw new Error('Response signature verification failed');
    }

    // Return the response data
    res.status(200).json(responseData);

  } catch (error) {
    console.error('Pixxles API error:', error);
    res.status(500).json({ 
      error: 'Payment processing failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
} 