import React, { useState, useEffect, useRef } from 'react';
import { HiLockClosed, HiCreditCard, HiShieldCheck } from 'react-icons/hi';
import { pixxlesService, PixxlesTransactionResponse } from '../utils/pixxles-api';

interface PaymentFormProps {
  amount: number;
  currency: string;
  orderRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerPostCode: string;
  customerTown: string;
  customerCountryCode: string;
  onPaymentSuccess: (response: PixxlesTransactionResponse) => void;
  onPaymentError: (error: string) => void;
  onPaymentProcessing: (isProcessing: boolean) => void;
  preFilledCardData?: {
    cardNumber: string;
    cardCVV: string;
    cardExpiryMonth: string;
    cardExpiryYear: string;
  };
}

interface CardDetails {
  cardNumber: string;
  cardCVV: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currency,
  orderRef,
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  customerPostCode,
  customerTown,
  customerCountryCode,
  onPaymentSuccess,
  onPaymentError,
  onPaymentProcessing,
  preFilledCardData
}) => {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    cardCVV: '',
    cardExpiryMonth: '',
    cardExpiryYear: ''
  });

  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [show3DSChallenge, setShow3DSChallenge] = useState(false);
  const [threeDSRef, setThreeDSRef] = useState<string>('');
  const [threeDSURL, setThreeDSURL] = useState<string>('');
  const [threeDSTimeout, setThreeDSTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Use a ref to store threeDSRef to avoid stale closure issues
  const threeDSRefRef = useRef<string>('');

  // Populate card details when preFilledCardData is provided
  useEffect(() => {
    if (preFilledCardData) {
      setCardDetails({
        cardNumber: preFilledCardData.cardNumber,
        cardCVV: preFilledCardData.cardCVV,
        cardExpiryMonth: preFilledCardData.cardExpiryMonth,
        cardExpiryYear: preFilledCardData.cardExpiryYear
      });
    }
  }, [preFilledCardData]);

  // Generate current year and next 10 years for expiry
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

  const handleCardNumberChange = (value: string) => {
    // Remove non-digits and format with spaces
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    setCardDetails(prev => ({ ...prev, cardNumber: formatted }));
    
    if (formErrors.cardNumber) {
      setFormErrors(prev => ({ ...prev, cardNumber: '' }));
    }
  };

  const handleCVVChange = (value: string) => {
    // Only allow digits, max 4 characters
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    setCardDetails(prev => ({ ...prev, cardCVV: cleaned }));
    
    if (formErrors.cardCVV) {
      setFormErrors(prev => ({ ...prev, cardCVV: '' }));
    }
  };

  const handleExpiryMonthChange = (value: string) => {
    setCardDetails(prev => ({ ...prev, cardExpiryMonth: value }));
    
    if (formErrors.cardExpiryMonth) {
      setFormErrors(prev => ({ ...prev, cardExpiryMonth: '' }));
    }
  };

  const handleExpiryYearChange = (value: string) => {
    setCardDetails(prev => ({ ...prev, cardExpiryYear: value }));
    
    if (formErrors.cardExpiryYear) {
      setFormErrors(prev => ({ ...prev, cardExpiryYear: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    let hasErrors = false;

    // Card number validation (basic Luhn algorithm check)
    const cardNumber = cardDetails.cardNumber.replace(/\s/g, '');
    if (!cardNumber) {
      errors.cardNumber = 'Card number is required';
      hasErrors = true;
    } else if (cardNumber.length < 13 || cardNumber.length > 19) {
      errors.cardNumber = 'Invalid card number length';
      hasErrors = true;
    } else if (!isValidCardNumber(cardNumber)) {
      errors.cardNumber = 'Invalid card number';
      hasErrors = true;
    }

    // CVV validation
    if (!cardDetails.cardCVV) {
      errors.cardCVV = 'CVV is required';
      hasErrors = true;
    } else if (cardDetails.cardCVV.length < 3 || cardDetails.cardCVV.length > 4) {
      errors.cardCVV = 'CVV must be 3 or 4 digits';
      hasErrors = true;
    }

    // Expiry validation
    if (!cardDetails.cardExpiryMonth) {
      errors.cardExpiryMonth = 'Expiry month is required';
      hasErrors = true;
    }
    if (!cardDetails.cardExpiryYear) {
      errors.cardExpiryYear = 'Expiry year is required';
      hasErrors = true;
    }

    // Check if card is expired
    if (cardDetails.cardExpiryMonth && cardDetails.cardExpiryYear) {
      const expiryDate = new Date(
        parseInt(cardDetails.cardExpiryYear),
        parseInt(cardDetails.cardExpiryMonth) - 1,
        1
      );
      const today = new Date();
      if (expiryDate < today) {
        errors.cardExpiryMonth = 'Card has expired';
        hasErrors = true;
      }
    }

    setFormErrors(errors);
    return !hasErrors;
  };

  // Basic Luhn algorithm for card number validation
  const isValidCardNumber = (cardNumber: string): boolean => {
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

    // Extract 3DS request data from Pixxles response
  const extract3DSRequestData = (response: any) => {
    const threeDSRequest: any = {};
    
    // Debug: Log the original response keys to see what we're working with
    console.log('Original response keys:', Object.keys(response));
    console.log('Keys starting with threeDSRequest:', Object.keys(response).filter(k => k.startsWith('threeDSRequest')));
    console.log('Keys starting with threeDSDetails:', Object.keys(response).filter(k => k.startsWith('threeDSDetails')));
    
    // Look for threeDSRequest fields in the response
    for (const [key, value] of Object.entries(response)) {
      if (key.startsWith('threeDSRequest[') && key.endsWith(']')) {
        // Extract the field name from threeDSRequest[fieldName]
        const fieldName = key.slice(14, -1); // Remove 'threeDSRequest[' and ']'
        threeDSRequest[fieldName] = value;
        console.log(`Extracted from threeDSRequest: ${fieldName} = ${value}`);
      }
    }
    
    // Also include threeDSDetails fields if present
    for (const [key, value] of Object.entries(response)) {
      if (key.startsWith('threeDSDetails[') && key.endsWith(']')) {
        // Extract the field name from threeDSDetails[fieldName]
        const fieldName = key.slice(14, -1); // Remove 'threeDSDetails[' and ']'
        threeDSRequest[fieldName] = value;
        console.log(`Extracted from threeDSDetails: ${fieldName} = ${value}`);
      }
    }
    
    // Also include any other 3DS-related fields that might be directly in the response
    const threeDSFields = [
      'threeDSMethodData',
      'transID',
      'version',
      'versions',
      'fallback',
      'issuerCountryCode',
      'acquirerCountryCode',
      'psd2Region',
      'requestorChallengeIndicator'
    ];
    
    for (const field of threeDSFields) {
      if (response[field] !== undefined) {
        threeDSRequest[field] = response[field];
        console.log(`Found direct field: ${field} = ${response[field]}`);
      }
    }
    
    console.log('Final extracted 3DS request data:', threeDSRequest);
    
    // Clean up any malformed field names (remove leading brackets)
    const cleanedThreeDSRequest: any = {};
    for (const [key, value] of Object.entries(threeDSRequest)) {
      const cleanedKey = key.replace(/^\[+/, ''); // Remove leading brackets
      cleanedThreeDSRequest[cleanedKey] = value;
      if (cleanedKey !== key) {
        console.log(`Cleaned field name: "${key}" -> "${cleanedKey}"`);
      }
    }
    
    console.log('Cleaned 3DS request data:', cleanedThreeDSRequest);
    return cleanedThreeDSRequest;
  };

  // Remove hardcoded ngrok URL and improve validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    onPaymentProcessing(true);

    try {
      // Get customer IP (this would ideally come from your backend)
      const customerIP = '127.0.0.1'; // Placeholder - in production, get from server
      
      // Get the current URL for 3DS redirect
      const currentOrigin = window.location.origin;
      const redirectURL = `${currentOrigin}/payment-callback`;
      
      console.log('Starting payment transaction...');
      console.log('3DS Redirect URL:', redirectURL);

      const response = await pixxlesService.createSaleTransaction({
        amount,
        currency,
        orderRef,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        customerPostCode,
        customerTown,
        customerCountryCode,
        cardNumber: cardDetails.cardNumber,
        cardCVV: cardDetails.cardCVV,
        cardExpiryMonth: cardDetails.cardExpiryMonth,
        cardExpiryYear: cardDetails.cardExpiryYear,
        customerIP,
        redirectURL
      });

      console.log('Pixxles response:', response);

      if (pixxlesService.is3DSRequired(response)) {
        // Handle 3DS authentication
        const refValue = response.threeDSRef || '';
        console.log('📊 DEBUG: Raw response.threeDSRef:', response.threeDSRef);
        console.log('📊 DEBUG: Processed refValue:', refValue);
        console.log('📊 DEBUG: refValue type:', typeof refValue);
        console.log('📊 DEBUG: refValue length:', refValue.length);
        
        setThreeDSRef(refValue);
        threeDSRefRef.current = refValue; // Store in ref to avoid stale closure
        
        // Use configured 3DS URL if available, otherwise use response URL
        const threeDSURL = pixxlesService.getConfig().threeDSURL || response.threeDSURL || '';
        setThreeDSURL(threeDSURL);
        setShow3DSChallenge(true);
        
        console.log('✅ Set threeDSRef:', refValue);
        console.log('✅ Set threeDSRefRef.current:', threeDSRefRef.current);
        console.log('✅ Using 3DS URL:', threeDSURL);
        
        // Additional safety: Store in localStorage as backup
        if (refValue) {
          localStorage.setItem('pixxles_threeDSRef', refValue);
          console.log('💾 Stored threeDSRef in localStorage as backup');
        }
        
        // Create iframe for 3DS challenge
        if (threeDSURL) {
          // Extract 3DS request data from the response
          const threeDSRequest = extract3DSRequestData(response);
          console.log('3DS Request data:', threeDSRequest);
          handle3DSChallenge(threeDSURL, threeDSRequest);
        }
      } else if (pixxlesService.isTransactionSuccessful(response)) {
        // Payment successful
        localStorage.removeItem('pixxles_threeDSRef'); // Clean up backup
        onPaymentSuccess(response);
      } else {
        // Payment failed
        const errorMessage = pixxlesService.getErrorMessage(response);
        onPaymentError(errorMessage);
      }

    } catch (error) {
      console.error('Payment error:', error);
      let errorMessage = 'Payment processing failed';
      
      if (error instanceof Error) {
        // Handle validation errors specifically
        if (error.message.includes('Missing required field') || 
            error.message.includes('Invalid')) {
          errorMessage = error.message;
        } else {
          errorMessage = 'Payment processing failed. Please try again.';
        }
      }
      
      onPaymentError(errorMessage);
    } finally {
      setIsProcessing(false);
      onPaymentProcessing(false);
    }
  };

  const handle3DSChallenge = (acsURL: string, threeDSRequest: any) => {
    console.log('Starting 3DS challenge with:', { acsURL, threeDSRequest });
    
    // Validate ACS URL
    if (!acsURL || !acsURL.startsWith('http')) {
      console.error('Invalid ACS URL:', acsURL);
      onPaymentError('Invalid 3DS authentication URL');
      return;
    }
    
    // Validate 3DS request data
    if (!threeDSRequest || Object.keys(threeDSRequest).length === 0) {
      console.error('Empty or invalid 3DS request data:', threeDSRequest);
      onPaymentError('Invalid 3DS authentication data');
      return;
    }
    
    // Create a visible iframe for 3DS challenge
    const iframe = document.createElement('iframe');
    iframe.style.height = '420px';
    iframe.style.width = '420px';
    iframe.style.border = '1px solid #ccc';
    iframe.style.borderRadius = '8px';
    iframe.style.display = 'block'; // Always show the iframe
    iframe.style.margin = '20px auto';
    iframe.style.backgroundColor = '#f9f9f9';
    iframe.name = 'threeds_acs';
    
    console.log('Creating visible 3DS iframe');
    
    // Insert iframe into the container or create a visible container
    let container = document.getElementById('threeds-container') as HTMLDivElement;
    if (!container) {
      // Create a visible container if it doesn't exist
      container = document.createElement('div');
      container.id = 'threeds-container';
      container.style.position = 'fixed';
      container.style.top = '50%';
      container.style.left = '50%';
      container.style.transform = 'translate(-50%, -50%)';
      container.style.zIndex = '9999';
      container.style.backgroundColor = 'white';
      container.style.padding = '20px';
      container.style.borderRadius = '8px';
      container.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
      container.style.maxWidth = '500px';
      container.style.width = '100%';
      
      // Add close button
      const closeButton = document.createElement('button');
      closeButton.textContent = '×';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '10px';
      closeButton.style.right = '15px';
      closeButton.style.background = 'none';
      closeButton.style.border = 'none';
      closeButton.style.fontSize = '24px';
      closeButton.style.cursor = 'pointer';
      closeButton.style.color = '#666';
      closeButton.onclick = () => {
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }
        onPaymentError('3DS authentication cancelled');
      };
      container.appendChild(closeButton);
      
      // Add title
      const title = document.createElement('h3');
      title.textContent = '3D Secure Authentication';
      title.style.margin = '0 0 15px 0';
      title.style.textAlign = 'center';
      title.style.color = '#333';
      container.appendChild(title);
      
      document.body.appendChild(container);
      console.log('Created visible 3DS container');
    }
    
    container.appendChild(iframe);
    console.log('Iframe added to container:', container);
    console.log('Iframe element:', iframe);
    
    // Add error handling for iframe
    iframe.onerror = (error) => {
      console.error('Iframe error:', error);
      onPaymentError('3DS iframe failed to load');
    };
    
    iframe.onload = () => {
      console.log('Iframe loaded successfully');
      // Show the container when iframe loads
      container.style.display = 'block';
    };

    // Create form to submit to ACS
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = acsURL;
    form.target = 'threeds_acs';
    
    // Add some debugging attributes
    form.setAttribute('data-debug', 'true');
    console.log('Created form with action:', acsURL);
    console.log('Form target:', 'threeds_acs');

    // Add form fields from threeDSRequest
    console.log('Adding form fields:', threeDSRequest);
    for (const [key, value] of Object.entries(threeDSRequest)) {
      // Skip empty or null values
      if (value === null || value === undefined || value === '') {
        console.log(`Skipping empty field: ${key}`);
        continue;
      }
      
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
      console.log(`Added field: ${key} = ${value}`);
    }
    
    // Log the final form structure for debugging
    console.log('Final form structure:');
    const formInputs = form.querySelectorAll('input');
    formInputs.forEach((input, index) => {
      console.log(`Input ${index}: name="${input.name}", value="${input.value}"`);
    });

    // Submit form
    console.log('Submitting 3DS form to:', acsURL);
    console.log('Form data:', threeDSRequest);
    console.log('Form HTML:', form.outerHTML);
    
    document.body.appendChild(form);
    console.log('Form appended to body');
    
    // Add a small delay to ensure form is ready
    setTimeout(() => {
      try {
        console.log('Submitting form...');
        form.submit();
        console.log('Form submitted successfully');
      } catch (error) {
        console.error('Error submitting 3DS form:', error);
        onPaymentError('3DS authentication failed - form submission error');
      } finally {
        // Clean up form
        if (document.body.contains(form)) {
          document.body.removeChild(form);
          console.log('Form removed from body');
        }
      }
    }, 100);

    // Listen for 3DS response
    window.addEventListener('message', handle3DSResponse);
    console.log('3DS challenge initiated');
    
    // Set timeout for 3DS authentication
    const timeout = setTimeout(() => {
      console.error('3DS authentication timeout - no response received');
      
      // Clean up 3DS container
      const container = document.getElementById('threeds-container');
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
      
      onPaymentError('3DS authentication timeout - please try again');
    }, 300000); // 5 minutes timeout
    
    // Store timeout reference for cleanup
    setThreeDSTimeout(timeout);
  };

  const handle3DSResponse = async (event: MessageEvent) => {
    console.log('Received 3DS response event:', event);
    
    // Handle 3DS method notification
    if (event.data.type === '3DS_METHOD_NOTIFICATION') {
      console.log('📋 Received 3DS method notification:', event.data);
      console.log('⏳ Waiting for actual challenge response...');
      // Don't do anything yet - just wait for the actual challenge response
      return;
    }
    
    // Handle 3DS response from iframe
    if (event.data.type === '3DS_RESPONSE') {
      console.log('Processing 3DS response:', event.data);
      
      // Clear timeout since we got a response
      if (threeDSTimeout) {
        clearTimeout(threeDSTimeout);
        setThreeDSTimeout(null);
      }
      
      try {
        // Check if this is just a method notification (not the actual challenge response)
        const responseValue = event.data.threeDSResponse;
        console.log('3DS Response value:', responseValue);
        
        if (responseValue === 'method') {
          console.log('📋 This is a 3DS method notification - waiting for actual challenge response...');
          // Don't send continuation yet - wait for the actual challenge response
          return;
        }
        
        // Step 2: Send continuation request to Pixxles with the 3DS response
        let currentThreeDSRef = threeDSRefRef.current; // Use ref to avoid stale closure
        console.log('🔍 CONTINUATION DEBUG: threeDSRef state:', threeDSRef);
        console.log('🔍 CONTINUATION DEBUG: threeDSRefRef.current:', currentThreeDSRef);
        console.log('🔍 CONTINUATION DEBUG: threeDSURL state:', threeDSURL);
        console.log('🔍 CONTINUATION DEBUG: Received event data:', event.data);
        
        if (!currentThreeDSRef) {
          console.error('threeDSRef is missing! Checking localStorage backup...');
          const backupRef = localStorage.getItem('pixxles_threeDSRef');
          if (backupRef) {
            console.log('🔄 Found threeDSRef in localStorage backup:', backupRef);
            threeDSRefRef.current = backupRef;
            currentThreeDSRef = backupRef; // Update local variable
          } else {
            console.error('No threeDSRef backup found! This will cause the continuation to fail.');
            console.error('Debug: Check if threeDSRef was properly set in the initial response');
            onPaymentError('3DS authentication failed - missing reference');
            return;
          }
        }
        
        console.log('🔍 CONTINUATION DEBUG: Final threeDSRef to use:', currentThreeDSRef);
        console.log('🔍 CONTINUATION DEBUG: Sending request with:', {
          threeDSRef: currentThreeDSRef,
          threeDSResponse: responseValue
        });
        
        console.log('About to call continue3DSTransaction with threeDSRef:', currentThreeDSRef);
        console.log('About to call continue3DSTransaction with threeDSResponse:', responseValue);
        
        const response = await pixxlesService.continue3DSTransaction(
          currentThreeDSRef,
          responseValue
        );

        console.log('3DS continuation response:', response);

        // Check if we need another round of 3DS (challenge)
        if (response.responseCode === '65802' && response.threeDSRequest && response.threeDSRequest.creq) {
          console.log('🚀 Second 3DS challenge required');
          
          // Use configured 3DS URL if available, otherwise use response URL
          const challengeURL = pixxlesService.getConfig().threeDSURL || response.threeDSURL;
          console.log('🚀 Challenge URL:', challengeURL);
          console.log('🚀 Challenge CREQ:', response.threeDSRequest.creq);
          console.log('🚀 threeDSRef for challenge:', response.threeDSRef || currentThreeDSRef);
          
          // Step 3: Handle challenge request (CREQ)
          const challengeData = {
            creq: response.threeDSRequest.creq,
            threeDSRef: response.threeDSRef || currentThreeDSRef
          };
          
          console.log('🚀 About to submit challenge to ACS with data:', challengeData);
          
          // Create or get challenge iframe
          let challengeIframe = document.getElementById('threeds_acs') as HTMLIFrameElement;
          if (!challengeIframe) {
            console.log('🚀 Creating challenge iframe');
            challengeIframe = document.createElement('iframe');
            challengeIframe.id = 'threeds_acs';
            challengeIframe.name = 'threeds_acs';
            challengeIframe.style.width = '100%';
            challengeIframe.style.height = '400px';
            challengeIframe.style.border = '1px solid #ccc';
            document.body.appendChild(challengeIframe);
          }
          
          // Submit CREQ to ACS for challenge
          if (challengeURL) {
            submitChallengeToACS(challengeURL, challengeData);
          } else {
            console.error('❌ No threeDSURL provided for challenge!');
          }
          
        } else if (pixxlesService.isTransactionSuccessful(response)) {
          // Payment successful
          localStorage.removeItem('pixxles_threeDSRef'); // Clean up backup
          
          // Clean up 3DS container
          const container = document.getElementById('threeds-container');
          if (container && container.parentNode) {
            container.parentNode.removeChild(container);
          }
          
          onPaymentSuccess(response);
        } else {
          // Payment failed
          const errorMessage = pixxlesService.getErrorMessage(response);
          
          // Clean up 3DS container
          const container = document.getElementById('threeds-container');
          if (container && container.parentNode) {
            container.parentNode.removeChild(container);
          }
          
          onPaymentError(errorMessage);
        }
      } catch (error) {
        console.error('3DS continuation error:', error);
        
        // Clean up 3DS container
        const container = document.getElementById('threeds-container');
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }
        
        onPaymentError('3DS authentication failed');
      }
    }
  };

  const submitChallengeToACS = (acsURL: string, challengeData: any) => {
    console.log('🎯 Submitting challenge to ACS:', { acsURL, challengeData });
    
    // Create form for challenge submission
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = acsURL;
    form.target = 'threeds_acs';
    
    console.log('🎯 Creating form with target:', form.target);
    console.log('🎯 Form action:', form.action);
    
    // Add challenge data fields
    Object.entries(challengeData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
      console.log(`🎯 Added form field: ${key} = ${value?.toString().substring(0, 50)}...`);
    });
    
    console.log('🎯 Form HTML:', form.outerHTML);
    
    // Submit form
    document.body.appendChild(form);
    console.log('🎯 Form appended to body');
    form.submit();
    console.log('🎯 Form submitted');
    document.body.removeChild(form);
    console.log('🎯 Form removed from body');
  };

  useEffect(() => {
    return () => {
      // Cleanup event listener
      window.removeEventListener('message', handle3DSResponse);
      // Cleanup timeout
      if (threeDSTimeout) {
        clearTimeout(threeDSTimeout);
      }
    };
  }, [threeDSRef, threeDSTimeout]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <HiCreditCard className="h-6 w-6 mr-2" />
        Card Details
      </h2>

      {show3DSChallenge ? (
        <div className="text-center py-8">
          <HiShieldCheck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            3D Secure Authentication
          </h3>
          <p className="text-gray-600 mb-4">
            Please complete the authentication challenge below.
          </p>
          <div id="threeds-container" className="flex justify-center">
            {/* 3DS iframe will be inserted here */}
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mt-4"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Number */}
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number *
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardDetails.cardNumber}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            {formErrors.cardNumber && (
              <p className="text-sm text-red-600 mt-1">{formErrors.cardNumber}</p>
            )}
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700 mb-1">
                Month *
              </label>
              <select
                id="expiryMonth"
                value={cardDetails.cardExpiryMonth}
                onChange={(e) => handleExpiryMonthChange(e.target.value)}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  formErrors.cardExpiryMonth ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">MM</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              {formErrors.cardExpiryMonth && (
                <p className="text-sm text-red-600 mt-1">{formErrors.cardExpiryMonth}</p>
              )}
            </div>

            <div>
              <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700 mb-1">
                Year *
              </label>
              <select
                id="expiryYear"
                value={cardDetails.cardExpiryYear}
                onChange={(e) => handleExpiryYearChange(e.target.value)}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  formErrors.cardExpiryYear ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">YYYY</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {formErrors.cardExpiryYear && (
                <p className="text-sm text-red-600 mt-1">{formErrors.cardExpiryYear}</p>
              )}
            </div>

            <div>
              <label htmlFor="cardCVV" className="block text-sm font-medium text-gray-700 mb-1">
                CVV *
              </label>
              <input
                type="text"
                id="cardCVV"
                value={cardDetails.cardCVV}
                onChange={(e) => handleCVVChange(e.target.value)}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  formErrors.cardCVV ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123"
                maxLength={4}
              />
              {formErrors.cardCVV && (
                <p className="text-sm text-red-600 mt-1">{formErrors.cardCVV}</p>
              )}
            </div>
          </div>

          {/* Payment Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <HiLockClosed className="h-5 w-5" />
            <span>{isProcessing ? 'Processing Payment...' : `Pay £${amount.toFixed(2)}`}</span>
          </button>

          {/* Security Notice */}
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <HiLockClosed className="h-4 w-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Powered by Pixxles Payment Gateway
          </p>
        </form>
      )}
    </div>
  );
};

export default PaymentForm; 