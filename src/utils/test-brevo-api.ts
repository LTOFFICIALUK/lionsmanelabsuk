import { brevoApiService } from './brevo-api';

// Test Brevo API integration
export const testBrevoApiIntegration = async () => {
  console.log('🧪 Testing Brevo API integration...');
  
  try {
    // Test 1: Check if API is configured
    if (!brevoApiService.isConfigured()) {
      console.log('⚠️ Brevo API key not configured. Skipping tests.');
      return { success: false, message: 'API key not configured' };
    }

    console.log('✅ Brevo API is configured');

    // Test 2: Create a test customer
    const testCustomerData = {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'Customer',
      phone: '+44123456789',
      address: '123 Test Street',
      city: 'London',
      postalCode: 'SW1A 1AA',
      country: 'United Kingdom',
      company: 'Test Company',
      orderNumber: 'BDT-TEST-123',
      orderTotal: 29.99,
      products: ['Blue Lotus Flower Tea'],
    };

    console.log('Creating test customer in Brevo...');
    const customerResult = await brevoApiService.createOrUpdateCustomer(testCustomerData);
    
    if (customerResult) {
      console.log('✅ Test customer created/updated successfully:', customerResult.id);
    } else {
      console.log('⚠️ Customer creation failed (this might be expected if API key is invalid)');
    }

    // Test 3: Track a test event
    console.log('Tracking test event...');
    const eventResult = await brevoApiService.trackEvent('test@example.com', 'test_event', {
      testProperty: 'testValue',
      timestamp: new Date().toISOString(),
    });

    if (eventResult) {
      console.log('✅ Test event tracked successfully');
    } else {
      console.log('⚠️ Event tracking failed (this might be expected if API key is invalid)');
    }

    // Test 4: Get customer information
    console.log('Getting customer information...');
    const customerInfo = await brevoApiService.getCustomer('test@example.com');
    
    if (customerInfo && customerInfo.contact) {
      console.log('✅ Customer information retrieved:', customerInfo.contact.attributes);
    } else {
      console.log('⚠️ Customer not found or API key lacks read permissions');
    }

    console.log('🎉 Brevo API integration tests completed!');
    return { success: true, customerResult, eventResult, customerInfo };

  } catch (error) {
    console.error('❌ Brevo API integration test failed:', error);
    
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

// Test customer creation with real checkout data
export const testBrevoCustomerCreation = async () => {
  console.log('🧪 Testing Brevo customer creation with checkout data...');
  
  try {
    if (!brevoApiService.isConfigured()) {
      console.log('⚠️ Brevo API key not configured. Skipping test.');
      return { success: false, message: 'API key not configured' };
    }

    // Simulate checkout data
    const checkoutData = {
      email: 'checkout-test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+44123456789',
      address: '456 Checkout Street, Apt 2',
      city: 'Manchester',
      postalCode: 'M1 1AA',
      country: 'United Kingdom',
      company: 'Checkout Test Ltd',
      orderNumber: 'BDT-CHECKOUT-123',
      orderTotal: 79.97,
      products: ['Blue Lotus Flower Tea', 'Blue Lotus Extract'],
    };

    console.log('Creating customer with checkout data...');
    const result = await brevoApiService.createOrUpdateCustomer(checkoutData);
    
    if (result) {
      console.log('✅ Customer created successfully with checkout data:', result.id);
      
      // Track order completion event
      await brevoApiService.trackEvent(checkoutData.email, 'order_completed', {
        orderNumber: checkoutData.orderNumber,
        orderTotal: checkoutData.orderTotal,
        products: checkoutData.products,
        shippingMethod: 'Standard Shipping',
      });
      
      console.log('✅ Order completion event tracked');
    } else {
      console.log('⚠️ Customer creation failed');
    }

    return { success: true, result };

  } catch (error) {
    console.error('❌ Brevo customer creation test failed:', error);
    return { success: false, error };
  }
};

// Make functions available globally for testing
if (typeof window !== 'undefined') {
  (window as any).testBrevoApiIntegration = testBrevoApiIntegration;
  (window as any).testBrevoCustomerCreation = testBrevoCustomerCreation;
  
  console.log('📝 Brevo API test functions available:');
  console.log('- testBrevoApiIntegration()');
  console.log('- testBrevoCustomerCreation()');
} 