// Pixxles Payment Gateway Integration
// Sandbox credentials for testing

interface PixxlesConfig {
  merchantID: string;
  signatureKey: string;
  gatewayUrl: string;
  environment: 'sandbox' | 'production';
  // Add 3DS URL override for testing
  threeDSURL?: string;
}

interface PixxlesTransactionRequest {
  action: 'SALE' | 'VERIFY' | 'REFUND_SALE' | 'CANCEL' | 'QUERY';
  type: string;
  amount: string;
  currencyCode: string;
  transactionUnique: string;
  orderRef: string;
  cardNumber: string;
  cardCVV: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerPostCode: string;
  customerTown: string;
  customerCountryCode: string;
  remoteAddress: string;
  threeDSRedirectURL: string;
  threeDSRequired?: string;
  avscv2CheckRequired?: string;
  duplicateDelay?: string;
  [key: string]: any; // Allow additional fields
}

interface PixxlesTransactionResponse {
  responseCode: string;
  responseMessage: string;
  responseStatus: string;
  state: string;
  xref: string;
  transactionID: string;
  authorisationCode: string;
  amountApproved: string;
  amountReceived: string;
  cardNumberMask: string;
  cardType: string;
  cardScheme: string;
  cardIssuer: string;
  signature: string;
  threeDSRef?: string;
  threeDSURL?: string;
  threeDSRequest?: any;
  [key: string]: any; // Allow additional response fields
}

interface Pixxles3DSResponse {
  threeDSRef: string;
  threeDSResponse: any;
}

// Configuration
const PIXXLES_CONFIG: PixxlesConfig = {
  merchantID: import.meta.env.VITE_PIXXLES_MERCHANT_ID || '132779',
  signatureKey: import.meta.env.VITE_PIXXLES_SIGNATURE_KEY || 'gpfu2XDYLKWvbZi',
  gatewayUrl: import.meta.env.VITE_PIXXLES_GATEWAY_URL || 'https://qa-transactions.pixxlesportal.com/direct',
  environment: (import.meta.env.VITE_PIXXLES_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
  // Add 3DS URL override for testing - set this to override the URL from Pixxles response
  threeDSURL: import.meta.env.VITE_PIXXLES_3DS_URL || undefined
};

// Utility functions for signature calculation
const ksort = (data: Record<string, any>): Record<string, any> => {
  const keys = Object.keys(data).sort((a, b) => a.localeCompare(b));
  const ret: Record<string, any> = {};
  for (const k of keys) {
    ret[k] = data[k];
  }
  return ret;
};

const urlencode = (str: string): string => {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/~/g, '%7E')
    .replace(/%20/g, '+');
};

const http_build_query = (data: Record<string, any>): string => {
  const build = (key: string, val: any): string => {
    if (val === true) {
      val = '1';
    } else if (val === false) {
      val = '0';
    }

    if (val === null) {
      return '';
    } else if (typeof val === 'object') {
      const tmp: string[] = [];
      for (const k in val) {
        if (val[k] !== null) {
          tmp.push(build(key + '[' + k + ']', val[k]));
        }
      }
      return tmp.join('&');
    } else if (typeof val !== 'function') {
      return urlencode(key) + '=' + urlencode(val);
    } else {
      throw new Error('There was an error processing for http_build_query().');
    }
  };

  const ret: string[] = [];
  for (const key in data) {
    const val = data[key];
    const tmp = build(key, val);
    if (tmp !== '') {
      ret.push(tmp);
    }
  }

  return ret.join('&');
};

