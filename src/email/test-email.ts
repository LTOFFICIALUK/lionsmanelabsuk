require('dotenv').config();
const { sendOrderConfirmation } = require('./emailService');

const testOrderDetails = {
    orderNumber: "TEST-123",
    items: [
        {
            name: "Blue Lotus Flower Tea",
            quantity: 2,
            price: 19.99
        },
        {
            name: "Blue Lotus Pre-Rolls",
            quantity: 1,
            price: 24.99
        }
    ],
    total: 64.97,
    shippingAddress: {
        name: "Test Customer",
        address: "123 Test Street",
        city: "London",
        postcode: "SW1A 1AA",
        country: "United Kingdom"
    }
};

// Send test email
const sendTestEmail = async () => {
    try {
        await sendOrderConfirmation(
            "everythingsimpleinc1@gmail.com",
            testOrderDetails
        );
        console.log("Test email sent successfully!");
    } catch (error) {
        console.error("Error sending test email:", error);
    }
};

sendTestEmail(); 