import React, { useState } from 'react';

const DevelopmentWarning: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleShow = () => {
    setIsVisible(true);
  };

  if (isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50 max-w-md">
        <div className="bg-red-600/90 text-white p-3 rounded-lg shadow-lg border border-red-700/80">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0">
              <svg 
                className="w-5 h-5 text-red-200 mt-0.5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <div className="text-sm flex-1">
              <p className="font-semibold mb-1">Site Under Development</p>
              <p className="text-red-100 leading-relaxed">
                This website is currently under development. Product information, images, and pricing may not be accurate. Please do not attempt to complete purchases as transactions may not be processed correctly.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="flex-shrink-0 ml-2 text-red-200 hover:text-white transition-colors duration-200"
              aria-label="Close warning"
            >
              <svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={handleShow}
        className="bg-red-600/90 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg border border-red-700/80 transition-colors duration-200"
        aria-label="Show development warning"
      >
        <svg 
          className="w-5 h-5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>
    </div>
  );
};

export default DevelopmentWarning;
