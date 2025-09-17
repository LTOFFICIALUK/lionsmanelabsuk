import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const productLinks = [
    { path: '/products/lions-mane-capsules', label: 'Lions Mane Capsules' },
    { path: '/products/lions-mane-powder', label: 'Lions Mane Powder' },
    { path: '/products/lions-mane-extract', label: 'Lions Mane Extract' },
    { path: '/products/lions-mane-tea', label: 'Lions Mane Tea' },
    { path: '/products/lions-mane-tincture', label: 'Lions Mane Tincture' },
  ];

  const essentialArticles = [
    { path: '/articles/lions-mane-cognitive-benefits', label: 'Lions Mane Benefits' },
    { path: '/articles/how-to-use-lions-mane-powder', label: 'How to Use Lions Mane' },
    { path: '/articles/lions-mane-dosage-guide', label: 'Lions Mane Dosage Guide' },
    { path: '/articles/lions-mane-vs-other-nootropics', label: 'Lions Mane vs Nootropics' },
    { path: '/articles/lions-mane-memory-enhancement', label: 'Lions Mane for Memory' },
    { path: '/articles/lions-mane-tea-benefits', label: 'Lions Mane Tea Benefits' },
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
                <span className="hidden md:inline">Lions Mane Labs UK</span>
                <span className="md:hidden">Lions Mane Labs UK</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
                Lions Mane Labs UK is a premium supplier of Lions Mane mushroom supplements. Founded in early 2023, we have become a trusted name in the cognitive enhancement industry.
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
              © {currentYear} Lion's Mane Labs UK. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Premium Lion's Mane Supplier</span>
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