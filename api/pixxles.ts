import { NextRequest } from 'next/server';
import crypto from 'crypto';

// Environment variables
const MERCHANT_ID = process.env.PIXXLES_MERCHANT_ID;
const SIGNATURE_KEY = process.env.PIXXLES_SIGNATURE_KEY;
const GATEWAY_URL = process.env.PIXXLES_GATEWAY_URL;

// Configure runtime
export const config = {
  runtime: 'edge',
  regions: ['lhr1'], // London for lowest latency
};

export default async function handler(req: NextRequest) {
  // Enable CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    const data = await req.json();

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
            formData.append(`${key}[${nestedKey}]`, nestedValue as string);
          }
        } else {
          formData.append(key, value.toString());
        }
      }
    }

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

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    console.error('Pixxles API Error:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Payment processing failed'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}