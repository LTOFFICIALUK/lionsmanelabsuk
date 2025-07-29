import React from 'react';
import { Link } from 'react-router-dom';

interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  isExternal?: boolean;
  ariaLabel?: string; // For better accessibility
  trackingId?: string; // For analytics
}

interface CTAButtonsProps {
  title?: string;
  description?: string;
  buttons: CTAButton[];
  className?: string;
  align?: 'left' | 'center' | 'right';
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6; // Heading level for better SEO hierarchy
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl';
  showDivider?: boolean;
  contentType?: 'section' | 'aside' | 'div'; // Semantic HTML element type
  addStructuredData?: boolean; // Add promotional structured data
}

const CTAButtons: React.FC<CTAButtonsProps> = ({
  title,
  description,
  buttons,
  className = '',
  align = 'center',
  titleLevel = 2,
  maxWidth = '4xl',
  showDivider = false,
  contentType = 'section',
  addStructuredData = false
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl'
  };

  const buttonVariants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50 focus:ring-blue-500'
  };

  // Dynamic heading component based on level
  const HeadingComponent = title ? `h${titleLevel}` as keyof JSX.IntrinsicElements : null;

  // Dynamic container component based on content type
  const ContainerComponent = contentType as keyof JSX.IntrinsicElements;

  // Structured data for promotional content
  const structuredData = addStructuredData && title ? {
    '@context': 'https://schema.org',
    '@type': 'PromotionalOffer',
    name: title,
    description: description || title,
    url: buttons[0]?.href || '',
    seller: {
      '@type': 'Organization',
      name: 'SuccessfulStreamer.com'
    }
  } : null;

  // Schema.org props for structured data
  const schemaProps = addStructuredData ? {
    itemScope: true,
    itemType: 'https://schema.org/PromotionalOffer'
  } : {};

  const ButtonComponent = ({ button }: { button: CTAButton }) => {
    const baseClasses = `
      inline-flex items-center px-6 py-3 rounded-lg
      font-semibold text-base sm:text-lg
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const content = (
      <>
        {button.label}
        {button.isExternal && (
          <svg
            className="ml-2 -mr-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </>
    );

    const commonProps = {
      className: `${baseClasses} ${buttonVariants[button.variant || 'primary']}`,
      'aria-label': button.ariaLabel || button.label,
      'data-tracking-id': button.trackingId,
      itemProp: addStructuredData ? 'url' : undefined
    };

    return button.isExternal ? (
      <a
        href={button.href}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
      >
        {content}
      </a>
    ) : (
      <Link
        to={button.href}
        {...commonProps}
      >
        {content}
      </Link>
    );
  };

  return (
    <ContainerComponent 
      className={`${maxWidthClasses[maxWidth]} mx-auto ${className}`} 
      data-cta-buttons
      {...schemaProps}
    >
      <div className={`flex flex-col ${alignmentClasses[align]} ${showDivider ? 'border-t border-gray-200 pt-8' : ''}`}>
        {title && HeadingComponent && (
          <header className="mb-4">
            <HeadingComponent 
              className="text-2xl sm:text-3xl font-bold text-gray-900"
              itemProp={addStructuredData ? 'name' : undefined}
            >
              {title}
            </HeadingComponent>
          </header>
        )}
        
        {description && (
          <p 
            className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed"
            itemProp={addStructuredData ? 'description' : undefined}
          >
            {description}
          </p>
        )}
        
        <div className={`flex flex-wrap gap-4 ${align === 'center' ? 'justify-center' : `justify-${align}`}`}>
          {buttons.map((button, index) => (
            <ButtonComponent key={index} button={button} />
          ))}
        </div>
      </div>

      {/* Add structured data script if enabled */}
      {addStructuredData && structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </ContainerComponent>
  );
};

export default CTAButtons;
