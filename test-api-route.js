// Test script for the Pixxles API route
// Run this to test if the API route is working

const testTransaction = {
  merchantID: '132779',
  action: 'SALE',
  type: '1',
  amount: '1000', // £10.00 in pence
  currencyCode: '826', // GBP
  countryCode: '826', // UK
  transactionUnique: `test_${Date.now()}`,
  orderRef: 'TEST_ORDER_001',
  cardNumber: '4929421234600821', // Test card
  cardCVV: '356',
  cardExpiryMonth: '12',
  cardExpiryYear: '25',
  customerName: 'Test Customer',
  customerEmail: 'test@example.com',
  customerPhone: '1234567890',
  customerAddress: '123 Test Street, Test City',
  customerPostCode: 'TE1 1ST',
  customerTown: 'Test City',
  customerCountryCode: 'GB',
  remoteAddress: '127.0.0.1',
  threeDSRedirectURL: 'https://example.com/callback',
  threeDSRequired: 'Y',
  avscv2CheckRequired: 'Y',
  duplicateDelay: '0',
  deviceChannel: 'browser',
  deviceIdentity: 'Test Browser',
  deviceTimeZone: '0',
  deviceCapabilities: 'javascript',
  deviceScreenResolution: '1920x1080x24',
  deviceAcceptContent: '*/*',
  deviceAcceptEncoding: 'gzip, deflate, br',
  deviceAcceptLanguage: 'en-US',
  deviceAcceptCharset: ''
};

async function testApiRoute() {
  try {
    console.log('Testing API route...');
    console.log('Transaction data:', JSON.stringify(testTransaction, null, 2));

    const response = await fetch('/api/payment/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testTransaction)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return;
    }

    const result = await response.json();
    console.log('Success response:', result);

  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testApiRoute(); 