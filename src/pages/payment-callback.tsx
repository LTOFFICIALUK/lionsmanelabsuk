import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentCallback: React.FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Handle 3DS response from ACS
    const threeDSResponse = searchParams.get('threeDSResponse');
    const acsResponse = searchParams.get('acsResponse');
    const threeDSAcsResponse = searchParams.get('threeDSAcsResponse');

    console.log('Payment callback received params:', {
      threeDSResponse,
      acsResponse,
      threeDSAcsResponse,
      allParams: Object.fromEntries(searchParams.entries())
    });

    if (threeDSResponse || acsResponse || threeDSAcsResponse) {
      // Send message to parent window (the checkout page)
      const message = {
        type: '3DS_RESPONSE',
        threeDSResponse: threeDSResponse || acsResponse || threeDSAcsResponse,
        timestamp: Date.now()
      };

      // Try to send to parent window
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(message, '*');
      }

      // Also try to send to opener window
      if (window.opener) {
        window.opener.postMessage(message, '*');
      }

      // Close the window/iframe after sending the message
      setTimeout(() => {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: '3DS_COMPLETE' }, '*');
        }
        if (window.opener) {
          window.close();
        }
      }, 1000);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Processing Authentication
        </h2>
        <p className="text-gray-600">
          Please wait while we complete your 3D Secure authentication...
        </p>
      </div>
    </div>
  );
};

export default PaymentCallback; 