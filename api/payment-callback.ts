import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Payment callback received:', {
      method: req.method,
      query: req.query,
      body: req.body,
      headers: {
        'content-type': req.headers['content-type'],
        'user-agent': req.headers['user-agent'],
        'referer': req.headers['referer']
      }
    });

    // Handle both GET and POST requests
    let responseData: Record<string, string> = {};

    if (req.method === 'POST') {
      // Handle POST data from 3DS provider
      if (req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        // Parse form data
        responseData = req.body || {};
      } else if (req.headers['content-type']?.includes('application/json')) {
        // Handle JSON data
        responseData = req.body || {};
      }
    } else if (req.method === 'GET') {
      // Handle GET query parameters
      responseData = req.query as Record<string, string>;
    }

    console.log('Parsed 3DS response data:', responseData);

    // Extract common 3DS response fields
    const threeDSFields = [
      'threeDSResponse',
      'acsResponse', 
      'threeDSAcsResponse',
      'PaRes',
      'MD',
      'cres',
      'threeDSSessionData'
    ];

    // Build query string from response data
    const queryParams = new URLSearchParams();
    
    for (const [key, value] of Object.entries(responseData)) {
      if (value && typeof value === 'string') {
        queryParams.append(key, value);
      }
    }

    // If this is an iframe request (3DS callback), return HTML that communicates with parent
    const userAgent = req.headers['user-agent'] || '';
    const isIframeRequest = req.headers['sec-fetch-dest'] === 'iframe' || 
                           req.headers['referer']?.includes('3ds') ||
                           Object.keys(responseData).some(key => threeDSFields.includes(key));

    if (isIframeRequest || req.method === 'POST') {
      // Return HTML that posts message to parent window and redirects
      const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Processing Payment...</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
        }
        .container {
            text-align: center;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .spinner {
            animation: spin 1s linear infinite;
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <h2>Processing Authentication...</h2>
        <p>Please wait while we complete your payment authentication.</p>
    </div>

    <script>
        console.log('3DS callback received data:', ${JSON.stringify(responseData)});
        
        // Extract the main response value
        const responseValue = ${JSON.stringify(responseData.threeDSAcsResponse || responseData.acsResponse || responseData.threeDSResponse || responseData.PaRes || responseData.cres || 'method')};
        
        console.log('3DS Response value:', responseValue);
        
        // Check if this is just a method notification
        if (responseValue === 'method') {
            console.log('📋 This is a 3DS method notification - waiting for actual challenge response...');
            
            // Send method notification to parent
            const methodMessage = {
                type: '3DS_METHOD_NOTIFICATION',
                threeDSResponse: responseValue,
                fullResponse: ${JSON.stringify(responseData)},
                timestamp: Date.now()
            };
            
            console.log('Sending method notification to parent:', methodMessage);
            
            if (window.parent && window.parent !== window) {
                try {
                    window.parent.postMessage(methodMessage, '*');
                    console.log('Method notification sent to parent window');
                } catch (error) {
                    console.error('Error sending method notification to parent:', error);
                }
            }
            
            // Don't redirect yet - wait for the actual challenge response
            return;
        }
        
        // This is the actual challenge response
        console.log('🎯 This is the actual 3DS challenge response');
        
        // Create message for parent window
        const message = {
            type: '3DS_RESPONSE',
            threeDSResponse: responseValue,
            fullResponse: ${JSON.stringify(responseData)},
            timestamp: Date.now()
        };

        console.log('Sending challenge response to parent:', message);

        // Send message to parent window (main checkout page)
        if (window.parent && window.parent !== window) {
            try {
                window.parent.postMessage(message, '*');
                console.log('Challenge response sent to parent window');
            } catch (error) {
                console.error('Error sending challenge response to parent:', error);
            }
        }

        // Also try opener window
        if (window.opener) {
            try {
                window.opener.postMessage(message, '*');
                console.log('Challenge response sent to opener window');
            } catch (error) {
                console.error('Error sending challenge response to opener:', error);
            }
        }

        // Redirect after a short delay
        setTimeout(() => {
            const redirectUrl = '/payment-callback?' + new URLSearchParams(${JSON.stringify(responseData)}).toString();
            console.log('Redirecting to:', redirectUrl);
            
            if (window.parent && window.parent !== window) {
                // If in iframe, send completion message
                window.parent.postMessage({ type: '3DS_COMPLETE' }, '*');
            } else {
                // If standalone, redirect
                window.location.href = redirectUrl;
            }
        }, 2000);
    </script>
</body>
</html>`;

      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(html);
    }

    // For regular requests, redirect to React component
    const redirectUrl = `/payment-callback?${queryParams.toString()}`;
    console.log('Redirecting to React component:', redirectUrl);
    
    res.redirect(302, redirectUrl);

  } catch (error) {
    console.error('Payment callback error:', error);
    
    // Return error page
    const errorHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Payment Error</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            padding: 50px;
            background-color: #f5f5f5;
        }
        .error-container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 500px;
            margin: 0 auto;
        }
        .error-title {
            color: #e74c3c;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1 class="error-title">Payment Processing Error</h1>
        <p>There was an error processing your payment authentication.</p>
        <p>Please return to the checkout page and try again.</p>
        <button onclick="window.close()">Close</button>
    </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(500).send(errorHtml);
  }
} 