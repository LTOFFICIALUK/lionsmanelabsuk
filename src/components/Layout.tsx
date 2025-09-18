import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import AnnouncementBar from './AnnouncementBar';
import ChatWidget from './ChatWidget';
import CartModal from './CartModal';
import DevelopmentWarning from './DevelopmentWarning';
import { ChatProvider } from '../contexts/ChatContext';

const Layout: React.FC = () => {
  return (
    <ChatProvider>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <AnnouncementBar />
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <ChatWidget />
        <CartModal />
        <DevelopmentWarning />
      </div>
    </ChatProvider>
  );
};

export default Layout; 