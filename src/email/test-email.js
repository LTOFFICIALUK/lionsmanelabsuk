// src/email/test-email.js
import { sendOrderConfirmation } from './emailService.js';
import nodemailer from 'nodemailer';

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
    console.log('\n📧 Starting test email send...');
    
    try {
        const info = await sendOrderConfirmation(
            "everythingsimpleinc1@gmail.com",
            testOrderDetails
        );
        console.log('\n✅ Test completed successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('\n❌ Test failed:');
        console.error('Error type:', error.constructor.name);
        console.error('Error message:', error.message);
        if (error.response) {
            console.error('SMTP Response:', error.response);
        }
        process.exit(1);
    }
};

console.log('\n🚀 Running email test...');
sendTestEmail(); 