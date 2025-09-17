import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { getShippingOptionsByCountry } from '../constants/shipping-options';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  options?: string[];
  needsInput?: boolean;
  inputPrompt?: string;
}

interface ChatContextType {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  showInput: boolean;
  toggleChat: () => void;
  closeChat: () => void;
  sendMessage: (text: string) => void;
  clearChat: () => void;
  shouldShowChat: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const location = useLocation();

  // Pages where chat should not appear
  const excludedPages = ['/cart', '/checkout', '/payment-callback', '/pre-purchase-upsell'];
  const shouldShowChat = !excludedPages.some(page => location.pathname.startsWith(page));

  // Automated responses based on keywords
  const automatedResponses = {
    greeting: {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
      responses: [
        "Hello! Welcome to Lion's Mane Labs UK. How can I help you today?",
        "Hi there! I'm here to assist you with any questions about our premium Lion's Mane products.",
        "Good day! What can I help you with regarding our Lion's Mane collection?"
      ]
    },
    products: {
      keywords: ['product', 'tea', 'lions mane', 'capsules', 'powder', 'extract', 'tincture', 'price', 'cost'],
      responses: [
        "We offer a premium range of Lion's Mane products including capsules, powder, extract, tea, and tinctures. Each product is carefully crafted for maximum potency and quality.",
        "Our Lion's Mane products start from £19.99 and come in various sizes. Would you like to know more about a specific product?",
        "All our products are made from premium quality Lion's Mane mushrooms and are third-party tested for purity and potency."
      ]
    },
    shipping: {
      keywords: ['shipping', 'delivery', 'postage', 'dispatch', 'when', 'how long'],
      responses: [
        "We offer free shipping on orders over £50 within the UK. Standard delivery takes 2-3 business days.",
        "Orders are typically dispatched within 1-2 business days. You'll receive tracking information once your order ships.",
        "We ship to the UK and selected international destinations. International shipping times vary by location."
      ]
    },
    orders: {
      keywords: ['order tracking', 'order', 'tracking', 'status', 'cancel', 'refund', 'return'],
      responses: [
        {
          text: "I can help you with your order! What do you need assistance with?",
          needsInput: false,
          options: [
            "Track my order",
            "Cancel my order",
            "Return/refund policy",
            "Order status"
          ]
        }
      ]
    },
    'track-order': {
      keywords: ['track my order', 'track order', 'order tracking', 'where is my order'],
      responses: [
        {
          text: "I can help you track your order! Please provide your order number so I can look up the details for you.",
          needsInput: true,
          inputPrompt: "Please enter your order number (you can find this in your confirmation email):"
        }
      ]
    },
    'cancel-order': {
      keywords: ['cancel my order', 'cancel order', 'stop order'],
      responses: [
        {
          text: "I can help you cancel your order. Please provide your order number and I'll process the cancellation for you.",
          needsInput: true,
          inputPrompt: "Please enter your order number (you can find this in your confirmation email):"
        }
      ]
    },
    'return-refund': {
      keywords: ['return', 'refund', 'return policy', 'refund policy'],
      responses: [
        {
          text: "For returns and refunds, please contact us within 30 days of purchase. We offer a full refund guarantee. Please email us at lionsmanelabs@gmail.com with your order number and reason for return.",
          needsInput: false
        }
      ]
    },
    'order-status': {
      keywords: ['order status', 'order details', 'order information'],
      responses: [
        {
          text: "I can check your order status! Please provide your order number and I'll look up the current status for you.",
          needsInput: true,
          inputPrompt: "Please enter your order number (you can find this in your confirmation email):"
        }
      ]
    },
    benefits: {
      keywords: ['product benefits', 'benefits', 'effects', 'what does', 'how does', 'cognitive', 'memory', 'focus'],
      responses: [
        {
          text: "Lion's Mane offers amazing cognitive benefits! What would you like to know more about?",
          needsInput: false,
          options: [
            "What are the main benefits?",
            "How long does it take to work?",
            "Can I take it daily?",
            "Dosage recommendations"
          ]
        }
      ]
    },
    'main-benefits': {
      keywords: ['main benefits', 'what are the benefits', 'benefits of lions mane'],
      responses: [
        {
          text: "Lion's Mane is known for supporting cognitive function, memory, and focus. It contains compounds that may support nerve growth and brain health. Our customers report improved mental clarity, better focus, and enhanced cognitive performance with regular use.",
          needsInput: false
        }
      ]
    },
    'how-long-to-work': {
      keywords: ['how long', 'when will it work', 'time to see results', 'how long to take effect'],
      responses: [
        {
          text: "Most people start to notice benefits within 2-4 weeks of consistent use. For optimal results, we recommend taking Lion's Mane daily for at least 8-12 weeks. Individual results may vary based on dosage, lifestyle, and overall health.",
          needsInput: false
        }
      ]
    },
    'daily-use': {
      keywords: ['daily', 'every day', 'can i take daily', 'regular use'],
      responses: [
        {
          text: "Yes, Lion's Mane is safe for daily use! We recommend taking it consistently for best results. Start with the recommended dosage on the product label and adjust based on your individual needs. Always consult with a healthcare professional if you have any concerns.",
          needsInput: false
        }
      ]
    },
    'dosage-recommendations': {
      keywords: ['dosage', 'how much', 'how many', 'serving size'],
      responses: [
        {
          text: "For capsules: Take 1-2 capsules daily with food. For powder: 1-2 teaspoons daily, mixed with water or smoothies. Start with the recommended dosage on the product label and adjust based on your individual needs. Always consult with a healthcare professional.",
          needsInput: false
        }
      ]
    },
    dosage: {
      keywords: ['dosage', 'how much', 'how many', 'take', 'use', 'serving'],
      responses: [
        "For capsules: Take 1-2 capsules daily with food. For powder: 1-2 teaspoons daily, mixed with water or smoothies.",
        "Start with the recommended dosage on the product label and adjust based on your individual needs. Always consult with a healthcare professional.",
        "Our products come with detailed dosage instructions. The optimal amount can vary based on your goals and individual response."
      ]
    },
    quality: {
      keywords: ['quality', 'organic', 'pure', 'tested', 'lab', 'certified', 'safe'],
      responses: [
        "All our products are third-party tested for purity and potency. We use only premium quality, organic Lion's Mane mushrooms.",
        "We're committed to the highest quality standards. Every batch is tested for contaminants and active compounds.",
        "Our products are manufactured in GMP-certified facilities and undergo rigorous quality control testing."
      ]
    },
    ingredients: {
      keywords: ['ingredients', 'what is', 'contains', 'made from', 'composition'],
      responses: [
        "Our Lion's Mane products contain 100% pure Lion's Mane mushroom extract with no fillers or additives.",
        "Each product is made from premium Lion's Mane mushrooms (Hericium erinaceus) grown under controlled conditions.",
        "We use only the fruiting body of Lion's Mane mushrooms, which contains the highest concentration of beneficial compounds."
      ]
    },
    storage: {
      keywords: ['store', 'storage', 'shelf life', 'expire', 'expiry', 'keep'],
      responses: [
        "Store our products in a cool, dry place away from direct sunlight. Most products have a 2-year shelf life when stored properly.",
        "Keep capsules and powders in their original containers with lids tightly closed. Store tinctures at room temperature.",
        "For best results, store in a cool, dark place. Avoid exposure to heat, moisture, and direct sunlight."
      ]
    },
    shipping: {
      keywords: ['shipping information', 'shipping', 'delivery', 'postage', 'dispatch', 'when', 'how long', 'cost', 'price'],
      responses: [
        {
          text: "I can help you with shipping information! What would you like to know?",
          needsInput: false,
          options: [
            "Where do you ship to?",
            "What shipping services do you offer?",
            "How do I get free shipping?"
          ]
        }
      ]
    },
    'shipping-locations': {
      keywords: ['where do you ship', 'ship to', 'delivery locations', 'countries'],
      responses: [
        {
          text: "We ship to UK mainland & channel islands, and selected international destinations worldwide. We use Royal Mail for all deliveries.",
          needsInput: false
        }
      ]
    },
    'shipping-services': {
      keywords: ['shipping services', 'delivery options', 'shipping methods', 'postage options'],
      responses: [
        {
          text: "Here are our shipping services:\n\n**UK Shipping:**\n• Standard Shipping (Royal Mail 2nd Class) - £2.99 - 3-5 business days\n• Express Tracked (Royal Mail Tracked 24) - £4.99 - 1-2 business days\n• Next Day Delivery (Special Delivery) - £12.99 - Next business day\n\n**International Shipping:**\n• International Standard - £8.99 - 7-10 business days\n• International Tracked & Signed - £14.99 - 5-7 business days",
          needsInput: false
        }
      ]
    },
    'free-shipping': {
      keywords: ['free shipping', 'free delivery', 'shipping cost', 'no shipping charge'],
      responses: [
        {
          text: "You can get free shipping by spending over £30! This applies to UK Standard and Express shipping options. International shipping is not included in the free shipping offer.",
          needsInput: false
        }
      ]
    },
    contact: {
      keywords: ['contact support', 'contact', 'email', 'phone', 'support', 'help', 'question'],
      responses: [
        {
          text: "I'd be happy to help you get in touch with our support team! How would you like to contact us?",
          needsInput: false,
          options: [
            "Email support",
            "Business enquiries",
            "General question"
          ]
        }
      ]
    },
    'email-support': {
      keywords: ['email support', 'email help', 'contact by email'],
      responses: [
        {
          text: "I'd be happy to connect you with our support team. Please provide your email address and I'll have someone contact you.",
          needsInput: true,
          inputPrompt: "Please enter your email address:"
        }
      ]
    },
    'business-enquiries': {
      keywords: ['business enquiries', 'business inquiry', 'wholesale', 'partnership'],
      responses: [
        {
          text: "For business enquiries, wholesale, or partnership opportunities, please email us at lionsmanelabs@gmail.com with details about your business and what you're looking for.",
          needsInput: false
        }
      ]
    },
    'general-question': {
      keywords: ['general question', 'other question', 'something else'],
      responses: [
        {
          text: "For general questions or anything else, please email us at lionsmanelabs@gmail.com and we'll get back to you within 24 hours.",
          needsInput: false
        }
      ]
    },
    billing: {
      keywords: ['payment', 'billing', 'invoice', 'charge', 'refund', 'money', 'card', 'paypal'],
      responses: [
        {
          text: "For payment and billing issues, please email us at lionsmanelabs@gmail.com with your order number and details of the issue. We'll get back to you within 24 hours.",
          needsInput: false
        }
      ]
    },
    technical: {
      keywords: ['website', 'technical', 'bug', 'error', 'login', 'account', 'password', 'broken'],
      responses: [
        {
          text: "For technical support issues, please email us at lionsmanelabs@gmail.com with details of the problem you're experiencing. Include your browser type and any error messages you see.",
          needsInput: false
        }
      ]
    },
    default: {
      responses: [
        "I'm here to help! Could you please provide more details about your question?",
        "That's a great question! Let me connect you with more specific information. What would you like to know more about?",
        "I'd be happy to assist you. Could you rephrase your question or let me know what specific information you're looking for?"
      ]
    }
  };

