import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import './index.css';

// Import Brevo tracker tests for development (only in development)
if (import.meta.env.DEV) {
  import('./utils/test-brevo-tracker');
  import('./utils/test-brevo-api');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
); 