import React, { useState } from 'react';
import { PIXXLES_TEST_CARDS, TEST_CUSTOMER } from '../constants/test-cards';

interface PaymentTestPanelProps {
  onTestPayment: (testData: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    customerPostCode: string;
    customerTown: string;
    customerCountryCode: string;
  }) => void;
}

const PaymentTestPanel: React.FC<PaymentTestPanelProps> = ({ onTestPayment }) => {
  const [selectedTest, setSelectedTest] = useState('PRIMARY');
  const [amount, setAmount] = useState('10.00');

  const testScenarios = [
    {
      id: 'PRIMARY',
      name: 'Primary Test Card',
      description: 'Official Pixxles sandbox test card',
      card: PIXXLES_TEST_CARDS.PRIMARY
    },
    {
      id: 'METHOD_CHALLENGE',
      name: '3DS Method + Challenge',
      description: 'Tests full 3D Secure flow',
      card: PIXXLES_TEST_CARDS.THREE_DS.METHOD_CHALLENGE
    },
    {
      id: 'METHOD_ONLY',
      name: '3DS Method Only',
      description: 'Tests 3DS method without challenge',
      card: PIXXLES_TEST_CARDS.THREE_DS.METHOD_ONLY
    },
    {
      id: 'CHALLENGE_ONLY',
      name: '3DS Challenge Only',
      description: 'Tests 3DS challenge directly',
      card: PIXXLES_TEST_CARDS.THREE_DS.CHALLENGE_ONLY
    },
    {
      id: 'DECLINED',
      name: 'Declined Card',
      description: 'Tests error handling',
      card: PIXXLES_TEST_CARDS.DECLINED.GENERIC
    }
  ];

  const handleTestPayment = () => {
    const selectedCard = testScenarios.find(test => test.id === selectedTest)?.card;
    if (!selectedCard) return;

    onTestPayment({
      cardNumber: selectedCard.cardNumber,
      expiryMonth: selectedCard.expiryMonth,
      expiryYear: selectedCard.expiryYear,
      cvv: selectedCard.cvv,
      customerName: TEST_CUSTOMER.name,
      customerEmail: TEST_CUSTOMER.email,
      customerPhone: TEST_CUSTOMER.phone,
      customerAddress: selectedCard.address || TEST_CUSTOMER.address,
      customerPostCode: selectedCard.postCode || TEST_CUSTOMER.postCode,
      customerTown: selectedCard.city || TEST_CUSTOMER.city,
      customerCountryCode: selectedCard.countryCode || TEST_CUSTOMER.countryCode
    });
  };

  const selectedCard = testScenarios.find(test => test.id === selectedTest)?.card;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        🧪 Payment Test Panel
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Scenario
          </label>
          <select
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {testScenarios.map((test) => (
              <option key={test.id} value={test.id}>
                {test.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (£)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {selectedCard && (
        <div className="bg-white border border-gray-200 rounded-md p-4 mb-4">
          <h4 className="font-medium text-gray-900 mb-2">
            {testScenarios.find(test => test.id === selectedTest)?.name}
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            {testScenarios.find(test => test.id === selectedTest)?.description}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Card:</span>
              <div className="font-mono bg-gray-100 px-2 py-1 rounded">
                {selectedCard.cardNumber}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Expiry:</span>
              <div className="font-mono bg-gray-100 px-2 py-1 rounded">
                {selectedCard.expiryMonth}/{selectedCard.expiryYear}
              </div>
            </div>
            <div>
              <span className="text-gray-500">CVV:</span>
              <div className="font-mono bg-gray-100 px-2 py-1 rounded">
                {selectedCard.cvv}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Amount:</span>
              <div className="font-mono bg-gray-100 px-2 py-1 rounded">
                £{amount}
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleTestPayment}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        🚀 Test Payment with Selected Card
      </button>

      <div className="mt-4 text-xs text-gray-500">
        <p>💡 <strong>Tip:</strong> Use the 3DS test cards to verify the complete authentication flow.</p>
        <p>🔒 <strong>Security:</strong> These are sandbox test cards only - never use in production.</p>
      </div>
    </div>
  );
};

export default PaymentTestPanel; 