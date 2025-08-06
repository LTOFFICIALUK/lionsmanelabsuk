import type { VercelRequest, VercelResponse } from '@vercel/node';

// Enhanced Pixxles configuration with validation
const PIXXLES_CONFIG = {
  merchantID: process.env.PIXXLES_MERCHANT_ID || '132779',
  signatureKey: process.env.PIXXLES_SIGNATURE_KEY || 'gpfu2XDYLKWvbZi',
  gatewayUrl: process.env.PIXXLES_GATEWAY_URL || 'https://qa-transactions.pixxlesportal.com/direct',
  environment: process.env.PIXXLES_ENVIRONMENT || 'sandbox'
};

// Validate configuration on startup
const validateConfig = () => {
  if (!PIXXLES_CONFIG.merchantID || !PIXXLES_CONFIG.signatureKey) {
    throw new Error('Missing required Pixxles configuration');
  }
};

// Rate limiting store (in production, use Redis or external service)
const rateLimitStore = new Map();

// Rate limiting middleware
const rateLimit = (req: VercelRequest, clientIP: string): boolean => {
  const key = `${clientIP}:${Date.now()}`;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10; // Max 10 requests per minute

  // Clean old entries
  for (const [k, timestamp] of rateLimitStore.entries()) {
    if (now - timestamp > windowMs) {
      rateLimitStore.delete(k);
    }
  }

  // Count requests from this IP in the current window
  const requestCount = Array.from(rateLimitStore.entries())
    .filter(([k, timestamp]) => 
      k.startsWith(clientIP) && now - timestamp <= windowMs
    ).length;

  if (requestCount >= maxRequests) {
    return false;
  }

  rateLimitStore.set(key, now);
  return true;
};

// Input validation
const validateTransactionData = (data: any): void => {
  // Check if this is a 3DS continuation request
  const is3DSContinuation = data.threeDSRef && data['threeDSResponse[threeDSMethodData]'];
  
  if (is3DSContinuation) {
    // For 3DS continuation, we only need these fields
    const requiredFields = ['action', 'type', 'threeDSRef'];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Missing required field for 3DS continuation: ${field}`);
      }
    }
    
    // Validate action for 3DS continuation
    if (data.action !== 'SALE') {
      throw new Error('Invalid action for 3DS continuation - must be SALE');
    }
    
    return; // Skip other validations for 3DS continuation
  }
  
  // For regular transactions, validate all required fields
  const requiredFields = ['action', 'amount', 'currencyCode', 'orderRef'];
  
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Validate amount
  const amount = parseInt(data.amount);
  if (isNaN(amount) || amount <= 0) {
    throw new Error('Invalid amount');
  }

  // Validate currency code
  if (!['826', '840'].includes(data.currencyCode)) {
    throw new Error('Invalid currency code');
  }

  // Validate action
  if (!['SALE', 'VERIFY', 'REFUND_SALE', 'CANCEL', 'QUERY'].includes(data.action)) {
    throw new Error('Invalid action');
  }
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
  try {
    // Validate configuration
    validateConfig();

    // Get client IP for rate limiting
    const clientIP = req.headers['x-forwarded-for'] as string || 
                    req.headers['x-real-ip'] as string || 
                    req.connection.remoteAddress || 
                    '127.0.0.1';

    // Apply rate limiting
    if (!rateLimit(req, clientIP.toString())) {
      return res.status(429).json({ 
        error: 'Too many requests', 
        details: 'Rate limit exceeded. Please try again later.' 
      });
    }

    // Add CORS headers with more restrictive settings
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:5173',
      'http://localhost:5174', 
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:5177'
    ];
    const origin = req.headers.origin;
    
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (origin) {
      console.log('Blocked request from unauthorized origin:', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get the transaction data from the request body
    const transactionData = req.body;

    console.log('Received transaction data:', JSON.stringify({
      ...transactionData,
      cardNumber: transactionData.cardNumber ? '****' + transactionData.cardNumber.slice(-4) : undefined,
      cardCVV: transactionData.cardCVV ? '***' : undefined
    }, null, 2));

    // Validate input data
    validateTransactionData(transactionData);

    // Remove any existing signature (frontend shouldn't send one)
    delete transactionData.signature;
    
    // Add merchant ID to transaction data
    transactionData.merchantID = PIXXLES_CONFIG.merchantID;
    
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

    console.log('Sending to Pixxles Gateway:', PIXXLES_CONFIG.gatewayUrl);

    // Send request to Pixxles with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(PIXXLES_CONFIG.gatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'BlueDreamTea-Payment-Gateway/1.0',
      },
      body: formData.toString(),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    console.log('Pixxles response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Pixxles error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const responseText = await response.text();
    console.log('Pixxles response received');
    
    // Parse the response (it's form-urlencoded)
    const responseData: Record<string, string> = {};
    const params = new URLSearchParams(responseText);
    for (const [key, value] of params.entries()) {
      responseData[key] = value;
    }

    console.log('Parsed response data');

    // Verify response signature
    const responseSignature = responseData.signature;
    delete responseData.signature;
    
    const expectedSignature = createSignature(responseData, PIXXLES_CONFIG.signatureKey);
    
    if (responseSignature !== expectedSignature) {
      console.error('Signature verification failed');
      console.error('Expected:', expectedSignature);
      console.error('Received:', responseSignature);
      throw new Error('Response signature verification failed');
    }

    // Add signature back to response
    responseData.signature = responseSignature;

    // Return the response data
    res.status(200).json(responseData);

  } catch (error) {
    console.error('Pixxles API error:', error);
    
    // Handle different types of errors
    let statusCode = 500;
    let errorMessage = 'Internal server error';
    
    if (error instanceof Error) {
      if (error.message.includes('Missing required field') || 
          error.message.includes('Invalid')) {
        statusCode = 400;
        errorMessage = 'Invalid request data';
      } else if (error.message.includes('Rate limit')) {
        statusCode = 429;
        errorMessage = 'Too many requests';
      } else if (error.message.includes('signature verification')) {
        statusCode = 422;
        errorMessage = 'Payment gateway response verification failed';
      } else if (error.name === 'AbortError') {
        statusCode = 408;
        errorMessage = 'Request timeout';
      }
    }
    
    res.status(statusCode).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
    });
  }
} 