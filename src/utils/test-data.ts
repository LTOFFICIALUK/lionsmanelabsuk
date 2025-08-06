// Test data for admin panel demonstration
export const createTestOrders = () => {
  const testOrders = [
    {
      id: 'order_test_001',
      orderNumber: 'BDT-001TST',
      items: [
        {
          id: 'test-item-1',
          productSlug: 'blue-lotus-flower-tea-bags',
          productTitle: 'Blue Lotus Flower Tea Bags',
          productImage: '/src/assets/images/products/blue-lotus-flower-tea-bags/blue-lotus-flower-tea-bags.jpg',
          price: 12.99,
          originalPrice: 14.99,
          quantity: 2,
          selectedVariants: { size: '20-pack' },
          variantLabel: '20 Tea Bags'
        },
        {
          id: 'test-item-2',
          productSlug: 'blue-lotus-flower',
          productTitle: 'Blue Lotus Flower Pack',
          productImage: '/src/assets/images/products/blue-lotus-flower-packs/blue-lotus-flower-pack.jpg',
          price: 8.99,
          originalPrice: 8.99,
          quantity: 1,
          selectedVariants: { size: '10g' },
          variantLabel: '10g Pack'
        }
      ],
      subtotal: 34.97,
      discountAmount: 3.50,
      discountCode: 'WELCOME10',
      shippingCost: 0,
      total: 31.47,
      status: 'pending',
      shippingAddress: {
        firstName: 'John',
        lastName: 'Doe',
        company: '',
        addressLine1: '123 Tea Street',
        addressLine2: 'Apt 4B',
        city: 'London',
        postalCode: 'SW1A 1AA',
        country: 'United Kingdom',
        phone: '07123 456789'
      },
      billingAddress: {
        firstName: 'John',
        lastName: 'Doe',
        company: '',
        addressLine1: '123 Tea Street',
        addressLine2: 'Apt 4B',
        city: 'London',
        postalCode: 'SW1A 1AA',
        country: 'United Kingdom',
        phone: '07123 456789',
        email: 'john.doe@example.com'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'order_test_002',
      orderNumber: 'BDT-002TST',
      items: [
        {
          id: 'test-item-3',
          productSlug: 'blue-lotus-flower-tea-cut',
          productTitle: 'Blue Lotus Flower Tea Cut',
          productImage: '/src/assets/images/products/blue-lotus-flower-tea-cut/blue-lotus-flower-tea-cut.jpg',
          price: 15.99,
          originalPrice: 15.99,
          quantity: 1,
          selectedVariants: { size: '50g' },
          variantLabel: '50g Loose Leaf'
        }
      ],
      subtotal: 15.99,
      discountAmount: 0,
      discountCode: '',
      shippingCost: 4.99,
      total: 20.98,
      status: 'shipped',
      shippingAddress: {
        firstName: 'Sarah',
        lastName: 'Smith',
        company: 'Tea Lovers Ltd',
        addressLine1: '456 Wellness Avenue',
        addressLine2: '',
        city: 'Manchester',
        postalCode: 'M1 1AB',
        country: 'United Kingdom',
        phone: '07987 654321'
      },
      billingAddress: {
        firstName: 'Sarah',
        lastName: 'Smith',
        company: 'Tea Lovers Ltd',
        addressLine1: '456 Wellness Avenue',
        addressLine2: '',
        city: 'Manchester',
        postalCode: 'M1 1AB',
        country: 'United Kingdom',
        phone: '07987 654321',
        email: 'sarah.smith@tealover.com'
      },
      trackingNumber: 'TRK123456789',
      notes: 'Customer requested express delivery',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      updatedAt: new Date().toISOString(),
    }
  ];

  // Save test orders to localStorage
  localStorage.setItem('blueDreamTea_orders', JSON.stringify(testOrders));
  console.log('Test orders created successfully!');
  return testOrders;
};

// Helper to clear test data
export const clearTestOrders = () => {
  localStorage.removeItem('blueDreamTea_orders');
  console.log('Test orders cleared!');
}; 