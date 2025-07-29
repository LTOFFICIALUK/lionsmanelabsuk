// Test script for Brevo API integration
// Run this in the browser console after the dev server is running

console.log('🧪 Testing Brevo Customer Creation Integration...\n');

// Test 1: Check if Brevo API service is available
console.log('1. Testing Brevo API Service Availability...');
if (typeof window !== 'undefined' && window.testBrevoApiIntegration) {
  console.log('✅ Brevo API test functions are available');
} else {
  console.log('❌ Brevo API test functions not found');
}

// Test 2: Check if Brevo tracker is loaded
console.log('\n2. Testing Brevo Tracker...');
if (typeof window !== 'undefined' && window.Brevo) {
  console.log('✅ Brevo tracker is loaded');
} else {
  console.log('❌ Brevo tracker not found');
}

// Test 3: Check environment variables
console.log('\n3. Testing Environment Variables...');
const hasApiKey = import.meta.env.VITE_BREVO_API_KEY;
if (hasApiKey) {
  console.log('✅ Brevo API key is configured');
  console.log('API Key (first 10 chars):', hasApiKey.substring(0, 10) + '...');
} else {
  console.log('⚠️ Brevo API key not configured');
  console.log('Please add VITE_BREVO_API_KEY to your .env file');
}

// Test 4: Run Brevo API integration test
console.log('\n4. Running Brevo API Integration Test...');
if (typeof window !== 'undefined' && window.testBrevoApiIntegration) {
  window.testBrevoApiIntegration().then(result => {
    console.log('API Integration Test Result:', result);
  });
} else {
  console.log('❌ Cannot run API test - function not available');
}

// Test 5: Run customer creation test
console.log('\n5. Running Customer Creation Test...');
if (typeof window !== 'undefined' && window.testBrevoCustomerCreation) {
  window.testBrevoCustomerCreation().then(result => {
    console.log('Customer Creation Test Result:', result);
  });
} else {
  console.log('❌ Cannot run customer creation test - function not available');
}

// Test 6: Check checkout integration
console.log('\n6. Testing Checkout Integration...');
console.log('To test checkout integration:');
console.log('1. Go to http://localhost:5173');
console.log('2. Add items to cart');
console.log('3. Complete checkout with test data');
console.log('4. Check browser console for Brevo logs');

console.log('\n🎉 Brevo Integration Test Complete!');
console.log('Check the console above for results.'); 