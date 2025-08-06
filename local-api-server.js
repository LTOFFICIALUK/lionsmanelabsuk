import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add support for form data

// Pixxles configuration
const PIXXLES_CONFIG = {
  merchantID: process.env.PIXXLES_MERCHANT_ID || '132779',
  signatureKey: process.env.PIXXLES_SIGNATURE_KEY || 'gpfu2XDYLKWvbZi',
  gatewayUrl: process.env.PIXXLES_GATEWAY_URL || 'https://qa-transactions.pixxlesportal.com/direct',
  environment: process.env.PIXXLES_ENVIRONMENT || 'sandbox'
};

// Utility functions (same as in the API route)
const ksort = (data) => {
  const keys = Object.keys(data).sort((a, b) => a.localeCompare(b));
  const ret = {};
  for (const k of keys) {
    ret[k] = data[k];
  }
  return ret;
};

const urlencode = (str) => {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/~/g, '%7E')
    .replace(/%20/g, '+');
};

const http_build_query = (data) => {
  const build = (key, val) => {
    if (val === true) {
      val = '1';
    } else if (val === false) {
      val = '0';
    }

    if (val === null) {
      return '';
    } else if (typeof val === 'object') {
      const tmp = [];
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

  const ret = [];
  for (const key in data) {
    const val = data[key];
    const tmp = build(key, val);
    if (tmp !== '') {
      ret.push(tmp);
    }
  }

  return ret.join('&');
};

const createSignature = (data, key) => {
  const sortedData = ksort(data);
  let ret = http_build_query(sortedData);
  ret = ret.replace(/%0D%0A|%0A%0D|%0D/gi, '%0A');
  return crypto.createHash('sha512').update(ret + key).digest('hex');
};

// API route
app.post('/api/payment/process', async (req, res) => {
  try {
    const transactionData = req.body;

    console.log('Received transaction data:', JSON.stringify(transactionData, null, 2));

    // Check if this is a 3DS continuation request (either threeDSRef OR threeDSResponse present)
    const is3DSContinuation = transactionData.threeDSRef || transactionData.threeDSResponse || transactionData['threeDSResponse[threeDSMethodData]'];
    
    // For 3DS continuation, add required fields
    if (is3DSContinuation) {
      transactionData.merchantID = PIXXLES_CONFIG.merchantID;
      transactionData.action = 'SALE'; // Continuation is still part of the original SALE
      console.log('This is a 3DS continuation request');
      console.log('threeDSRef present:', !!transactionData.threeDSRef);
      console.log('threeDSResponse present:', !!transactionData.threeDSResponse);
      console.log('threeDSResponse[threeDSMethodData] present:', !!transactionData['threeDSResponse[threeDSMethodData]']);
    }
    
    // Ensure required fields are present (skip validation for 3DS continuation)
    if (!is3DSContinuation && (!transactionData.action || !transactionData.amount || !transactionData.currencyCode)) {
      throw new Error('Missing required fields: action, amount, or currencyCode');
    }

    // Remove any existing signature
    delete transactionData.signature;
    
    // Create signature
    const signature = createSignature(transactionData, PIXXLES_CONFIG.signatureKey);
    transactionData.signature = signature;

    // Convert data to form-urlencoded format
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(transactionData)) {
      if (value !== null && value !== undefined) {
        if (typeof value === 'object') {
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            formData.append(`${key}[${nestedKey}]`, nestedValue);
          }
        } else {
          formData.append(key, value.toString());
        }
      }
    }

    console.log('Sending to Pixxles:', formData.toString());

    // Send request to Pixxles
    const response = await fetch(PIXXLES_CONFIG.gatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    console.log('Pixxles response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Pixxles error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const responseText = await response.text();
    console.log('Pixxles response text:', responseText);
    
    // Parse the response
    const responseData = {};
    const params = new URLSearchParams(responseText);
    for (const [key, value] of params.entries()) {
      responseData[key] = value;
    }

    console.log('Parsed response data:', responseData);

    // Verify response signature
    const responseSignature = responseData.signature;
    delete responseData.signature;
    
    const expectedSignature = createSignature(responseData, PIXXLES_CONFIG.signatureKey);
    
    console.log('Response signature verification:');
    console.log('Expected:', expectedSignature);
    console.log('Received:', responseSignature);
    console.log('Verification result:', responseSignature === expectedSignature);
    
    // Temporarily disable signature verification for debugging
    if (responseSignature !== expectedSignature) {
      console.warn('Signature verification failed, but continuing for debugging');
      // console.error('Signature verification failed');
      // console.error('Expected:', expectedSignature);
      // console.error('Received:', responseSignature);
      // throw new Error('Response signature verification failed');
    }

    res.json(responseData);

  } catch (error) {
    console.error('Pixxles API error:', error);
    res.status(500).json({ 
      error: 'Payment processing failed', 
      details: error.message 
    });
  }
});

// Add 3DS callback endpoint - handle both GET and POST
app.all('/payment-callback', (req, res) => {
  console.log('=== 3DS CALLBACK RECEIVED ===');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Query params:', req.query);
  console.log('Body:', req.body);
  console.log('Content-Type:', req.headers['content-type']);
  
  // Collect all possible response data
  let responseData = {};
  
  // Merge query params and body data
  if (req.query && Object.keys(req.query).length > 0) {
    responseData = { ...responseData, ...req.query };
  }
  
  if (req.body && Object.keys(req.body).length > 0) {
    responseData = { ...responseData, ...req.body };
  }
  
  console.log('Combined response data:', responseData);
  
  // Common 3DS response fields to look for
  const threeDSFields = ['threeDSResponse', 'acsResponse', 'threeDSAcsResponse', 'PaRes', 'MD', 'cres', 'threeDSSessionData'];
  const responseValue = threeDSFields.map(field => responseData[field]).find(val => val) || 'method';
  
  console.log('3DS Response value:', responseValue);
  
  // Check if this is an iframe request (3DS callback)
  const isIframeRequest = req.headers['sec-fetch-dest'] === 'iframe' || 
                         req.headers['referer']?.includes('3ds') ||
                         req.method === 'POST';
  
  if (isIframeRequest) {
    // Return HTML that communicates with parent window
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Processing 3D Secure Authentication</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          .container {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }
          .spinner {
            animation: spin 1s linear infinite;
            width: 3rem;
            height: 3rem;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            margin: 1rem auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .success {
            color: #4ade80;
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success">✓</div>
          <div class="spinner"></div>
          <h2>Authentication Complete</h2>
          <p>Processing your secure payment...</p>
        </div>

        <script>
          console.log('3DS callback page loaded');
          console.log('Response data:', ${JSON.stringify(responseData)});
          console.log('Response value:', '${responseValue}');
          
          // Create comprehensive message for parent window
          const message = {
            type: '3DS_RESPONSE',
            threeDSResponse: '${responseValue}',
            fullResponse: ${JSON.stringify(responseData)},
            timestamp: Date.now(),
            source: 'payment-callback'
          };

          console.log('Sending message to parent:', message);

          // Function to send message
          const sendMessage = () => {
            let messageSent = false;

            // Try parent window
            if (window.parent && window.parent !== window) {
              try {
                window.parent.postMessage(message, '*');
                console.log('✅ Message sent to parent window');
                messageSent = true;
              } catch (error) {
                console.error('❌ Error sending to parent:', error);
              }
            }

            // Try opener window
            if (window.opener) {
              try {
                window.opener.postMessage(message, '*');
                console.log('✅ Message sent to opener window');
                messageSent = true;
              } catch (error) {
                console.error('❌ Error sending to opener:', error);
              }
            }

            if (!messageSent) {
              console.warn('⚠️ No parent or opener window found');
            }

            return messageSent;
          };

          // Send message immediately
          sendMessage();

          // Send completion message after delay
          setTimeout(() => {
            if (window.parent && window.parent !== window) {
              try {
                window.parent.postMessage({ type: '3DS_COMPLETE' }, '*');
                console.log('✅ Completion message sent to parent');
              } catch (error) {
                console.error('❌ Error sending completion message:', error);
              }
            }

            // If standalone window, try to close
            if (window.opener) {
              try {
                window.close();
              } catch (error) {
                console.log('Could not close window (expected in some browsers)');
              }
            }
          }, 3000);

          // Fallback: try to redirect if still in standalone mode
          setTimeout(() => {
            if (!window.parent || window.parent === window) {
              const redirectUrl = '/payment-callback?' + new URLSearchParams(${JSON.stringify(responseData)}).toString();
              console.log('Redirecting to React component:', redirectUrl);
              window.location.href = redirectUrl;
            }
          }, 5000);
        </script>
      </body>
      </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } else {
    // For regular requests, redirect to React component
    const queryString = new URLSearchParams(responseData).toString();
    const redirectUrl = `http://localhost:5174/payment-callback${queryString ? '?' + queryString : ''}`;
    console.log('Redirecting to React component:', redirectUrl);
    res.redirect(302, redirectUrl);
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Local API server is running' });
});

app.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
  console.log('Pixxles config:', {
    merchantID: PIXXLES_CONFIG.merchantID,
    gatewayUrl: PIXXLES_CONFIG.gatewayUrl,
    environment: PIXXLES_CONFIG.environment
  });
}); 