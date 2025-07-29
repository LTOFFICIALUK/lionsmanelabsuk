// Test Customer Creation with API Key
// Run this in the browser console at http://localhost:5174

console.log('🧪 TESTING CUSTOMER CREATION WITH API KEY');
console.log('==========================================\n');

// Test 1: Check API key configuration
console.log('1. Checking API Key Configuration...');
const apiKey = import.meta.env.VITE_BREVO_API_KEY;
if (apiKey && apiKey !== 'your-brevo-api-key-here') {
  console.log('✅ API key is configured');
  console.log('Key (first 10 chars):', apiKey.substring(0, 10) + '...');
} else {
  console.log('❌ API key not configured');
  return;
}

// Test 2: Check if test functions are available
console.log('\n2. Checking Test Functions...');
if (typeof window !== 'undefined' && window.testBrevoApiIntegration) {
  console.log('✅ API test functions are available');
} else {
  console.log('❌ API test functions not found');
  return;
}

// Test 3: Run API integration test
console.log('\n3. Running API Integration Test...');
window.testBrevoApiIntegration().then(result => {
  console.log('API Integration Result:', result);
  
  if (result.success) {
    console.log('✅ API integration is working!');
    
    // Test 4: Run customer creation test
    console.log('\n4. Testing Customer Creation...');
    if (window.testBrevoCustomerCreation) {
      window.testBrevoCustomerCreation().then(customerResult => {
        console.log('Customer Creation Result:', customerResult);
        
        if (customerResult.success) {
          console.log('✅ Customer creation is working!');
          console.log('Customer ID:', customerResult.result?.id);
          
          // Test 5: Simulate checkout customer creation
          console.log('\n5. Simulating Checkout Customer Creation...');
          simulateCheckoutCustomerCreation();
        } else {
          console.log('❌ Customer creation failed:', customerResult.error);
        }
      });
    } else {
      console.log('❌ Customer creation test function not available');
    }
  } else {
    console.log('❌ API integration failed:', result.error);
  }
});

// Simulate the customer creation that happens during checkout
function simulateCheckoutCustomerCreation() {
  console.log('Simulating checkout customer creation...');
  
  // Mock checkout data
  const checkoutData = {
    email: 'checkout-test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+44123456789',
    address: '123 Test Street, Apt 2',
    city: 'London',
    postalCode: 'SW1A 1AA',
    country: 'United Kingdom',
    company: 'Test Company',
    orderNumber: 'BDT-TEST-CHECKOUT-123',
    orderTotal: 79.97,
    products: ['Blue Lotus Flower Tea', 'Blue Lotus Extract'],
  };
  
  // Import the brevoApiService (this would normally be done in the checkout)
  if (typeof window !== 'undefined' && window.brevoApiService) {
    console.log('Using global brevoApiService...');
    window.brevoApiService.createOrUpdateCustomer(checkoutData).then(result => {
      if (result) {
        console.log('✅ Checkout customer creation successful!');
        console.log('Customer ID:', result.id);
        
        // Track order completion event
        window.brevoApiService.trackEvent(checkoutData.email, 'order_completed', {
          orderNumber: checkoutData.orderNumber,
          orderTotal: checkoutData.orderTotal,
          products: checkoutData.products,
          shippingMethod: 'Standard Shipping',
        }).then(eventResult => {
          if (eventResult) {
            console.log('✅ Order completion event tracked!');
          } else {
            console.log('⚠️ Event tracking failed');
          }
        });
      } else {
        console.log('❌ Checkout customer creation failed');
      }
    });
  } else {
    console.log('⚠️ brevoApiService not available globally');
    console.log('This is expected - the service is only available in the checkout flow');
  }
}

console.log('\n📝 Test Summary:');
console.log('- API key configuration: ✅');
console.log('- Test functions available: ✅');
console.log('- API integration: Testing...');
console.log('- Customer creation: Testing...');
console.log('- Checkout simulation: Testing...');

console.log('\n🎉 Test complete! Check the results above.'); 