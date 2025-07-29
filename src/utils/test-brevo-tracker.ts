// Test Brevo tracker functionality
export const testBrevoTracker = () => {
  console.log('🧪 Testing Brevo tracker...');
  
  // Check if Brevo is loaded
  if (typeof window !== 'undefined' && (window as any).Brevo) {
    console.log('✅ Brevo tracker is loaded');
    
    // Test user identification
    (window as any).Brevo.push([
      "identify",
      "test@example.com",
      {
        FIRSTNAME: "Test",
        LASTNAME: "User",
        EMAIL: "test@example.com"
      }
    ]);
    console.log('✅ User identification test sent');
    
    // Test custom event
    (window as any).Brevo.push([
      "track",
      "test_event",
      {
        email: "test@example.com",
        FIRSTNAME: "Test",
        LASTNAME: "User"
      },
      {
        id: "test:123",
        data: {
          testProperty: "testValue",
          timestamp: new Date().toISOString()
        }
      }
    ]);
    console.log('✅ Custom event test sent');
    
    return true;
  } else {
    console.error('❌ Brevo tracker not found');
    return false;
  }
};

// Test the order_shipped event specifically
export const testOrderShippedEvent = () => {
  console.log('🧪 Testing order_shipped event...');
  
  if (typeof window !== 'undefined' && (window as any).Brevo) {
    (window as any).Brevo.push([
      "track",
      "order_shipped",
      {
        email: "test@example.com",
        FIRSTNAME: "Test",
        LASTNAME: "User"
      },
      {
        id: "order:BDT-TEST123",
        data: {
          orderNumber: "BDT-TEST123",
          customerName: "Test User",
          topProduct: "Blue Lotus Flower Tea",
          orderTotal: 29.99,
          currency: "GBP",
          action: "post_purchase_upsell_triggered"
        }
      }
    ]);
    console.log('✅ order_shipped event test sent');
    return true;
  } else {
    console.error('❌ Brevo tracker not found');
    return false;
  }
};

// Run tests in browser console
export const runBrevoTests = () => {
  console.log('🚀 Running Brevo tracker tests...\n');
  
  const trackerLoaded = testBrevoTracker();
  
  if (trackerLoaded) {
    console.log('\n' + '='.repeat(50));
    testOrderShippedEvent();
    console.log('\n' + '='.repeat(50));
    console.log('✅ All Brevo tests completed!');
    console.log('📝 Check your Brevo dashboard for the test events.');
  } else {
    console.log('❌ Brevo tracker tests failed - tracker not loaded');
  }
};

// Auto-run tests if this file is imported
if (typeof window !== 'undefined') {
  // Add to window for easy testing
  (window as any).testBrevoTracker = testBrevoTracker;
  (window as any).testOrderShippedEvent = testOrderShippedEvent;
  (window as any).runBrevoTests = runBrevoTests;
  
  console.log('📝 Brevo tracker test functions available:');
  console.log('- testBrevoTracker()');
  console.log('- testOrderShippedEvent()');
  console.log('- runBrevoTests()');
} 