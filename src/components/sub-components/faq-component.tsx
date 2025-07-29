import React, { useState, useEffect } from 'react';
import { FAQItem, FAQComponentProps } from './faq-component.types';

const FAQComponent: React.FC<FAQComponentProps> = ({
  title = 'Frequently Asked Questions',
  faqs,
  className = '',
  titleSize = 'medium',
  showLastUpdated = true,
  maxWidth = '4xl'
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Title size classes
  const titleSizeClasses = {
    small: 'text-xl sm:text-2xl',
    medium: 'text-2xl sm:text-3xl',
    large: 'text-3xl sm:text-4xl'
  };

  // Max width classes
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl'
  };

  // Create a URL-friendly ID from the title
  const titleId = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Generate structured data for FAQ
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof faq.answer === 'string' ? faq.answer : faq.question // Fallback for React nodes
      }
    }))
  };

  // Add structured data to page head
  useEffect(() => {
    const scriptId = `faq-structured-data-${titleId}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = scriptId;
    
    // Remove existing script if it exists
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);
    
    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [titleId, structuredData]);

  const handleToggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggleFAQ(index);
    }
  };

  // Render answer content (string or React node)
  const renderAnswer = (answer: string | React.ReactNode) => {
    if (typeof answer === 'string') {
      return <p>{answer}</p>;
    }
    return answer;
  };

  return (
    <section className={`${maxWidthClasses[maxWidth]} mx-auto mb-12 mt-8 ${className}`}>
      <header>
        <h2 
          id={titleId}
          className={`${titleSizeClasses[titleSize]} font-semibold text-gray-900 mb-6`}
        >
          {title}
        </h2>
      </header>
      
      <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
        {faqs.map((faq, index) => (
          <article 
            key={index} 
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            itemScope 
            itemType="https://schema.org/Question"
          >
            <button
              onClick={() => handleToggleFAQ(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              tabIndex={0}
            >
              <span className="font-medium text-gray-900 pr-4" itemProp="name">
                {faq.question}
              </span>
              <span 
                className="text-gray-500 text-xl font-semibold flex-shrink-0"
                aria-hidden="true"
              >
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            
            {openIndex === index && (
              <div 
                id={`faq-answer-${index}`}
                className="p-4 bg-white text-gray-700 border-t"
                itemScope 
                itemType="https://schema.org/Answer"
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div itemProp="text" className="[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:mt-1 [&_p]:mb-3 [&_p:last-child]:mb-0">
                  {renderAnswer(faq.answer)}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
      
      {showLastUpdated && (
        <footer className="mt-8 text-sm text-gray-500">
          <p>
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </footer>
      )}
    </section>
  );
};

export default FAQComponent; 