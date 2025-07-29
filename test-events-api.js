// Test Brevo Events API format
// Run this in the browser console at http://localhost:5174

console.log('🧪 TESTING BREVO EVENTS API FORMAT');
console.log('==================================\n');

const apiKey = import.meta.env.VITE_BREVO_API_KEY;

// Test 1: Try the current format
console.log('1. Testing current event format...');
const currentFormat = {
  email: 'test@example.com',
  eventName: 'test_event',
  properties: {
    testProperty: 'testValue',
    timestamp: new Date().toISOString(),
  },
};

console.log('Current format:', currentFormat);

fetch('https://api.brevo.com/v3/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': apiKey,
  },
  body: JSON.stringify(currentFormat),
})
.then(response => {
  console.log('Response status:', response.status);
  return response.json();
})
.then(data => {
  console.log('Response data:', data);
})
.catch(error => {
  console.error('Error:', error);
});

// Test 2: Try alternative format (single event)
console.log('\n2. Testing alternative event format...');
const alternativeFormat = {
  eventName: 'test_event',
  email: 'test@example.com',
  properties: {
    testProperty: 'testValue',
    timestamp: new Date().toISOString(),
  },
};

console.log('Alternative format:', alternativeFormat);

fetch('https://api.brevo.com/v3/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': apiKey,
  },
  body: JSON.stringify(alternativeFormat),
})
.then(response => {
  console.log('Response status:', response.status);
  return response.json();
})
.then(data => {
  console.log('Response data:', data);
})
.catch(error => {
  console.error('Error:', error);
});

// Test 3: Try array format
console.log('\n3. Testing array event format...');
const arrayFormat = [{
  eventName: 'test_event',
  email: 'test@example.com',
  properties: {
    testProperty: 'testValue',
    timestamp: new Date().toISOString(),
  },
}];

console.log('Array format:', arrayFormat);

fetch('https://api.brevo.com/v3/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': apiKey,
  },
  body: JSON.stringify(arrayFormat),
})
.then(response => {
  console.log('Response status:', response.status);
  return response.json();
})
.then(data => {
  console.log('Response data:', data);
})
.catch(error => {
  console.error('Error:', error);
});

console.log('\n📝 Testing different event formats...');
console.log('Check the console above for results.'); 