// Test Checkout Integration - Customer Creation
// Run this in the browser console at http://localhost:5174

console.log('🧪 TESTING CHECKOUT CUSTOMER CREATION');
console.log('=====================================\n');

// Test 1: Check if checkout page is accessible
console.log('1. Testing Checkout Page Access...');
console.log('Go to: http://localhost:5174/products');
console.log('Add items to cart, then go to checkout');
console.log('Complete checkout with test data');

// Test 2: Simulate checkout customer creation
console.log('\n2. Simulating Checkout Customer Creation...');

// Mock checkout data (similar to what happens in checkout.tsx)
const mockCheckoutData = {
  email: 'checkout-test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+44123456789',
  address: '123 Checkout Street, Apt 2',
  city: 'London',
  postalCode: 'SW1A 1AA',
  country: 'United Kingdom',
  company: 'Checkout Test Ltd',
  orderNumber: 'BDT-CHECKOUT-TEST-123',
  orderTotal: 79.97,
  products: ['Blue Lotus Flower Tea', 'Blue Lotus Extract'],
};

console.log('Mock checkout data:', mockCheckoutData);

// Test 3: Check if brevoApiService is available in checkout context
console.log('\n3. Testing Brevo API Service in Checkout Context...');

// This would normally be imported in checkout.tsx
if (typeof window !== 'undefined' && window.brevoApiService) {
  console.log('✅ brevoApiService is available globally');
  
  // Test customer creation
  window.brevoApiService.createOrUpdateCustomer(mockCheckoutData).then(result => {
    if (result) {
      console.log('✅ Checkout customer creation successful!');
      console.log('Customer ID:', result.id);
      
      // Test event tracking
      window.brevoApiService.trackEvent(mockCheckoutData.email, 'order_completed', {
        orderNumber: mockCheckoutData.orderNumber,
        orderTotal: mockCheckoutData.orderTotal,
        products: mockCheckoutData.products,
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
  console.log('⚠️ brevoApiService not available globally (this is expected)');
  console.log('The service is only available within the checkout component');
}

// Test 4: Instructions for real checkout test
console.log('\n4. Real Checkout Test Instructions:');
console.log('1. Go to http://localhost:5174/products');
console.log('2. Add items to your cart');
console.log('3. Go to checkout page');
console.log('4. Fill in test data:');
console.log('   - Email: checkout-test@example.com');
console.log('   - Name: John Doe');
console.log('   - Address: 123 Test Street, London, SW1A 1AA');
console.log('   - Phone: +44123456789');
console.log('5. Complete the order');
console.log('6. Check browser console for Brevo logs:');
console.log('   - "Creating/updating customer in Brevo"');
console.log('   - "✅ Customer created/updated in Brevo"');
console.log('   - "✅ Event \'order_completed\' tracked"');

// Test 5: Check Brevo dashboard
console.log('\n5. Verify in Brevo Dashboard:');
console.log('1. Go to https://app.brevo.com/');
console.log('2. Navigate to Contacts → All Contacts');
console.log('3. Look for the test customer');
console.log('4. Check their attributes and event history');

console.log('\n📝 Expected Results:');
console.log('- Customer should be created in Brevo');
console.log('- Customer should have complete contact info');
console.log('- Order completion event should be tracked');
console.log('- Customer should appear in your Brevo contacts list');

console.log('\n🎉 Checkout integration test complete!');
console.log('Try the real checkout flow to see it in action.'); 