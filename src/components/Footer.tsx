import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const productLinks = [
    { path: '/products/blue-lotus-flower-packs', label: 'Blue Lotus Flower Packs' },
    { path: '/products/blue-lotus-flower-pre-rolls', label: 'Blue Lotus Pre Rolls' },
    { path: '/products/blue-lotus-flower-smoking-blend', label: 'Blue Lotus Smoking Blend' },
    { path: '/products/blue-lotus-flower-tea-bags', label: 'Blue Lotus Tea Bags' },
    { path: '/products/blue-lotus-flower-tea-cut', label: 'Blue Lotus Tea Cut' },
  ];

  const essentialArticles = [
    { path: '/articles/what-is-blue-lotus-flower', label: 'What is Blue Lotus Flower?' },
    { path: '/articles/how-to-use-blue-lotus-flower', label: 'How to Use Blue Lotus Flower' },
    { path: '/articles/blue-lotus-flower-effects', label: 'Blue Lotus Flower Effects' },
    { path: '/articles/is-blue-lotus-flower-legal-in-the-uk', label: 'Is Blue Lotus Legal in UK?' },
    { path: '/articles/blue-lotus-flower-side-effects', label: 'Blue Lotus Side Effects' },
    { path: '/articles/how-to-make-blue-lotus-tea', label: 'How to Make Blue Lotus Tea' },
  ];

  const quickLinks = [
    { path: '/products', label: 'All Products' },
    { path: '/articles', label: 'All Articles' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Support' },
    { path: '/privacy-policy', label: 'Policies' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {/* Logo and About Section */}
          <div className="lg:col-span-1 lg:pr-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl font-bold text-white whitespace-nowrap">
                <span className="hidden md:inline">Blue Dream Tea UK</span>
                <span className="md:hidden">Blue Dream Tea UK</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
                Blue Dream Tea UK is a premium supplier of blue lotus flower products. Founded in early 2023, we have become a trusted name in the industry.
            </p>
          </div>

          {/* Products */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2">
              {productLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label={`Browse ${label}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Articles */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-4">Articles</h3>
            <ul className="space-y-2">
              {essentialArticles.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label={`Read ${label}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label={`Go to ${label}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              © {currentYear} Blue Dream Tea UK. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Premium Tea Supplier</span>
              <span>•</span>
              <span>UK Based</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 