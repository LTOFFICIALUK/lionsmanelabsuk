import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import AnnouncementBar from './AnnouncementBar';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 