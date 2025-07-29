// Quick Brevo Integration Test
// Copy and paste this into the browser console at http://localhost:5173

console.log('🧪 QUICK BREVO INTEGRATION TEST');
console.log('================================\n');

// Test 1: Check if Brevo tracker is loaded
console.log('1. Brevo Tracker Status:');
if (typeof window !== 'undefined' && window.Brevo) {
  console.log('✅ Brevo tracker is loaded');
  
  // Test tracker functionality
  try {
    window.Brevo.push([
      "identify",
      "test@example.com",
      {
        FIRSTNAME: "Test",
        LASTNAME: "User",
        EMAIL: "test@example.com"
      }
    ]);
    console.log('✅ Tracker identification test sent');
  } catch (error) {
    console.log('⚠️ Tracker test failed:', error.message);
  }
} else {
  console.log('❌ Brevo tracker not found');
}

// Test 2: Check if API test functions are available
console.log('\n2. Brevo API Test Functions:');
if (typeof window !== 'undefined' && window.testBrevoApiIntegration) {
  console.log('✅ API test functions are available');
} else {
  console.log('❌ API test functions not found');
}

// Test 3: Check API key configuration
console.log('\n3. API Key Configuration:');
const apiKey = import.meta.env.VITE_BREVO_API_KEY;
if (apiKey && apiKey !== 'your-brevo-api-key-here') {
  console.log('✅ API key is configured');
  console.log('Key (first 10 chars):', apiKey.substring(0, 10) + '...');
} else {
  console.log('⚠️ API key not configured');
  console.log('Add VITE_BREVO_API_KEY to your .env file');
}

// Test 4: Run API integration test if available
console.log('\n4. API Integration Test:');
if (window.testBrevoApiIntegration) {
  console.log('Running API integration test...');
  window.testBrevoApiIntegration().then(result => {
    console.log('Result:', result.success ? '✅ PASS' : '❌ FAIL');
    if (!result.success) {
      console.log('Error:', result.error || result.message);
    }
  });
} else {
  console.log('❌ Cannot run API test - function not available');
}

// Test 5: Check checkout integration
console.log('\n5. Checkout Integration:');
console.log('To test checkout integration:');
console.log('- Go to http://localhost:5173/products');
console.log('- Add items to cart');
console.log('- Complete checkout');
console.log('- Check console for Brevo logs');

// Test 6: Check admin panel integration
console.log('\n6. Admin Panel Integration:');
console.log('To test admin panel:');
console.log('- Go to http://localhost:5173/admin');
console.log('- Enter code: 1901012001');
console.log('- Check Analytics section for Brevo status');

console.log('\n📝 Available test functions:');
console.log('- testBrevoApiIntegration()');
console.log('- testBrevoCustomerCreation()');
console.log('- runBrevoTests() (if available)');

console.log('\n🎉 Quick test complete!'); 