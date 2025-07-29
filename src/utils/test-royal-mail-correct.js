import axios from 'axios';

const API_KEY = 'b0229a96-45d8-45f1-938a-4253d08f9e75';
const API_URL = 'https://api.parcel.royalmail.com/api/v1';

async function testRoyalMailAPI() {
  console.log('Testing Royal Mail Parcel API with correct endpoints...\n');
  
  try {
    // Test 1: Get API version
    console.log('1. Testing API version endpoint...');
    const versionResponse = await axios.get(`${API_URL}/version`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log('✅ API Version endpoint successful!');
    console.log('Version info:', versionResponse.data);
    console.log('');

    // Test 2: Get orders list
    console.log('2. Testing orders list endpoint...');
    const ordersResponse = await axios.get(`${API_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      params: {
        pageSize: 5
      }
    });
    console.log('✅ Orders list endpoint successful!');
    console.log('Orders response:', ordersResponse.data);
    console.log('');

    // Test 3: Test order creation with sample data
    console.log('3. Testing order creation endpoint...');
    const sampleOrder = {
      items: [{
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
          code: 'TPL1',
          name: 'Royal Mail Tracked 24'
        }
      }]
    };

    const createOrderResponse = await axios.post(`${API_URL}/orders`, sampleOrder, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log('✅ Order creation endpoint successful!');
    console.log('Create order response:', createOrderResponse.data);
    console.log('');

    console.log('🎉 All Royal Mail API tests passed!');
    return { success: true, data: createOrderResponse.data };

  } catch (error) {
    console.error('❌ Royal Mail API test failed:', error);
    
    if (error.response) {
      console.error('Response details:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
      
      if (error.response.status === 401) {
        console.log('\nAuthentication failed. Please check your API key.');
      } else if (error.response.status === 403) {
        console.log('\nAccess forbidden. Your API key might not have the required permissions.');
      } else if (error.response.status === 404) {
        console.log('\nEndpoint not found. Please check the API documentation.');
      }
    } else {
      console.error('Network Error:', error.message);
    }
    
    return { success: false, error };
  }
}

// Run the test
testRoyalMailAPI()
  .then(result => {
    if (result.success) {
      console.log('\n✅ Royal Mail API integration is working correctly!');
      console.log('You can now use the checkout with Royal Mail integration.');
    } else {
      console.log('\n❌ Royal Mail API integration failed.');
      console.log('Please check your API key and permissions.');
    }
  })
  .catch(error => {
    console.error('Test execution failed:', error);
  }); 