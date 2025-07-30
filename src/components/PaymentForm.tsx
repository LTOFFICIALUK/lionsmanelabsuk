import React, { useState, useEffect } from 'react';
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
  onPaymentProcessing
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
      
      // Create redirect URL for 3DS
      const redirectURL = `${window.location.origin}/payment-callback`;

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
        setThreeDSRef(response.threeDSRef || '');
        setThreeDSURL(response.threeDSURL || '');
        setShow3DSChallenge(true);
        
        // Create iframe for 3DS challenge
        if (response.threeDSURL && response.threeDSRequest) {
          handle3DSChallenge(response.threeDSURL, response.threeDSRequest);
        }
      } else if (pixxlesService.isTransactionSuccessful(response)) {
        // Payment successful
        onPaymentSuccess(response);
      } else {
        // Payment failed
        const errorMessage = pixxlesService.getErrorMessage(response);
        onPaymentError(errorMessage);
      }

    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
      onPaymentError(errorMessage);
    } finally {
      setIsProcessing(false);
      onPaymentProcessing(false);
    }
  };

  const handle3DSChallenge = (acsURL: string, threeDSRequest: any) => {
    // Create a hidden iframe for 3DS challenge
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.name = 'threeds_acs';
    document.body.appendChild(iframe);

    // Create form to submit to ACS
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = acsURL;
    form.target = 'threeds_acs';

    // Add form fields from threeDSRequest
    for (const [key, value] of Object.entries(threeDSRequest)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    }

    // Submit form
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Listen for 3DS response
    window.addEventListener('message', handle3DSResponse);
  };

  const handle3DSResponse = async (event: MessageEvent) => {
    // Handle 3DS response from iframe
    if (event.data.type === '3DS_RESPONSE') {
      try {
        const response = await pixxlesService.continue3DSTransaction(
          threeDSRef,
          event.data.threeDSResponse
        );

        if (pixxlesService.isTransactionSuccessful(response)) {
          onPaymentSuccess(response);
        } else {
          const errorMessage = pixxlesService.getErrorMessage(response);
          onPaymentError(errorMessage);
        }
      } catch (error) {
        console.error('3DS continuation error:', error);
        onPaymentError('3DS authentication failed');
      }
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup event listener
      window.removeEventListener('message', handle3DSResponse);
    };
  }, [threeDSRef]);

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
            Please complete the authentication challenge in the popup window.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
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