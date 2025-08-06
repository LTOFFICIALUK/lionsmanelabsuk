// Pixxles Sandbox Test Cards
// Official test information from Pixxles documentation

export const PIXXLES_TEST_CARDS = {
  // Primary test card from Pixxles documentation
  PRIMARY: {
    cardNumber: '4929421234600821',
    expiryMonth: '12',
    expiryYear: '25',
    cvv: '356',
    address: 'Flat 6 Primrose Rise 347 Lavender Road',
    city: 'Northampton',
    countryCode: 'GB',
    postCode: 'NN17 8YG'
  },
  
  // 3DS test cards (for testing 3D Secure authentication)
  THREE_DS: {
    // 3DS Method + Challenge
    METHOD_CHALLENGE: {
      cardNumber: '4000000000000002',
      expiryMonth: '12',
      expiryYear: '25',
      cvv: '123',
      address: 'Flat 6 Primrose Rise 347 Lavender Road',
      city: 'Northampton',
      countryCode: 'GB',
      postCode: 'NN17 8YG'
    },
    // 3DS Method only
    METHOD_ONLY: {
      cardNumber: '4000000000000001',
      expiryMonth: '12',
      expiryYear: '25',
      cvv: '123',
      address: 'Flat 6 Primrose Rise 347 Lavender Road',
      city: 'Northampton',
      countryCode: 'GB',
      postCode: 'NN17 8YG'
    },
    // 3DS Challenge only
    CHALLENGE_ONLY: {
      cardNumber: '4000000000000003',
      expiryMonth: '12',
      expiryYear: '25',
      cvv: '123',
      address: 'Flat 6 Primrose Rise 347 Lavender Road',
      city: 'Northampton',
      countryCode: 'GB',
      postCode: 'NN17 8YG'
    }
  },
  
  // Declined cards for testing error handling
  DECLINED: {
    GENERIC: {
      cardNumber: '4000000000000000',
      expiryMonth: '12',
      expiryYear: '25',
      cvv: '123',
      address: 'Flat 6 Primrose Rise 347 Lavender Road',
      city: 'Northampton',
      countryCode: 'GB',
      postCode: 'NN17 8YG'
    },
    INSUFFICIENT_FUNDS: {
      cardNumber: '4000000000009995',
      expiryMonth: '12',
      expiryYear: '25',
      cvv: '123',
      address: 'Flat 6 Primrose Rise 347 Lavender Road',
      city: 'Northampton',
      countryCode: 'GB',
      postCode: 'NN17 8YG'
    },
    EXPIRED_CARD: {
      cardNumber: '4000000000000069',
      expiryMonth: '12',
      expiryYear: '20', // Past expiry
      cvv: '123',
      address: 'Flat 6 Primrose Rise 347 Lavender Road',
      city: 'Northampton',
      countryCode: 'GB',
      postCode: 'NN17 8YG'
    }
  }
};

// Test customer information
export const TEST_CUSTOMER = {
  name: 'Test Customer',
  email: 'test@example.com',
  phone: '+44123456789',
  address: 'Flat 6 Primrose Rise 347 Lavender Road',
  city: 'Northampton',
  countryCode: 'GB',
  postCode: 'NN17 8YG'
};

// Sandbox configuration
export const SANDBOX_CONFIG = {
  gatewayUrl: 'https://qa-transactions.pixxlesportal.com/direct',
  hostedUrl: 'https://qa-transactions.pixxlesportal.com/hosted',
  environment: 'sandbox'
}; 