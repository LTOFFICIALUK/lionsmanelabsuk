// Direct Brevo API Test
// Run this in the browser console at http://localhost:5174

console.log('🧪 DIRECT BREVO API TEST');
console.log('========================\n');

// Test 1: Check API key
console.log('1. Checking API Key...');
const apiKey = import.meta.env.VITE_BREVO_API_KEY;
if (!apiKey || apiKey === 'your-brevo-api-key-here') {
  console.log('❌ API key not configured');
  return;
}
console.log('✅ API key is configured');

// Test 2: Make direct API call to test connectivity
console.log('\n2. Testing API Connectivity...');

const testContact = {
  email: 'api-test@example.com',
  attributes: {
    FIRSTNAME: 'API',
    LASTNAME: 'Test',
    PHONE: '+44123456789',
    ADDRESS: '123 API Test Street',
    CITY: 'London',
    POSTAL_CODE: 'SW1A 1AA',
    COUNTRY: 'United Kingdom',
    COMPANY: 'API Test Company',
    CUSTOMER_SINCE: new Date().toISOString().split('T')[0],
    LAST_ORDER_DATE: new Date().toISOString().split('T')[0],
    LAST_ORDER_TOTAL: 29.99,
    PREFERRED_PRODUCTS: 'Blue Lotus Flower Tea',
  },
  updateEnabled: true
};

console.log('Making API call to create test contact...');
console.log('Contact data:', testContact);

fetch('https://api.brevo.com/v3/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': apiKey,
  },
  body: JSON.stringify(testContact),
})
.then(response => {
  console.log('Response status:', response.status);
  console.log('Response headers:', response.headers);
  
  return response.json();
})
.then(data => {
  if (data.id) {
    console.log('✅ API call successful!');
    console.log('Contact created with ID:', data.id);
    console.log('Contact data:', data);
    
    // Test 3: Get the contact we just created
    console.log('\n3. Testing Contact Retrieval...');
    return fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(testContact.email)}`, {
      method: 'GET',
      headers: {
        'api-key': apiKey,
      },
    });
  } else {
    console.log('❌ API call failed');
    console.log('Error data:', data);
    throw new Error('Failed to create contact');
  }
})
.then(response => {
  console.log('Retrieval response status:', response.status);
  return response.json();
})
.then(data => {
  if (data.id) {
    console.log('✅ Contact retrieval successful!');
    console.log('Retrieved contact:', data);
  } else {
    console.log('❌ Contact retrieval failed');
    console.log('Error data:', data);
  }
})
.catch(error => {
  console.error('❌ API test failed:', error);
  console.log('This might be due to:');
  console.log('- Invalid API key');
  console.log('- Network connectivity issues');
  console.log('- API rate limiting');
  console.log('- CORS restrictions');
});

console.log('\n📝 Test Summary:');
console.log('- API key: ✅ Configured');
console.log('- API connectivity: Testing...');
console.log('- Contact creation: Testing...');
console.log('- Contact retrieval: Testing...');

console.log('\n🎉 Direct API test complete!'); 