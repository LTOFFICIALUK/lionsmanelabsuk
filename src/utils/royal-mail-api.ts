import axios from 'axios';

const API_KEY = import.meta.env.VITE_ROYAL_MAIL_API_KEY;
const API_URL = 'https://api.parcel.royalmail.com/api/v1';

interface RoyalMailAddress {
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  county?: string;
  postcode: string;
  countryCode: string; // ISO 3166-1 alpha-2 code
}

interface RoyalMailParcel {
  weightInGrams: number;
  lengthInCm?: number;
  widthInCm?: number;
  heightInCm?: number;
}

interface RoyalMailOrderItem {
  orderItemReference: string;
  quantity: number;
  description: string;
  unitValue: number; // in GBP
  unitWeightInGrams: number;
  customsDescription?: string;
  customsCode?: string;
  customsValue?: number;
  countryOfOrigin?: string;
}

interface RoyalMailOrder {
  orderReference: string;
  recipient: {
    name: string;
    companyName?: string;
    email: string;
    phoneNumber?: string;
    address: RoyalMailAddress;
  };
  sender?: {
    name: string;
    companyName?: string;
    email?: string;
    phoneNumber?: string;
    address: RoyalMailAddress;
  };
  items: RoyalMailOrderItem[];
  parcel: RoyalMailParcel;
  shippingService: {
    code: string; // e.g., "CRL1", "CRL2" for Royal Mail 24/48
    name?: string;
    properties?: {
      [key: string]: string;
    };
  };
  label?: {
    includeLabelInResponse?: boolean;
    includeCN?: boolean;
    includeReturnsLabel?: boolean;
  };
  customsInformation?: {
    preRegistrationNumber?: string;
    shippingCharges?: number;
    otherCharges?: number;
    invoiceNumber?: string;
    invoiceDate?: string;
    incoterms?: string;
    reasonForExport?: string;
    shippingChargesCurrency?: string;
    otherChargesCurrency?: string;
    exportLicence?: string;
  };
  references?: {
    [key: string]: string;
  };
  requestedDeliveryDate?: string; // ISO 8601 format
  departmentReference?: string;
  vatPaid?: boolean;
  serviceEnhancements?: string[];
  notificationEmails?: string[];
  safeplace?: string;
}

class RoyalMailService {
  private readonly api;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'BlueDreamTea-Payment-Gateway/1.0',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
  }

  /**
   * Create a new order in Royal Mail Click & Drop
   */
  async createOrder(order: RoyalMailOrder) {
    try {
      console.log('Creating Royal Mail order:', order.orderReference);
      
      // Transform the order to match Royal Mail's expected format
      const royalMailOrder = {
        items: [{
          orderReference: order.orderReference,
          recipient: order.recipient,
          sender: order.sender,
          items: order.items,
          parcel: order.parcel,
          shippingService: order.shippingService,
          label: order.label,
          customsInformation: order.customsInformation,
          references: order.references,
          requestedDeliveryDate: order.requestedDeliveryDate,
          departmentReference: order.departmentReference,
          vatPaid: order.vatPaid,
          serviceEnhancements: order.serviceEnhancements,
          notificationEmails: order.notificationEmails,
          safeplace: order.safeplace
        }]
      };

      const response = await this.api.post('/orders', royalMailOrder);
      console.log('Royal Mail order created successfully:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Royal Mail API Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
          code: error.code
        });
        
        // Handle CORS errors specifically
        if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
          console.error('CORS Error: Royal Mail API does not allow direct browser requests');
          throw new Error('Royal Mail API requires server-side integration due to CORS restrictions');
        }
      }
      throw error;
    }
  }

  /**
   * Get order status from Royal Mail
   */
  async getOrderStatus(orderReference: string) {
    try {
      const response = await this.api.get(`/orders/${orderReference}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Royal Mail API Error:', {
          status: error.response?.status,
          data: error.response?.data
        });
      }
      throw error;
    }
  }

  /**
   * Get available shipping services
   */
  async getShippingServices() {
    try {
      const response = await this.api.get('/shipping-services');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Royal Mail API Error:', {
          status: error.response?.status,
          data: error.response?.data
        });
      }
      throw error;
    }
  }

  /**
   * Create shipping label for an order
   */
  async createShippingLabel(orderReference: string, options?: {
    includeCN?: boolean;
    includeReturnsLabel?: boolean;
  }) {
    try {
      console.log('Creating Royal Mail shipping label for:', orderReference);
      
      const params = new URLSearchParams({
        documentType: 'postageLabel',
        includeReturnsLabel: options?.includeReturnsLabel ? 'true' : 'false',
        ...(options?.includeCN && { includeCN: 'true' })
      });

      const response = await this.api.get(`/orders/${orderReference}/label?${params.toString()}`, {
        responseType: 'arraybuffer'
      });
      
      console.log('Royal Mail shipping label created successfully');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Royal Mail API Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
          code: error.code
        });
        
        // Handle CORS errors specifically
        if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
          console.error('CORS Error: Royal Mail API does not allow direct browser requests');
          throw new Error('Royal Mail API requires server-side integration due to CORS restrictions');
        }
      }
      throw error;
    }
  }

  /**
   * Test API connection
   */
  async testConnection() {
    try {
      console.log('Testing Royal Mail API connection...');
      const response = await this.api.get('/shipping-services');
      console.log('Royal Mail API connection successful:', response.status);
      return true;
    } catch (error) {
      console.error('Royal Mail API connection failed:', error);
      return false;
    }
  }

  /**
   * Get shipping service codes
   */
  getServiceCode(service: string): string {
    const serviceCodes: { [key: string]: string } = {
      'Standard Shipping': 'CRL2', // Royal Mail 2nd Class
      'Express Tracked Shipping': 'TPL1', // Royal Mail Tracked 24
      'Next Day Delivery': 'SD1', // Special Delivery Guaranteed by 1pm
      // Legacy codes for backward compatibility
      'Royal Mail 24': 'CRL1',
      'Royal Mail 48': 'CRL2',
      'Royal Mail Tracked 24': 'TPL1',
      'Royal Mail Tracked 48': 'TPL2',
      'Special Delivery Guaranteed by 1pm': 'SD1',
      'Special Delivery Guaranteed by 9am': 'SD9',
      'International Standard': 'OLA',
      'International Tracked & Signed': 'OTS',
      'International Tracked': 'OTR',
      'International Economy': 'OLE'
    };
    return serviceCodes[service] || service;
  }
}

export const royalMailService = new RoyalMailService();

// Example usage:
/*
const order: RoyalMailOrder = {
  orderReference: "BDT-123456",
  recipient: {
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: "+44123456789",
    address: {
      addressLine1: "123 Main St",
      city: "London",
      postcode: "SW1A 1AA",
      countryCode: "GB"
    }
  },
  items: [
    {
      sku: "BLT-001",
      quantity: 1,
      description: "Blue Lotus Tea",
      value: 29.99
    }
  ],
  parcel: {
    weight: 250, // 250g
    length: 20,
    width: 15,
    height: 10
  },
  shippingService: "Royal Mail 24",
  totalValue: 29.99
};

await royalMailService.createOrder(order);
*/ 