  // Load messages from localStorage on component mount
  useEffect(() => {
    const chatVersion = localStorage.getItem('chatVersion');
    const currentVersion = '2.2'; // Increment this when making breaking changes
    
    // Clear old chat data if version is different
    if (chatVersion !== currentVersion) {
      localStorage.removeItem('chatMessages');
      localStorage.setItem('chatVersion', currentVersion);
    }
    
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error loading chat messages:', error);
        // If there's an error, start fresh with new welcome message
        const welcomeMessage: Message = {
          id: 'welcome',
          text: "Hello! I'm your AI assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date(),
          options: [
            "Tell me about your products",
            "Shipping information",
            "Order tracking",
            "Product benefits",
            "Contact support"
          ]
        };
        setMessages([welcomeMessage]);
      }
    } else {
      // Add welcome message if no previous messages
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "Hello! I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date(),
        options: [
          "Shipping information",
          "Order tracking",
          "Product benefits",
          "Contact support"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const findBestResponse = (userMessage: string): { text: string; needsInput?: boolean; inputPrompt?: string; options?: string[] } => {
    const lowerMessage = userMessage.toLowerCase().trim();
    console.log('Looking for response to:', lowerMessage);
    
    // Check for exact matches first
    if (lowerMessage === 'shipping information') {
      console.log('Exact match: shipping information');
      return {
        text: "I can help you with shipping information! What would you like to know?",
        needsInput: false,
        options: [
          "Where do you ship to?",
          "What shipping services do you offer?",
          "How do I get free shipping?"
        ]
      };
    }
    
    // Third level questions - these should provide answers
    if (lowerMessage === 'where do you ship to?') {
      console.log('Exact match: where do you ship to?');
      return {
        text: "We ship to UK mainland & channel islands, and selected international destinations worldwide. We use Royal Mail for all deliveries.",
        needsInput: false,
        options: ["I have another question"]
      };
    }
    
    if (lowerMessage === 'what shipping services do you offer?') {
      console.log('Exact match: what shipping services do you offer?');
      return {
        text: "Here are our shipping services:\n\nUK Shipping:\n• Standard Shipping (Royal Mail 2nd Class) - £2.99 - 3-5 business days\n• Express Tracked (Royal Mail Tracked 24) - £4.99 - 1-2 business days\n• Next Day Delivery (Special Delivery) - £12.99 - Next business day\n\nInternational Shipping:\n• International Standard - £8.99 - 7-10 business days\n• International Tracked & Signed - £14.99 - 5-7 business days",
        needsInput: false,
        options: ["I have another question"]
      };
    }
    
    if (lowerMessage === 'how do i get free shipping?') {
      console.log('Exact match: how do i get free shipping?');
      return {
        text: "You can get free shipping by spending over £30! This applies to UK Standard shipping options and is automatically applied at checkout.",
        needsInput: false,
        options: ["I have another question"]
      };
    }
    
    if (lowerMessage === 'order tracking') {
      console.log('Exact match: order tracking');
      return {
        text: "I can help you with your order! What do you need assistance with?",
        needsInput: false,
        options: [
          "Track my order",
          "Cancel my order",
          "Return/refund policy",
          "Order status"
        ]
      };
    }
    
    // Order tracking sub-questions
    if (lowerMessage === 'track my order') {
      console.log('Exact match: track my order');
      return {
        text: "I can help you track your order! Please provide your order number so I can look up the details for you. You can find your order number in your confirmation email.",
        needsInput: true,
        inputPrompt: "Order number:"
      };
    }
    
    if (lowerMessage === 'cancel my order') {
      console.log('Exact match: cancel my order');
      return {
        text: "I can help you cancel your order. Please provide your order number and I'll process the cancellation for you. You can find your order number in your confirmation email.",
        needsInput: true,
        inputPrompt: "Order number:"
      };
    }
    
    if (lowerMessage === 'return/refund policy') {
      console.log('Exact match: return/refund policy');
      return {
        text: "For returns and refunds, please contact us within 30 days of purchase. We offer a full refund guarantee. Please email us at lionsmanelabs@gmail.com with your order number and reason for return.",
        needsInput: false,
        options: ["I have another question"]
      };
    }
    
    if (lowerMessage === 'order status') {
      console.log('Exact match: order status');
      return {
        text: "I can check your order status! Please provide your order number and I'll look up the current status for you. You can find your order number in your confirmation email.",
        needsInput: true,
        inputPrompt: "Order number:"
      };
    }
    
    if (lowerMessage === 'product benefits') {
      console.log('Exact match: product benefits');
      return {
        text: "Lion's Mane offers amazing cognitive benefits! What would you like to know more about?",
        needsInput: false,
        options: [
          "What are the main benefits?",
          "How long does it take to work?",
          "Can I take it daily?",
          "Dosage recommendations"
        ]
      };
    }
    
    // Product benefits sub-questions
    if (lowerMessage === 'what are the main benefits?') {
      console.log('Exact match: what are the main benefits?');
      return {
        text: "Lion's Mane is known for supporting cognitive function, memory, and focus. It contains compounds that may support nerve growth and brain health. Our customers report improved mental clarity, better focus, and enhanced cognitive performance with regular use.",
        needsInput: false,
        options: ["I have another question"]
      };
    }
    
    if (lowerMessage === 'how long does it take to work?') {
      console.log('Exact match: how long does it take to work?');
      return {
        text: "Most people start to notice benefits within 2-4 weeks of consistent use. For optimal results, we recommend taking Lion's Mane daily for at least 8-12 weeks. Individual results may vary based on dosage, lifestyle, and overall health.",
        needsInput: false,
        options: ["I have another question"]
      };
    }
    
    if (lowerMessage === 'can i take it daily?') {
      console.log('Exact match: can i take it daily?');
      return {
        text: "Yes, Lion's Mane is safe for daily use! We recommend taking it consistently for best results. Start with the recommended dosage on the product label and adjust based on your individual needs. Always consult with a healthcare professional if you have any concerns.",
        needsInput: false,
        options: ["I have another question"]
      };
    }
    
    if (lowerMessage === 'dosage recommendations') {
      console.log('Exact match: dosage recommendations');
      return {
        text: "For capsules: Take 1-2 capsules daily with food. For powder: 1-2 teaspoons daily, mixed with water or smoothies. Start with the recommended dosage on the product label and adjust based on your individual needs. Always consult with a healthcare professional.",
        needsInput: false,
        options: ["I have another question"]
      };
    }
    
    if (lowerMessage === 'contact support') {
      console.log('Exact match: contact support');
      return {
        text: "For any support questions, please email us at lionsmanelabs@gmail.com and we'll get back to you within 24 hours.",
        needsInput: false,
        options: ["I have another question"]
      };
    }
    
    
    // Handle "I have another question" to reset to main options
    if (lowerMessage === 'i have another question') {
      console.log('Exact match: i have another question');
      return {
        text: "Of course! How else can I help you today?",
        needsInput: false,
        options: [
          "Shipping information",
          "Order tracking",
          "Product benefits",
          "Contact support"
        ]
      };
    }
    
    // Fallback to keyword matching
    for (const [category, data] of Object.entries(automatedResponses)) {
      if (category === 'default') continue;
      
      const hasKeyword = data.keywords.some(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
      );
      
      if (hasKeyword) {
        console.log('Found match in category:', category);
        const responses = data.responses;
        const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
        
        // Handle both old string format and new object format
        if (typeof selectedResponse === 'string') {
          return { text: selectedResponse, needsInput: false };
        } else {
          console.log('Returning response with options:', selectedResponse.options);
          return selectedResponse;
        }
      }
    }
    
    console.log('No match found, using default');
    // Return default response if no keywords match
    const defaultResponses = automatedResponses.default.responses;
    const selectedResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    return { text: selectedResponse, needsInput: false };
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setShowInput(false); // Hide input when sending a message

    // Simulate typing delay
    setTimeout(() => {
      // Check if this is a response to a shipping country question
      const lastMessage = messages[messages.length - 1];
      let response;
      
      if (lastMessage?.inputPrompt?.includes("country")) {
        // Handle shipping country response
        const shippingOptions = getShippingOptionsByCountry(text.trim());
        const isUK = text.toLowerCase().includes('uk') || text.toLowerCase().includes('united kingdom') || text.toLowerCase().includes('britain');
        
        if (isUK) {
          response = {
            text: `Great! Here are our UK shipping options:\n\n• Standard Shipping (Royal Mail 2nd Class) - £2.99 - 3-5 business days\n• Express Tracked (Royal Mail Tracked 24) - £4.99 - 1-2 business days\n• Next Day Delivery (Special Delivery) - £12.99 - Next business day\n\nFree shipping on orders over £30!`,
            needsInput: false
          };
        } else {
          response = {
            text: `Here are our international shipping options:\n\n• International Standard - £8.99 - 7-10 business days\n• International Tracked & Signed - £14.99 - 5-7 business days\n\nWe ship worldwide!`,
            needsInput: false
          };
        }
      } else {
        response = findBestResponse(userMessage.text);
      }
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        needsInput: response.needsInput,
        inputPrompt: response.inputPrompt,
        options: response.needsInput ? undefined : (response.options || [
          "Shipping information",
          "Order tracking",
          "Product benefits",
          "Contact support"
        ])
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Show input if the response needs user input
      if (response.needsInput) {
        setShowInput(true);
      }
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const clearChat = () => {
    setMessages([]);
    setShowInput(false); // Reset input state
    setIsTyping(false); // Reset typing state
    localStorage.removeItem('chatMessages');
    // Add welcome message back
    const welcomeMessage: Message = {
      id: 'welcome',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
      options: [
        "Shipping information",
        "Order tracking",
        "Product benefits",
        "Contact support"
      ]
    };
    setMessages([welcomeMessage]);
  };

  const value: ChatContextType = {
    isOpen,
    messages,
    isTyping,
    showInput,
    toggleChat,
    closeChat,
    sendMessage,
    clearChat,
    shouldShowChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
