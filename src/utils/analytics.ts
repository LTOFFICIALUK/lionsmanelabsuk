// Types for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

let isGAInitialized = false;
let pendingEvents: Array<() => void> = [];

// Load Google Analytics script
const loadGoogleAnalytics = () => {
  if (isGAInitialized) return;
  
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-6FW6C7L7MC';
  
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-6FW6C7L7MC');
  `;
  
  document.head.appendChild(script1);
  document.head.appendChild(script2);
  
  isGAInitialized = true;
  
  // Execute any pending events
  pendingEvents.forEach(event => event());
  pendingEvents = [];
};

// Initialize Google Analytics with deferred loading
export const initGA = () => {
  if (isGAInitialized) return;
  
  // Use requestIdleCallback for better performance
  const loadGA = () => {
    if (!isGAInitialized) {
      loadGoogleAnalytics();
    }
  };
  
  // Set up event listeners for user interaction
  const handleUserInteraction = () => {
    loadGA();
    // Remove event listeners after first interaction
    document.removeEventListener('click', handleUserInteraction);
    document.removeEventListener('scroll', handleUserInteraction);
    document.removeEventListener('keydown', handleUserInteraction);
    document.removeEventListener('mousemove', handleUserInteraction);
    document.removeEventListener('touchstart', handleUserInteraction);
  };
  
  // Add interaction event listeners
  document.addEventListener('click', handleUserInteraction);
  document.addEventListener('scroll', handleUserInteraction);
  document.addEventListener('keydown', handleUserInteraction);
  document.addEventListener('mousemove', handleUserInteraction);
  document.addEventListener('touchstart', handleUserInteraction);
  
  // Fallback: load after 2 seconds if no interaction
  setTimeout(() => {
    if (!isGAInitialized) {
      loadGA();
      // Clean up event listeners
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('mousemove', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    }
  }, 2000);
};

// Track page views
export const pageview = (url: string) => {
  const trackPageview = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-6FW6C7L7MC', {
        page_path: url,
      });
    }
  };
  
  if (isGAInitialized) {
    trackPageview();
  } else {
    pendingEvents.push(trackPageview);
  }
};

// Track events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  const trackEvent = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };
  
  if (isGAInitialized) {
    trackEvent();
  } else {
    pendingEvents.push(trackEvent);
  }
}; 