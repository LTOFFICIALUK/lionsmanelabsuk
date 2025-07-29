import nodemailer, { TransportOptions, SentMessageInfo } from 'nodemailer';

// Types
export interface OrderEmailDetails {
    orderNumber: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    total: number;
    shippingAddress: {
        name: string;
        address: string;
        city: string;
        postcode: string;
        country: string;
    };
}

interface EmailError extends Error {
    response?: {
        body?: any;
    };
}

// Create SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: '93006f001@smtp-brevo.com',
        pass: 'TAg7k2zFOUrntGDW'
    }
} as TransportOptions);

const formatOrderDetailsHtml = (orderDetails: OrderEmailDetails): string => {
    const firstName = orderDetails.shippingAddress.name.split(' ')[0];

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">Thank you for your order, ${firstName}!</h1>
            <p style="color: #666;">Order Number: #${orderDetails.orderNumber}</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background-color: #f5f5f5;">
                    <th style="padding: 10px; text-align: left;">Product</th>
                    <th style="padding: 10px; text-align: left;">Quantity</th>
                    <th style="padding: 10px; text-align: right;">Price</th>
                    <th style="padding: 10px; text-align: right;">Total</th>
                </tr>
                ${orderDetails.items.map(item => `
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">£${item.price.toFixed(2)}</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">£${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                `).join('')}
                <tr>
                    <td colspan="3" style="padding: 10px; text-align: right;"><strong>Total:</strong></td>
                    <td style="padding: 10px; text-align: right;"><strong>£${orderDetails.total.toFixed(2)}</strong></td>
                </tr>
            </table>

            <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0;">
                <h2 style="margin-top: 0;">Shipping Address</h2>
                <p style="margin: 0;">
                    ${orderDetails.shippingAddress.name}<br>
                    ${orderDetails.shippingAddress.address}<br>
                    ${orderDetails.shippingAddress.city}<br>
                    ${orderDetails.shippingAddress.postcode}<br>
                    ${orderDetails.shippingAddress.country}
                </p>
            </div>

            <div style="margin: 30px 0; text-align: center;">
                <h2>Add to Your Order</h2>
                <p>Complete your experience with these popular items:</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px; text-align: center; width: 50%;">
                            <h3>Blue Lotus Tea Cut</h3>
                            <p>Premium loose-cut Blue Lotus flowers</p>
                            <p style="font-size: 20px; color: #4A90E2;">£24.99</p>
                            <a href="https://bluedreamtea.co.uk/add-to-order/${orderDetails.orderNumber}/blue-lotus-tea-cut" 
                               style="display: inline-block; padding: 10px 20px; background-color: #4A90E2; color: white; text-decoration: none; border-radius: 4px;">
                               Add to Order
                            </a>
                        </td>
                        <td style="padding: 10px; text-align: center; width: 50%;">
                            <h3>Blue Lotus Pre-Rolls</h3>
                            <p>Ready-to-enjoy Blue Lotus</p>
                            <p style="font-size: 20px; color: #4A90E2;">£19.99</p>
                            <a href="https://bluedreamtea.co.uk/add-to-order/${orderDetails.orderNumber}/blue-lotus-pre-rolls" 
                               style="display: inline-block; padding: 10px 20px; background-color: #4A90E2; color: white; text-decoration: none; border-radius: 4px;">
                               Add to Order
                            </a>
                        </td>
                    </tr>
                </table>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center;">
                <p><strong>Blue Dream Tea</strong></p>
                <p>
                    Champions Business Park<br>
                    Wirral, Merseyside<br>
                    CH49 0AB<br>
                    United Kingdom
                </p>
                <p style="color: #999; font-size: 11px;">
                    This is an automated message. Please do not reply to this email.<br>
                    For support, please contact us through our website.
                </p>
            </div>
        </div>
    `;
};

export const sendOrderConfirmation = async (to: string, orderDetails: OrderEmailDetails): Promise<SentMessageInfo> => {
    console.log('\n🚀 Preparing to send order confirmation email:');
    console.log('📧 To:', to);
    console.log('📦 Order Number:', orderDetails.orderNumber);

    const mailOptions = {
        from: {
            name: "Blue Dream Tea UK",
            address: "no-reply@bluedreamtea.co.uk"
        },
        to: [{
            name: orderDetails.shippingAddress.name,
            address: to
        }],
        subject: `Order Confirmation #${orderDetails.orderNumber} - Blue Dream Tea UK`,
        html: formatOrderDetailsHtml(orderDetails),
        headers: {
            'X-Mailin-custom': 'custom_header_1:order_confirmation'
        }
    };

    try {
        console.log('\n⏳ Sending via SMTP...');
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info);
        return info;
    } catch (error) {
        const emailError = error as EmailError;
        console.error('\n❌ Error sending email:', emailError.message);
        if (emailError.response?.body) {
            console.error('SMTP Response:', emailError.response.body);
        }
        throw emailError;
    }
};

export const sendShippingConfirmation = async (to: string, orderNumber: string, customerName: string, trackingNumber?: string): Promise<SentMessageInfo> => {
    console.log('\n🚀 Preparing to send shipping confirmation email:');
    console.log('📧 To:', to);
    console.log('📦 Order Number:', orderNumber);

    const mailOptions = {
        from: {
            name: "Blue Dream Tea UK",
            address: "no-reply@bluedreamtea.co.uk"
        },
        to: [{
            name: customerName,  // Use the customer's name here
            address: to
        }],
        subject: `Your Order #${orderNumber} Has Shipped! - Blue Dream Tea UK`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #333;">Your Order Has Shipped!</h1>
                <p style="color: #666;">Great news! Your order #${orderNumber} is on its way.</p>
                
                ${trackingNumber ? `
                    <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0;">
                        <h2 style="margin-top: 0;">Tracking Information</h2>
                        <p style="margin: 0; font-size: 18px;">Tracking Number: <strong>${trackingNumber}</strong></p>
                    </div>
                ` : ''}

                <p>Thank you for choosing Blue Dream Tea UK!</p>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center;">
                    <p><strong>Blue Dream Tea</strong></p>
                    <p>
                        Champions Business Park<br>
                        Wirral, Merseyside<br>
                        CH49 0AB<br>
                        United Kingdom
                    </p>
                    <p style="color: #999; font-size: 11px;">
                        This is an automated message. Please do not reply to this email.<br>
                        For support, please contact us through our website.
                    </p>
                </div>
            </div>
        `,
        headers: {
            'X-Mailin-custom': 'custom_header_1:shipping_confirmation'
        }
    };

    try {
        console.log('\n⏳ Sending via SMTP...');
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info);
        return info;
    } catch (error) {
        const emailError = error as EmailError;
        console.error('\n❌ Error sending email:', emailError.message);
        if (emailError.response?.body) {
            console.error('SMTP Response:', emailError.response.body);
        }
        throw emailError;
    }
}; 