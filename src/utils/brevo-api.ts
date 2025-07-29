// Brevo API service for customer management
// Documentation: https://developers.brevo.com/reference/createcontact

interface BrevoContact {
  email: string;
  attributes: {
    FIRSTNAME?: string;
    LASTNAME?: string;
    PHONE?: string;
    ADDRESS?: string;
    CITY?: string;
    POSTAL_CODE?: string;
    COUNTRY?: string;
    COMPANY?: string;
    CUSTOMER_SINCE?: string;
    TOTAL_ORDERS?: number;
    TOTAL_SPENT?: number;
    LAST_ORDER_DATE?: string;
    LAST_ORDER_TOTAL?: number;
    PREFERRED_PRODUCTS?: string;
    [key: string]: any;
  };
  listIds?: number[];
  updateEnabled?: boolean;
}

interface BrevoApiResponse {
  id: number;
  email: string;
  contact: {
    id: number;
    email: string;
    attributes: Record<string, any>;
  };
}

class BrevoApiService {
  private apiKey: string;
  private baseUrl: string = 'https://api.brevo.com/v3';

  constructor() {
    this.apiKey = import.meta.env.VITE_BREVO_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('Brevo API key not found. Customer creation will be skipped.');
    }
  }

  /**
   * Create or update a customer in Brevo
   */
  async createOrUpdateCustomer(customerData: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    company?: string;
    orderNumber?: string;
    orderTotal?: number;
    products?: string[];
  }): Promise<BrevoApiResponse | null> {
    if (!this.apiKey) {
      console.warn('Brevo API key not configured. Skipping customer creation.');
      return null;
    }

    try {
      // Prepare contact data for Brevo
      const contact: BrevoContact = {
        email: customerData.email,
        attributes: {
          FIRSTNAME: customerData.firstName,
          LASTNAME: customerData.lastName,
          PHONE: customerData.phone || '',
          ADDRESS: customerData.address || '',
          CITY: customerData.city || '',
          POSTAL_CODE: customerData.postalCode || '',
          COUNTRY: customerData.country || 'United Kingdom',
          COMPANY: customerData.company || '',
          CUSTOMER_SINCE: new Date().toISOString().split('T')[0],
          LAST_ORDER_DATE: new Date().toISOString().split('T')[0],
          LAST_ORDER_TOTAL: customerData.orderTotal || 0,
          PREFERRED_PRODUCTS: customerData.products?.join(', ') || '',
        },
        updateEnabled: true, // Update existing contacts
      };

      // Add to default list if configured
      const defaultListId = import.meta.env.VITE_BREVO_DEFAULT_LIST_ID;
      if (defaultListId) {
        contact.listIds = [parseInt(defaultListId)];
      }

      console.log('Creating/updating customer in Brevo:', {
        email: contact.email,
        firstName: contact.attributes.FIRSTNAME,
        lastName: contact.attributes.LASTNAME,
      });

      const response = await fetch(`${this.baseUrl}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Brevo API error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        throw new Error(`Brevo API error: ${response.status} ${response.statusText}`);
      }

      const data: BrevoApiResponse = await response.json();
      console.log('✅ Customer created/updated in Brevo:', data.id);
      
      return data;
    } catch (error) {
      console.error('Error creating/updating customer in Brevo:', error);
      // Don't throw error - we don't want to break the checkout flow
      return null;
    }
  }

  /**
   * Update customer attributes (for returning customers)
   */
  async updateCustomerAttributes(email: string, attributes: Record<string, any>): Promise<boolean> {
    if (!this.apiKey) {
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/contacts/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify({
          attributes,
        }),
      });

      if (!response.ok) {
        console.error('Error updating customer attributes in Brevo:', response.statusText);
        return false;
      }

      console.log('✅ Customer attributes updated in Brevo');
      return true;
    } catch (error) {
      console.error('Error updating customer attributes in Brevo:', error);
      return false;
    }
  }

  /**
   * Get customer information from Brevo
   */
  async getCustomer(email: string): Promise<BrevoApiResponse | null> {
    if (!this.apiKey) {
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/contacts/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null; // Customer not found
        }
        throw new Error(`Brevo API error: ${response.status} ${response.statusText}`);
      }

      const data: BrevoApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting customer from Brevo:', error);
      return null;
    }
  }

  /**
   * Track a custom event for a customer
   */
  async trackEvent(email: string, eventName: string, properties?: Record<string, any>): Promise<boolean> {
    if (!this.apiKey) {
      return false;
    }

    try {
      const eventData = {
        email,
        eventName,
        properties: properties || {},
      };

      const response = await fetch(`${this.baseUrl}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error tracking event in Brevo:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        return false;
      }

      console.log(`✅ Event '${eventName}' tracked in Brevo for ${email}`);
      return true;
    } catch (error) {
      console.error('Error tracking event in Brevo:', error);
      return false;
    }
  }

  /**
   * Check if Brevo API is properly configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

// Export singleton instance
export const brevoApiService = new BrevoApiService();

// Export types for use in other files
export type { BrevoContact, BrevoApiResponse }; 