const createSignature = async (data: Record<string, any>, key: string): Promise<string> => {
  // Sort the data in ascending ascii key order
  const sortedData = ksort(data);

  // Convert to a URL encoded string
  let ret = http_build_query(sortedData);

  // Normalise all line endings (CRNL|NLCR|NL|CR) to just NL (%0A)
  ret = ret.replace(/%0D%0A|%0A%0D|%0D/gi, '%0A');

  // Hash the string and secret together using SHA-512
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(ret + key);
  
  const hashBuffer = await crypto.subtle.digest('SHA-512', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Main Pixxles service class
class PixxlesService {
  private config: PixxlesConfig;

  constructor(config: PixxlesConfig = PIXXLES_CONFIG) {
    this.config = config;
  }

  // Generate a unique transaction ID
  private generateTransactionUnique(): string {
    return `txn_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  // Get browser device information for 3DS
  private getDeviceInfo(): Record<string, string> {
    return {
      deviceChannel: 'browser',
      deviceIdentity: navigator.userAgent,
      deviceTimeZone: new Date().getTimezoneOffset().toString(),
      deviceCapabilities: 'javascript',
      deviceScreenResolution: `${screen.width}x${screen.height}x${screen.colorDepth}`,
      deviceAcceptContent: navigator.userAgent.includes('Chrome') ? 
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8' : 
        '*/*',
      deviceAcceptEncoding: 'gzip, deflate, br',
      deviceAcceptLanguage: navigator.language || 'en-US',
      deviceAcceptCharset: ''
    };
  }

  // Create a sale transaction
  async createSaleTransaction(orderData: {
    amount: number;
    currency: string;
    orderRef: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    customerPostCode: string;
    customerTown: string;
    customerCountryCode: string;
    cardNumber: string;
    cardCVV: string;
    cardExpiryMonth: string;
    cardExpiryYear: string;
    customerIP: string;
    redirectURL: string;
  }): Promise<PixxlesTransactionResponse> {
    
    // Convert amount to pence (last two digits are decimal places)
    const amountInPence = Math.round(orderData.amount * 100).toString();

    const transactionData: PixxlesTransactionRequest = {
      action: 'SALE',
      type: '1', // E-commerce transaction
      amount: amountInPence,
      currencyCode: orderData.currency === 'GBP' ? '826' : '840', // ISO currency codes
      transactionUnique: this.generateTransactionUnique(),
      orderRef: orderData.orderRef,
      cardNumber: orderData.cardNumber.replace(/\s/g, ''),
      cardCVV: orderData.cardCVV,
      cardExpiryMonth: orderData.cardExpiryMonth,
      cardExpiryYear: orderData.cardExpiryYear.slice(-2), // Use 2-digit year format
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.customerAddress,
      customerPostCode: orderData.customerPostCode,
      customerTown: orderData.customerTown,
      customerCountryCode: orderData.customerCountryCode === 'GB' ? '826' : '840',
      remoteAddress: orderData.customerIP,
      threeDSRedirectURL: orderData.redirectURL,
      threeDSRequired: 'Y', // Enable 3DS
      avscv2CheckRequired: 'Y', // Enable AVS/CV2 checks
      duplicateDelay: '0',
      ...this.getDeviceInfo()
    };

    // Send transaction directly to Pixxles API
    const response = await this.sendTransaction(transactionData);
    return response;
  }

  // Continue 3DS transaction
  async continue3DSTransaction(threeDSRef: string, threeDSResponse: any): Promise<PixxlesTransactionResponse> {
    const transactionData: Record<string, any> = {
      action: 'SALE', // Continuation is still part of the original SALE
      threeDSRef,
      'threeDSResponse[threeDSMethodData]': threeDSResponse
    };

    console.log('3DS continuation data being sent:', transactionData);
    console.log('threeDSRef value:', threeDSRef);
    console.log('threeDSRef length:', threeDSRef ? threeDSRef.length : 'undefined/null');
    console.log('threeDSResponse value:', threeDSResponse);
    
    if (!threeDSRef || threeDSRef.trim() === '') {
      console.error('ERROR: threeDSRef is empty or invalid!');
      console.trace('Stack trace for empty threeDSRef');
    }

    // Send continuation request directly to Pixxles
    const response = await this.sendTransaction(transactionData);
    return response;
  }

  // Send transaction directly to Pixxles API
  private async sendTransaction(data: Record<string, any>): Promise<PixxlesTransactionResponse> {
    try {
      // Add merchant ID to transaction data
      data.merchantID = this.config.merchantID;
      
      // Create signature
      const signature = await createSignature(data, this.config.signatureKey);
      data.signature = signature;

      // Convert data to form-urlencoded format
      const formData = new URLSearchParams();
      for (const [key, value] of Object.entries(data)) {
        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
            // Handle nested objects (like threeDSResponse)
            for (const [nestedKey, nestedValue] of Object.entries(value)) {
              formData.append(`${key}[${nestedKey}]`, nestedValue as string);
            }
          } else {
            formData.append(key, value.toString());
          }
        }
      }

      console.log('Sending to Pixxles Gateway:', this.config.gatewayUrl);

      const response = await fetch(this.config.gatewayUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'BlueDreamTea-Payment-Gateway/1.0',
        },
        body: formData.toString()
      });

      console.log('Pixxles response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Pixxles error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const responseText = await response.text();
      console.log('Pixxles response received');
      
      // Parse the response (it's form-urlencoded)
      const responseData: Record<string, string> = {};
      const params = new URLSearchParams(responseText);
      for (const [key, value] of params.entries()) {
        responseData[key] = value;
      }

      console.log('Parsed response data');

      // Verify response signature
      const responseSignature = responseData.signature;
      delete responseData.signature;
      
      const expectedSignature = await createSignature(responseData, this.config.signatureKey);
      
      if (responseSignature !== expectedSignature) {
        console.error('Signature verification failed');
        console.error('Expected:', expectedSignature);
        console.error('Received:', responseSignature);
        throw new Error('Response signature verification failed');
      }

      // Add signature back to response
      responseData.signature = responseSignature;

      return responseData as PixxlesTransactionResponse;

    } catch (error) {
      console.error('Pixxles transaction error:', error);
      throw new Error(`Payment processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Check if response indicates 3DS authentication is required
  is3DSRequired(response: PixxlesTransactionResponse): boolean {
    return response.responseCode === '65802';
  }

  // Check if transaction was successful
  isTransactionSuccessful(response: PixxlesTransactionResponse): boolean {
    return response.responseCode === '0';
  }

  // Get error message from response
  getErrorMessage(response: PixxlesTransactionResponse): string {
    if (this.isTransactionSuccessful(response)) {
      return 'Transaction successful';
    }
    
    // Common error codes
    const errorMessages: Record<string, string> = {
      '1': 'Card referred - contact card issuer',
      '2': 'Card referred - special condition',
      '3': 'Invalid merchant',
      '4': 'Pickup card',
      '5': 'Card declined - do not honor',
      '6': 'Error',
      '51': 'Insufficient funds',
      '54': 'Expired card',
      '55': 'Incorrect PIN',
      '57': 'Transaction not permitted',
      '59': 'Suspected fraud',
      '65': 'SCA required',
      '65539': 'Invalid credentials',
      '65540': 'Permission denied',
      '65541': 'Action not allowed',
      '65544': 'Request malformed',
      '65545': 'Suspended merchant account',
      '65546': 'Currency not supported',
      '65549': 'Payment processor communications error',
      '65550': 'Payment processor error',
      '65551': 'Internal gateway communications error',
      '65552': 'Internal gateway error',
      '65553': 'Encryption error',
      '65554': 'Duplicate request',
      '65555': 'Settlement error',
      '65556': 'AVS/CV2 checks not supported',
      '65557': 'IP blocked',
      '65558': 'Primary IP blocked',
      '65559': 'Secondary IP blocked',
      '65561': 'Unsupported card type',
      '65562': 'Unsupported authorisation',
      '65563': 'Request not supported',
      '65564': 'Request expired',
      '65565': 'Request retry',
      '65566': 'Invalid card number',
      '65567': 'Unsupported card issuing country',
      '65568': 'Masterpass processing error',
      '65569': 'Masterpass not supported',
      '65570': 'Masterpass checkout failure',
      '65571': 'Masterpass checkout success',
      '65572': 'Masterpass checkout required',
      '65573': 'Amounts error',
      '65575': 'No data found',
      '65576': 'Request cancelled',
      '65792': '3DS processing in progress',
      '65793': '3DS processing error',
      '65794': '3DS processing required',
      '65795': '3DS processing not required',
      '65796': '3DS not supported',
      '65797': '3DS enrolment check error',
      '65800': '3DS authentication check error',
      '65802': '3DS authentication required',
      '65803': '3DS authentication results do not meet preferences',
      '65804': '3DS authentication successful'
    };

    return errorMessages[response.responseCode] || response.responseMessage || 'Unknown error occurred';
  }

  // Update configuration for production
  updateConfig(newConfig: Partial<PixxlesConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Get current configuration
  getConfig(): PixxlesConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const pixxlesService = new PixxlesService();

// Export types for use in other files
export type {
  PixxlesConfig,
  PixxlesTransactionRequest,
  PixxlesTransactionResponse,
  Pixxles3DSResponse
}; 