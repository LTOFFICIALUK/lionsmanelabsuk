import axios from 'axios';

const API_KEY = 'b0229a96-45d8-45f1-938a-4253d08f9e75';
const API_URL = 'https://api.clickanddrop.com/api/v1';

async function testRoyalMailConnection() {
  try {
    console.log('Testing Click & Drop API connection...');
    
    // Try to get account details first
    console.log('\nGetting account details...');
    const accountResponse = await axios.get(`${API_URL}/account`, {
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log('Account:', accountResponse.data);

    // Then try to get recent orders
    console.log('\nGetting recent orders...');
    const ordersResponse = await axios.get(`${API_URL}/orders`, {
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      params: {
        limit: 5 // Just get the 5 most recent orders
      }
    });
    
    console.log('Orders:', ordersResponse.data);
    
    console.log('\nConnection successful!');
    return { account: accountResponse.data, orders: ordersResponse.data };
  } catch (error) {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });

      // Log additional details that might help
      console.log('\nRequest details:');
      console.log('URL:', error.config?.url);
      console.log('Headers:', {
        ...error.config?.headers,
        'Authorization': '[HIDDEN]' // Hide the actual token
      });
      
      if (error.response.status === 401) {
        console.log('\nAuthentication failed. Please check your API key.');
        console.log('Note: This API key should be from Click & Drop, not the Shipping API.');
      } else if (error.response.status === 403) {
        console.log('\nAccess forbidden. Your API key might not have the required permissions.');
      }
    } else {
      console.error('Network Error:', error.message);
      console.log('\nPlease check:');
      console.log('1. Your internet connection');
      console.log('2. You can access api.clickanddrop.com');
      console.log('3. The Click & Drop service is available');
      console.log('4. You are using a valid Click & Drop API key');
    }
    throw error;
  }
}

// Run the test
console.log('Testing Royal Mail Click & Drop API connection...\n');
testRoyalMailConnection()
  .then(() => console.log('\nTest complete'))
  .catch(() => console.log('\nTest failed')); 