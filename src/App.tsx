import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import ProductsPage from './pages/products';
import ProductPage from './pages/products/[slug]/page';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout';
import PrePurchaseUpsellPage from './pages/pre-purchase-upsell';
import OrderConfirmationPage from './pages/order-confirmation-page';
import PaymentCallbackPage from './pages/payment-callback';
import NotFoundPage from './pages/NotFound';
import AdminPage from './pages/admin';
import ArticlesPage from './pages/articles';
import ArticlePage from './pages/articles/ArticlePage';
import CategoriesPage from './pages/categories';
import CategoryPage from './pages/categories/CategoryPage';
import PrivacyPolicyPage from './pages/privacy-policy';
import TermsOfServicePage from './pages/terms-of-service';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-callback" element={<PaymentCallbackPage />} />
        <Route path="/pre-purchase-upsell" element={<PrePurchaseUpsellPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:slug" element={<CategoryPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App; 