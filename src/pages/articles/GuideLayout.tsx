import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { GuideCategory } from '../../types';
import { ALL_ARTICLES } from '../../constants/articles';

interface GuideLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  publishDate?: string;
  lastModified?: string;
  author?: string;
  category: GuideCategory;
  featuredImage?: string;
  keywords?: string[];
  wordCount?: number;
  readingTime?: string;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

const GuideLayout: React.FC<GuideLayoutProps> = ({
  children,
  title,
  description,
  publishDate,
  lastModified,
  author = 'Blue Dream Tea UK Team',
  category,
  featuredImage,
  keywords = [],
  wordCount,
  readingTime
}) => {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isTocOpen, setIsTocOpen] = useState(false);
  const location = useLocation();
  const currentSlug = location.pathname.split('/').pop() || '';
  
  // Generate full URL for the current page
  const fullUrl = `https://bluedreamtea.co.uk${location.pathname}`;
  
  // Default featured image if none provided
  const defaultFeaturedImage = 'https://bluedreamtea.co.uk/images/default-article-cover.jpg';
  
  // Calculate reading time if word count is provided
  const estimatedReadingTime = wordCount ? Math.ceil(wordCount / 200) : null;
  
  // Get related guides from the same category that have actual pages
  const relatedGuides = Object.entries(ALL_ARTICLES)
    .filter(([slug, article]) => {
      return article.category === category && slug !== currentSlug;
    })
    .slice(0, 3);

  // Generate breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bluedreamtea.co.uk'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: 'https://bluedreamtea.co.uk/articles'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: getCategoryName(category),
        item: `https://bluedreamtea.co.uk/category/${category}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: title,
        item: fullUrl
      }
    ]
  };

  // Generate Article structured data
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl
    },
    headline: title,
    description: description,
    image: {
      '@type': 'ImageObject',
      url: featuredImage || defaultFeaturedImage,
      width: 1200,
      height: 630
    },
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://bluedreamtea.co.uk'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Blue Dream Tea UK',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bluedreamtea.co.uk/images/logo.png',
        width: 279,
        height: 40
      },
      url: 'https://bluedreamtea.co.uk'
    },
    datePublished: publishDate || new Date().toISOString(),
    dateModified: lastModified || publishDate || new Date().toISOString(),
    ...(keywords.length > 0 && { keywords: keywords.join(', ') }),
    ...(wordCount && { wordCount }),
    ...(estimatedReadingTime && { 
      timeRequired: `PT${estimatedReadingTime}M`,
      additionalProperty: {
        '@type': 'PropertyValue',
        name: 'readingTime',
        value: `${estimatedReadingTime} min read`
      }
    }),
    about: {
      '@type': 'Thing',
      name: getCategoryName(category),
      description: `Learn about ${getCategoryName(category).toLowerCase()} for blue lotus flower`
    },
    articleSection: getCategoryName(category),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Blue Dream Tea UK',
      url: 'https://bluedreamtea.co.uk'
    },
    ...(relatedGuides.length > 0 && {
      relatedLink: relatedGuides.map(([slug]) => `https://bluedreamtea.co.uk/articles/${slug}`)
    })
  };

  // Generate WebSite structured data
  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Blue Dream Tea UK',
    url: 'https://bluedreamteauk.co.uk',
    description: 'The leading supplier of blue lotus flower tea, smoking, and wellness products.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bluedreamteauk.co.uk/articles?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // Generate organization structured data
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Blue Dream Tea UK',
    url: 'https://bluedreamteauk.co.uk',
    logo: {
      '@type': 'ImageObject',
      url: 'https://bluedreamteauk.co.uk/images/logo.png'
    },
    sameAs: [
      'https://twitter.com/bluedreamtea',
      'https://instagram.com/bluedreamtea'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://bluedreamtea.co.uk/contact'
    }
  };

  useEffect(() => {
    // Get all h2 headings from the article
    const article = document.querySelector('article');
    if (!article) return;

    const headings = Array.from(article.querySelectorAll('h2'))
      .filter(heading => !heading.closest('[data-cta-buttons]')) as HTMLElement[];
    const toc: TableOfContentsItem[] = [];

    headings.forEach((heading, index) => {
      // Create an ID if none exists
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      toc.push({
        id: heading.id,
        text: heading.textContent || '',
        level: 2
      });
    });

    setTableOfContents(toc);

    // Set up intersection observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px'
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  // Get category name for breadcrumbs
  function getCategoryName(category: GuideCategory): string {
    const names: Record<GuideCategory, string> = {
      'getting-started': 'Getting Started',
      'brewing-guides': 'Brewing Guides',
      'wellness': 'Wellness & Benefits',
      'recipes': 'Tea Recipes',
      'general': 'General Information',
      'usage-guides': 'Usage Guides',
      'product-information': 'Product Information',
      'education': 'Educational Content',
      'culture-history': 'Culture & History',
      'comparison-guides': 'Product Comparisons'
    };
    return names[category] || category;
  }

  const handleTocToggle = () => {
    setIsTocOpen(!isTocOpen);
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{`${title} | Blue Dream Tea UK`}</title>
        <meta name="title" content={`${title} | Blue Dream Tea UK`} />
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={fullUrl} />
        
        {/* Keywords and Language */}
        {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
        <meta name="language" content="English" />
        <meta httpEquiv="Content-Language" content="en" />
        
        {/* Authorship and Publication */}
        <meta name="author" content={author} />
        <meta name="publisher" content="Blue Dream Tea UK" />
        <meta name="copyright" content="Blue Dream Tea UK" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:site_name" content="Blue Dream Tea UK" />
        <meta property="og:image" content={featuredImage || defaultFeaturedImage} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        
        {/* Article specific Open Graph */}
        <meta property="article:published_time" content={publishDate || new Date().toISOString()} />
        <meta property="article:modified_time" content={lastModified || publishDate || new Date().toISOString()} />
        <meta property="article:author" content={author} />
        <meta property="article:section" content={getCategoryName(category)} />
        <meta property="article:publisher" content="https://bluedreamtea.co.uk" />
        {keywords.map((keyword, index) => (
          <meta key={index} property="article:tag" content={keyword} />
        ))}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@bluedreamteauk" />
        <meta name="twitter:creator" content="@bluedreamteauk" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={featuredImage || defaultFeaturedImage} />
        <meta name="twitter:image:alt" content={title} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="application-name" content="Blue Dream Tea UK" />
        <meta name="apple-mobile-web-app-title" content="Blue Dream Tea UK" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationStructuredData)}
        </script>
        
        {/* Performance and Technical SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and Icons */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="msapplication-TileImage" content="/favicon.png" />
        
        <style>
          {`
            article h2 {
              scroll-margin-top: 2rem;
            }
          `}
        </style>
      </Helmet>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        {/* Main content area with proper spacing for fixed header */}
        <div className="pt-8 pb-16">
          {/* Breadcrumbs - Updated for subtler appearance */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-gray-400">
              <li className="flex items-center">
                <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-1.5">/</span>
                <Link to="/articles" className="hover:text-gray-600 transition-colors">Articles</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-1.5">/</span>
                <Link to={`/category/${category}`} className="hover:text-gray-600 transition-colors">
                  {getCategoryName(category)}
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-1.5">/</span>
                <span className="text-gray-600 font-medium" aria-current="page">
                  {title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Two column layout container */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main content column */}
            <article className="lg:col-span-8 xl:col-span-9" itemScope itemType="https://schema.org/Article">
              <div className="max-w-4xl">
                {/* Article Header with Metadata */}
                <header className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" itemProp="headline">
                    {title}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 mb-6" itemProp="description">
                    {description}
                  </p>
                  
                  {/* Article Meta Information - Simplified */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {(readingTime || estimatedReadingTime) && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {readingTime || `${estimatedReadingTime} min read`}
                      </span>
                    )}
                  </div>
                </header>

                {/* Mobile ToC Toggle Button */}
                <div className="lg:hidden">
                  <button
                    onClick={handleTocToggle}
                    className="mb-6 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                    aria-expanded={isTocOpen}
                    aria-controls="mobile-toc"
                  >
                    <svg
                      className={`w-5 h-5 mr-2 transform transition-transform ${isTocOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Table of Contents
                  </button>

                  {/* Mobile ToC Panel */}
                  <div
                    id="mobile-toc"
                    className={`mb-6 bg-gray-50 rounded-lg p-4 ${isTocOpen ? 'block' : 'hidden'}`}
                  >
                    <nav className="space-y-2">
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={() => setIsTocOpen(false)}
                          className={`block text-sm ${
                            activeSection === item.id
                              ? 'text-blue-600 font-medium'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Article Content */}
                <div itemProp="articleBody">
                  {children}
                </div>
                
                {/* Mobile Related Guides */}
                {relatedGuides.length > 0 && (
                  <div className="lg:hidden mt-12 pt-8 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                      Related Guides
                    </h4>
                    <div className="space-y-3">
                      {relatedGuides.map(([slug, article]) => (
                        <Link
                          key={slug}
                          to={`/articles/${slug}`}
                          className="block text-sm text-gray-600 hover:text-gray-900"
                        >
                          {article.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guide Footer - Updated with keywords */}
                <footer className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex flex-col space-y-6">
                    {/* Publication Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 space-y-2 sm:space-y-0">
                      {publishDate && (
                        <time dateTime={publishDate} itemProp="datePublished">
                          Published: {new Date(publishDate).toLocaleDateString()}
                        </time>
                      )}
                      <span itemProp="author" itemScope itemType="https://schema.org/Organization">
                        Written by <span itemProp="name">{author}</span>
                      </span>
                    </div>

                    {/* Keywords/Tags - Moved to footer */}
                    {keywords.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Related Topics</h4>
                        <div className="flex flex-wrap gap-2">
                          {keywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                              itemProp="keywords"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </footer>
              </div>
            </article>

            {/* Desktop Table of Contents Sidebar */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
              <div className="sticky top-24 overflow-y-auto max-h-[calc(100vh-8rem)]">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Table of contents
                  </h4>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm ${
                          activeSection === item.id
                            ? 'text-blue-600 font-medium'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>

                  {relatedGuides.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                        Related Guides
                      </h4>
                      <div className="space-y-3">
                        {relatedGuides.map(([slug, article]) => (
                          <Link
                            key={slug}
                            to={`/articles/${slug}`}
                            className="block text-sm text-gray-600 hover:text-gray-900"
                          >
                            {article.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideLayout; 