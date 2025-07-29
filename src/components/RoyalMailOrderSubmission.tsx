import React, { useState } from 'react';
import { royalMailService } from '../utils/royal-mail-api';

interface RoyalMailOrderSubmissionProps {
  order: {
    id: string;
    customer: {
      name: string;
      email: string;
      phone?: string;
      company?: string;
      address: {
        line1: string;
        line2?: string;
        city: string;
        county?: string;
        postcode: string;
      };
    };
    items: Array<{
      sku: string;
      name: string;
      quantity: number;
      price: number;
      weightInGrams: number;
      customsDescription?: string;
      customsCode?: string;
      countryOfOrigin?: string;
    }>;
    shipping: {
      service: string;
      weightInGrams: number;
      dimensions?: {
        lengthInCm: number;
        widthInCm: number;
        heightInCm: number;
      };
    };
  };
  onSuccess: (trackingNumber: string) => void;
  onError: (error: Error) => void;
}

const RoyalMailOrderSubmission: React.FC<RoyalMailOrderSubmissionProps> = ({
  order,
  onSuccess,
  onError
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitToRoyalMail = async () => {
    try {
      setIsSubmitting(true);

      // Transform the order data into Royal Mail's expected format
      const royalMailOrder = {
        orderReference: order.id,
        recipient: {
          name: order.customer.name,
          companyName: order.customer.company,
          email: order.customer.email,
          phoneNumber: order.customer.phone,
          address: {
            addressLine1: order.customer.address.line1,
            addressLine2: order.customer.address.line2,
            city: order.customer.address.city,
            county: order.customer.address.county,
            postcode: order.customer.address.postcode,
            countryCode: 'GB' // Assuming UK orders for now
          }
        },
        // Add sender details from environment variables if available
        sender: import.meta.env.VITE_ROYAL_MAIL_SENDER_NAME ? {
          name: import.meta.env.VITE_ROYAL_MAIL_SENDER_NAME,
          companyName: import.meta.env.VITE_ROYAL_MAIL_SENDER_COMPANY,
          email: import.meta.env.VITE_ROYAL_MAIL_SENDER_EMAIL,
          phoneNumber: import.meta.env.VITE_ROYAL_MAIL_SENDER_PHONE,
          address: {
            addressLine1: import.meta.env.VITE_ROYAL_MAIL_SENDER_ADDRESS_LINE1,
            addressLine2: import.meta.env.VITE_ROYAL_MAIL_SENDER_ADDRESS_LINE2,
            city: import.meta.env.VITE_ROYAL_MAIL_SENDER_CITY,
            county: import.meta.env.VITE_ROYAL_MAIL_SENDER_COUNTY,
            postcode: import.meta.env.VITE_ROYAL_MAIL_SENDER_POSTCODE,
            countryCode: 'GB'
          }
        } : undefined,
        items: order.items.map(item => ({
          orderItemReference: item.sku,
          quantity: item.quantity,
          description: item.name,
          unitValue: item.price,
          unitWeightInGrams: item.weightInGrams,
          customsDescription: item.customsDescription,
          customsCode: item.customsCode,
          countryOfOrigin: item.countryOfOrigin
        })),
        parcel: {
          weightInGrams: order.shipping.weightInGrams,
          ...(order.shipping.dimensions && {
            lengthInCm: order.shipping.dimensions.lengthInCm,
            widthInCm: order.shipping.dimensions.widthInCm,
            heightInCm: order.shipping.dimensions.heightInCm
          })
        },
        shippingService: {
          code: royalMailService.getServiceCode(order.shipping.service),
          name: order.shipping.service
        },
        label: {
          includeLabelInResponse: true
        },
        // Optional customs information for international orders
        customsInformation: order.customer.address.postcode.startsWith('BT') ? {
          reasonForExport: 'Sale of Goods',
          shippingCharges: 0,
          otherCharges: 0,
          currency: 'GBP',
          incoterms: 'DDU'
        } : undefined,
        // Add notification emails if configured
        notificationEmails: import.meta.env.VITE_ROYAL_MAIL_NOTIFICATION_EMAILS?.split(','),
        // Request next day delivery for express services
        requestedDeliveryDate: order.shipping.service.includes('24') || 
                             order.shipping.service.includes('Special Delivery') ? 
                             new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
                             undefined
      };

      // Submit the order to Royal Mail
      const response = await royalMailService.createOrder(royalMailOrder);

      // Create shipping label
      const labelResponse = await royalMailService.createShippingLabel(order.id, {
        includeCN: !!royalMailOrder.customsInformation // Include customs documentation for international orders
      });

      // Call onSuccess with the tracking number
      onSuccess(response.trackingNumber);

    } catch (error) {
      console.error('Failed to submit order to Royal Mail:', error);
      onError(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Submit to Royal Mail</h2>
      <button
        onClick={handleSubmitToRoyalMail}
        disabled={isSubmitting}
        className={`
          px-4 py-2 rounded
          ${isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'}
          text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        `}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Order to Royal Mail'}
      </button>
    </div>
  );
};

export default RoyalMailOrderSubmission; 