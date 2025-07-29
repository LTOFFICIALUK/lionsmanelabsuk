import axios from 'axios';

const API_KEY = 'b0229a96-45d8-45f1-938a-4253d08f9e75';
const API_URL = 'https://api.clickanddrop.com/api/v1';

async function testDifferentAuthMethods() {
  console.log('Testing different authentication methods for Royal Mail API...\n');
  
  const authMethods = [
    {
      name: 'Bearer Token',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },
    {
      name: 'API Key Header',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },
    {
      name: 'Authorization Header (no Bearer)',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },
    {
      name: 'Custom Auth Header',
      headers: {
        'X-Royal-Mail-API-Key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  ];

  for (const method of authMethods) {
    console.log(`Testing: ${method.name}`);
    try {
      const response = await axios.get(`${API_URL}/account`, {
        headers: method.headers
      });
      console.log(`✅ ${method.name} - SUCCESS!`);
      console.log('Response:', response.data);
      return { success: true, method: method.name, data: response.data };
    } catch (error) {
      console.log(`❌ ${method.name} - FAILED`);
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        console.log(`Status Text: ${error.response.statusText}`);
      } else {
        console.log(`Error: ${error.message}`);
      }
      console.log('');
    }
  }
  
  console.log('All authentication methods failed. Trying different endpoints...\n');
  
  // Try different endpoints
  const endpoints = [
    '/health',
    '/status',
    '/ping',
    '/test',
    '/api/health',
    '/api/status'
  ];
  
  for (const endpoint of endpoints) {
    console.log(`Testing endpoint: ${endpoint}`);
    try {
      const response = await axios.get(`${API_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log(`✅ Endpoint ${endpoint} - SUCCESS!`);
      console.log('Response:', response.data);
      return { success: true, endpoint, data: response.data };
    } catch (error) {
      console.log(`❌ Endpoint ${endpoint} - FAILED`);
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
      } else {
        console.log(`Error: ${error.message}`);
      }
      console.log('');
    }
  }
  
  console.log('All tests failed. The API key may be invalid or the service may be unavailable.');
  return { success: false };
}

// Run the test
testDifferentAuthMethods()
  .then(result => {
    if (result.success) {
      console.log('\n🎉 Found working authentication method!');
      console.log(`Method: ${result.method || 'Unknown'}`);
      console.log(`Endpoint: ${result.endpoint || 'account'}`);
    } else {
      console.log('\n❌ No working authentication method found.');
      console.log('Please check:');
      console.log('1. Your API key is valid and active');
      console.log('2. You have the correct permissions');
      console.log('3. The API service is available');
    }
  })
  .catch(error => {
    console.error('Test execution failed:', error);
  }); 