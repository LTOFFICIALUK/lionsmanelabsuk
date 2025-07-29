import React from 'react';

interface RichTextProps {
  heading: string;
  content: string | React.ReactNode;
  className?: string;
  headingSize?: 'small' | 'medium' | 'large';
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6; // Heading level for better SEO hierarchy
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl';
  showDivider?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  contentType?: 'article' | 'section' | 'aside' | 'div'; // Semantic HTML element type
  addStructuredData?: boolean; // Add Article structured data
}

const RichText: React.FC<RichTextProps> = ({
  heading,
  content,
  className = '',
  headingSize = 'medium',
  headingLevel = 2,
  maxWidth = '4xl',
  showDivider = false,
  textAlign = 'left',
  contentType = 'section',
  addStructuredData = false
}) => {
  const headingSizeClasses = {
    small: 'text-xl sm:text-2xl',
    medium: 'text-2xl sm:text-3xl',
    large: 'text-3xl sm:text-4xl'
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

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  // Create a URL-friendly ID from the heading
  const headingId = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Dynamic heading component based on level
  const HeadingComponent = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  // Dynamic container component based on content type
  const ContainerComponent = contentType as keyof JSX.IntrinsicElements;

  // Structured data for Article type content
  const structuredData = addStructuredData ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: heading,
    articleBody: typeof content === 'string' ? content : heading,
    author: {
      '@type': 'Organization',
      name: 'SuccessfulStreamer.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SuccessfulStreamer.com'
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString()
  } : null;

  // Schema.org props for structured data
  const schemaProps = addStructuredData ? {
    itemScope: true,
    itemType: 'https://schema.org/Article'
  } : {};

  return (
    <ContainerComponent 
      className={`${maxWidthClasses[maxWidth]} mx-auto ${className} ${textAlignClasses[textAlign]}`}
      {...schemaProps}
    >
      <header className={showDivider ? 'border-b border-gray-200 pb-4 mb-6' : 'mb-4 mt-8'}>
        <HeadingComponent
          id={headingId}
          className={`${headingSizeClasses[headingSize]} font-semibold text-gray-900`}
          itemProp={addStructuredData ? 'headline' : undefined}
        >
          {heading}
        </HeadingComponent>
      </header>
      
      <div 
        className={`text-base sm:text-lg text-gray-600 leading-relaxed ${
          typeof content === 'string' ? '' : 
          '[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:mt-1 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_h4]:text-base [&_h5]:text-sm [&_h6]:text-xs [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-semibold [&_h4]:font-semibold [&_h5]:font-medium [&_h6]:font-medium [&_h1]:mb-4 [&_h2]:mb-3 [&_h3]:mb-2 [&_h4]:mb-2 [&_h5]:mb-1 [&_h6]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_a]:text-blue-600 [&_a:hover]:text-blue-800 [&_a]:underline [&_strong]:font-semibold [&_em]:italic'
        }`}
        itemProp={addStructuredData ? 'articleBody' : undefined}
      >
        {typeof content === 'string' ? (
          <p>{content}</p>
        ) : (
          content
        )}
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

export default RichText;
