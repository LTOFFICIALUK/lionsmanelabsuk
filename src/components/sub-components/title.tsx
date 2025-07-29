import React from 'react';

interface TitleProps {
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  level?: 1 | 2 | 3 | 4 | 5 | 6; // Heading level for better SEO hierarchy
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl';
  showDivider?: boolean;
}

const Title: React.FC<TitleProps> = ({
  title,
  description,
  className = '',
  align = 'left',
  level = 1,
  size = 'large',
  maxWidth = '4xl',
  showDivider = false
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const sizeClasses = {
    small: 'text-xl sm:text-2xl',
    medium: 'text-2xl sm:text-3xl',
    large: 'text-3xl sm:text-4xl lg:text-5xl',
    xlarge: 'text-4xl sm:text-5xl lg:text-6xl'
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

  // Create a URL-friendly ID from the title
  const titleId = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Dynamic heading component based on level
  const HeadingComponent = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <header className={`${maxWidthClasses[maxWidth]} mx-auto ${className} ${alignmentClasses[align]}`}>
      <HeadingComponent
        id={titleId}
        className={`${sizeClasses[size]} font-bold tracking-tight text-gray-900 ${showDivider ? 'border-b-2 border-gray-200 pb-4' : ''}`}
        itemProp="name"
      >
        {title}
      </HeadingComponent>
      {description && (
        <p className={`mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed ${align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-3xl'}`} itemProp="description">
          {description}
        </p>
      )}
      {showDivider && !description && (
        <div className="mt-4 border-b-2 border-gray-200"></div>
      )}
    </header>
  );
};

export default Title;
