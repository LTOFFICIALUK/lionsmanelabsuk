import { royalMailService } from './royal-mail-api';

// Test Royal Mail integration with sample order data
export const testRoyalMailIntegration = async () => {
  console.log('Testing Royal Mail integration...');
  
  try {
    // Test data that matches the checkout flow
    const testOrderData = {
      orderReference: 'BDT-TEST-123',
      recipient: {
        name: 'John Doe',
        email: 'test@example.com',
        phoneNumber: '+44123456789',
        address: {
          addressLine1: '123 Test Street',
          city: 'London',
          postcode: 'SW1A 1AA',
          countryCode: 'GB'
        }
      },
      items: [
        {
          orderItemReference: 'BLT-001',
          quantity: 2,
          description: 'Blue Lotus Flower Tea',
          unitValue: 29.99,
          unitWeightInGrams: 50
        }
      ],
      parcel: {
        weightInGrams: 100,
        lengthInCm: 20,
        widthInCm: 15,
        heightInCm: 10
      },
      shippingService: {
        code: 'TPL1', // Express Tracked Shipping
        name: 'Express Tracked Shipping'
      },
      label: {
        includeLabelInResponse: true
      }
    };

    console.log('Test order data:', testOrderData);

    // Test creating an order
    const response = await royalMailService.createOrder(testOrderData);
    console.log('✅ Order creation successful:', response);

    // Test creating a shipping label
    const labelResponse = await royalMailService.createShippingLabel(testOrderData.orderReference);
    console.log('✅ Label creation successful:', labelResponse);

    console.log('🎉 All Royal Mail integration tests passed!');
    return { success: true, data: response };

  } catch (error) {
    console.error('❌ Royal Mail integration test failed:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
    
    return { success: false, error };
  }
};

// Run the test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testRoyalMailIntegration()
    .then(result => {
      if (result.success) {
        console.log('Test completed successfully');
        process.exit(0);
      } else {
        console.log('Test failed');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
} 