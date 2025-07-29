import axios from 'axios';

const API_KEY = 'b0229a96-45d8-45f1-938a-4253d08f9e75';
const API_URL = 'https://api.parcel.royalmail.com/api/v1';

async function testRoyalMailConnection() {
  try {
    const response = await axios.get(`${API_URL}/shipping-services`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log('Connection successful!');
    console.log('Available shipping services:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });

      // If we get a 401, try the sandbox URL
      if (error.response?.status === 401) {
        console.log('Trying sandbox environment...');
        try {
          const sandboxResponse = await axios.get(`${API_URL}/sandbox/shipping-services`, {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          console.log('Sandbox connection successful!');
          console.log('Available shipping services:', sandboxResponse.data);
          return sandboxResponse.data;
        } catch (sandboxError) {
          console.error('Sandbox API Error:', sandboxError);
        }
      }
    }
    throw error;
  }
}

// Run the test
testRoyalMailConnection()
  .then(() => console.log('Test complete'))
  .catch(error => console.error('Test failed:', error)); 