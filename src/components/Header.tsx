// src/components/Header.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import AnnouncementBar from './AnnouncementBar';
import CartDrawer from './CartDrawer';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const location = useLocation();
  const { cart, openCart, closeCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Create navigation items based on products
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products/lions-mane-capsules', label: 'Capsules' },
    { path: '/products/lions-mane-powder', label: 'Powder' },
    { path: '/products/lions-mane-extract', label: 'Extract' },
    { path: '/products/lions-mane-tea', label: 'Tea' },
    { path: '/products/lions-mane-tincture', label: 'Tincture' },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      {/* Announcement Bar */}
      <AnnouncementBar announcements={['48 Hour Delivery on all UK orders', 'Free Delivery on orders over £30']} />

      <header className="bg-white shadow-sm border-b border-gray-100 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Mobile Layout: Hamburger | Logo | Cart */}
            <div className="flex lg:hidden items-center justify-between w-full">
              {/* Mobile Menu Button - Left */}
              <button
                onClick={handleMenuToggle}
                className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Logo - Center */}
              <div className="flex-shrink-0">
                <Link 
                  to="/" 
                  className="block hover:opacity-80 transition-opacity"
                  aria-label="Lion's Mane Labs UK Home"
                >
                  <img 
                    src={logo} 
                    alt="Lion's Mane Labs UK"
                    className="h-10 sm:h-12 w-auto"
                  />
                </Link>
              </div>

              {/* Cart - Right */}
              <div className="relative">
                <button 
                  className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 relative transition-colors" 
                  aria-label="Shopping Cart"
                  onMouseEnter={openCart}
                >
                  <svg
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l1 9h12l1-9h2" />
                    <circle cx="10" cy="21" r="1" />
                    <circle cx="17" cy="21" r="1" />
                  </svg>
                  {/* Cart Count Badge */}
                  {cart.totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {cart.totalItems > 99 ? '99+' : cart.totalItems}
                    </span>
                  )}
                </button>
                
                {/* Cart Dropdown */}
                <CartDrawer />
              </div>
            </div>

            {/* Desktop Layout: Logo | Navigation | Search & Cart */}
            <div className="hidden lg:flex items-center justify-between w-full">
              {/* Logo - Left */}
              <div className="flex-shrink-0">
                <Link 
                  to="/" 
                  className="block hover:opacity-80 transition-opacity"
                  aria-label="Lion's Mane Labs UK Home"
                >
                  <img 
                    src={logo} 
                    alt="Lion's Mane Labs UK"
                    className="h-14 w-auto"
                  />
                </Link>
              </div>

              {/* Desktop Navigation - Center */}
              <nav className="flex-1 flex justify-center mx-8">
                <div className="flex items-center space-x-2 xl:space-x-3">
                  {navItems.map(({ path, label }) => (
                    <Link
                      key={path}
                      to={path}
                      className={`
                        px-4 py-3 rounded-lg text-base xl:text-lg font-medium transition-all duration-200
                        hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                        ${isActive(path) 
                          ? 'text-blue-600' 
                          : 'text-gray-700 hover:text-blue-600'
                        }
                      `}
                      aria-current={isActive(path) ? 'page' : undefined}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Right Side Icons */}
              <div className="flex items-center space-x-2">
                {/* Search Button */}
                <button
                  onClick={handleSearchToggle}
                  className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                  aria-label="Search"
                >
                  <svg
                    className="h-5 w-5 text-gray-700"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="10" cy="10" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </button>

                {/* Shopping Cart Icon */}
                <div 
                  className="relative"
                  onMouseEnter={openCart}
                  onMouseLeave={closeCart}
                >
                  <Link
                    to="/cart"
                    className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 relative transition-colors block" 
                    aria-label="Shopping Cart"
                  >
                    <svg
                      className="h-5 w-5 text-gray-700"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 3h2l1 9h12l1-9h2" />
                      <circle cx="10" cy="21" r="1" />
                      <circle cx="17" cy="21" r="1" />
                    </svg>
                    {/* Cart Count Badge */}
                    {cart.totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {cart.totalItems > 99 ? '99+' : cart.totalItems}
                      </span>
                    )}
                  </Link>
                  
                  {/* Cart Dropdown */}
                  <CartDrawer />
                </div>
              </div>
            </div>
          </div>

          {/* Search Popup */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg p-4 z-50">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Search</h2>
                <input
                  type="text"
                  placeholder="Search for products or information..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
                  autoFocus
                />
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Popular Products</h3>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          to="/products/lions-mane-capsules"
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors block"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          Lion's Mane Capsules
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/lions-mane-tea"
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors block"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          Lion's Mane Tea
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/lions-mane-powder"
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors block"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          Lion's Mane Powder
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Quick Links</h3>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          to="/articles/how-to-use-lions-mane-powder"
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors block"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          How to Use Lion's Mane
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/articles/lions-mane-cognitive-benefits"
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors block"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          Benefits & Effects
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/articles/lions-mane-scientific-research"
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors block"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          Scientific Research
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Navigation Dropdown */}
          <div
            className={`
              absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40
              transform transition-all duration-300 ease-in-out lg:hidden
              ${isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible'}
            `}
          >
            <div className="px-4 py-3">
              <nav className="space-y-1">
                {navItems.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`
                      block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                      hover:bg-gray-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400
                      ${isActive(path) 
                        ? 'text-blue-600 bg-blue-50 shadow-sm' 
                        : 'text-gray-700'
                      }
                    `}
                    aria-current={isActive(path) ? 'page' : undefined}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;