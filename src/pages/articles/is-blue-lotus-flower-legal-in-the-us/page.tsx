import React from 'react';
import { Helmet } from 'react-helmet';
import GuideLayout from '../GuideLayout';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';
import RecommendedProducts from '../../../components/sub-components/recommended-products';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../../constants/products';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { ProductVariant, ProductVariantGroup } from '../../../types';

const BlueLotusLegalityUS: React.FC = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  // Helper function to check if variants are grouped
  const isVariantGrouped = (variants: (ProductVariant | ProductVariantGroup)[]): variants is ProductVariantGroup[] => {
    return variants.length > 0 && 'name' in variants[0];
  };

  const getStartingPrice = (variants: (ProductVariant | ProductVariantGroup)[], fallbackPrice: number) => {
    if (!variants || variants.length === 0) return fallbackPrice;
    
    if (isVariantGrouped(variants)) {
      // For variant groups, find the size group and get the lowest price
      const sizeGroup = variants.find(group => group.name === 'size');
      if (sizeGroup && sizeGroup.options.length > 0) {
        const lowestPriceOption = sizeGroup.options.reduce((lowest, option) => 
          (option.salePrice || option.price) < (lowest.salePrice || lowest.price) ? option : lowest
        );
        return lowestPriceOption.salePrice || lowestPriceOption.price;
      }
      return fallbackPrice;
    } else {
      // For simple variants, get the lowest price
      const simpleVariants = variants as ProductVariant[];
      const lowestPriceVariant = simpleVariants.reduce((lowest, variant) => 
        (variant.salePrice || variant.price) < (lowest.salePrice || lowest.price) ? variant : lowest
      );
      return lowestPriceVariant.salePrice || lowestPriceVariant.price;
    }
  };

  // Generate schema markup for the article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Blue Lotus Flower Legal in the US? Complete Legal Guide',
    description: 'Understand the legal status of blue lotus flower in the United States. Learn about federal and state regulations, purchasing guidelines, and important considerations.',
    image: '/images/articles/blue-lotus-legal-guide.jpg',
    datePublished: '2025-01-15T10:00:00Z',
    dateModified: '2025-01-15T10:00:00Z',
    author: {
      '@type': 'Organization',
      name: 'Blue Dream Tea UK Team',
      url: 'https://bluedreamtea.co.uk'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Blue Dream Tea UK',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bluedreamtea.co.uk/images/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://bluedreamtea.co.uk/articles/is-blue-lotus-flower-legal-in-the-us'
    }
  };

  // Generate schema markup for recommended products
  const recommendedProductsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: Object.entries(PRODUCTS)
      .filter(([key]) => [
        'blue-lotus-flower-smoking-blend',
        'blue-lotus-flower-pre-rolls',
        'blue-lotus-flower-packs'
      ].includes(key))
      .map(([key, product], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.title,
          description: product.description,
          image: product.images?.main,
          offers: {
            '@type': 'Offer',
            price: product.salePrice || product.price,
            priceCurrency: 'GBP',
            availability: 'https://schema.org/InStock',
            url: `https://bluedreamtea.co.uk/products/${key}`
          }
        }
      }))
  };

  // Generate breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': 'https://bluedreamtea.co.uk',
          name: 'Home'
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': 'https://bluedreamtea.co.uk/articles',
          name: 'Articles'
        }
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@id': 'https://bluedreamtea.co.uk/articles/is-blue-lotus-flower-legal-in-the-us',
          name: 'Is Blue Lotus Flower Legal in the US? Complete Legal Guide'
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Is Blue Lotus Flower Legal in the US? Complete Legal Guide | Blue Dream Tea UK</title>
        <meta name="description" content="Understand the legal status of blue lotus flower in the United States. Learn about federal and state regulations, purchasing guidelines, and important considerations." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Is Blue Lotus Flower Legal in the US? Complete Legal Guide" />
        <meta property="og:description" content="Understand the legal status of blue lotus flower in the United States. Learn about federal and state regulations, purchasing guidelines, and important considerations." />
        <meta property="og:image" content="/images/articles/blue-lotus-legal-guide.jpg" />
        <meta property="og:url" content="https://bluedreamtea.co.uk/articles/is-blue-lotus-flower-legal-in-the-us" />
        <meta property="article:published_time" content="2025-01-15T10:00:00Z" />
        <meta property="article:modified_time" content="2025-01-15T10:00:00Z" />
        <meta property="article:author" content="Blue Dream Tea UK Team" />
        <meta property="article:section" content="Education" />
        <meta property="article:tag" content="blue lotus flower" />
        <meta property="article:tag" content="smoking blue lotus" />
        <meta property="article:tag" content="herbal smoking blend" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Is Blue Lotus Flower Legal in the US? Complete Legal Guide" />
        <meta name="twitter:description" content="Understand the legal status of blue lotus flower in the United States. Learn about federal and state regulations, purchasing guidelines, and important considerations." />
        <meta name="twitter:image" content="/images/articles/blue-lotus-legal-guide.jpg" />
        
        {/* Additional SEO Tags */}
        <link rel="canonical" href="https://bluedreamtea.co.uk/articles/is-blue-lotus-flower-legal-in-the-us" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(recommendedProductsSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <GuideLayout
        title="Is Blue Lotus Flower Legal in the US? Complete Legal Guide"
        description="Understand the legal status of blue lotus flower in the United States. Learn about federal and state regulations, purchasing guidelines, and important considerations."
        publishDate="2025-01-15T10:00:00Z"
        lastModified="2025-01-15T10:00:00Z"
        category="education"
        featuredImage="/images/articles/blue-lotus-legal-guide.jpg"
        keywords={[
          'blue lotus legal status',
          'blue lotus US law',
          'legal blue lotus',
          'blue lotus regulations',
          'buying blue lotus US',
          'blue lotus flower legality',
          'US herbal laws',
          'botanical regulations'
        ]}
        wordCount={2800}
        readingTime="14 min read"
      >
        <RichText
          heading="Understanding Blue Lotus Flower Legal Status in the US"
          content={
            <div>
              <p>
                Blue lotus flower (Nymphaea Caerulea) occupies a unique legal position in the United States. Learn more about this remarkable plant in our <Link to="/articles/what-is-blue-lotus-flower" className="text-blue-600 hover:text-blue-800">comprehensive guide</Link>. As a natural botanical product with historical significance, its legal status can sometimes seem complex to navigate.
              </p>
              <p>
                Whether you're a consumer, retailer, or simply interested in understanding the regulations, this guide will provide clear, accurate information about blue lotus flower's legal status across the United States. For information about its effects and uses, see our guide on <Link to="/articles/blue-lotus-flower-effects" className="text-blue-600 hover:text-blue-800">Blue Lotus effects</Link>.
              </p>
            </div>
          }
        />

        <RichText
          heading="Federal Legal Status"
          content={
            <div>
              <p>
                At the federal level, blue lotus flower is not a controlled substance in the United States. This means it's legal to purchase, possess, and use as a botanical product or dietary supplement.
              </p>
              
              <h3 className="mt-6 mb-4 text-xl font-semibold">Key Federal Regulations:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Not scheduled under the Controlled Substances Act</li>
                <li>Regulated as a botanical product by the FDA</li>
                <li>Legal for import and export with proper documentation</li>
                <li>Subject to standard customs regulations</li>
                <li>Must comply with dietary supplement guidelines if sold as such</li>
              </ul>

              <h3 className="mt-6 mb-4 text-xl font-semibold">FDA Guidelines:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Product labeling requirements</li>
                <li>Quality control standards</li>
                <li>Manufacturing practice regulations</li>
                <li>Marketing claim restrictions</li>
                <li>Safety reporting requirements</li>
              </ul>
            </div>
          }
          className="mb-8"
        />

        <RichText
          heading="State-Level Regulations"
          content={
            <div>
              <p>
                While blue lotus flower is legal at the federal level, some states may have specific regulations or restrictions. Understanding state-specific laws is crucial for compliance.
              </p>

              <h3 className="mt-6 mb-4 text-xl font-semibold">State Variations:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Most states follow federal guidelines</li>
                <li>Some states have additional labeling requirements</li>
                <li>Age restrictions may vary by state</li>
                <li>Retail license requirements differ</li>
                <li>Local ordinances may apply</li>
              </ul>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Common State Requirements:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Business licensing for retailers</li>
                <li>Product registration in some jurisdictions</li>
                <li>Compliance with state food and drug laws</li>
                <li>Local health department oversight</li>
                <li>Sales tax collection and reporting</li>
              </ul>
            </div>
          }
          className="mb-8"
        />

        <RecommendedProducts
          heading="Legal Blue Lotus Products"
          description="Explore our selection of quality, legally compliant Blue Lotus products:"
          productSlugs={[
            'blue-lotus-flower-tea-bags',
            'blue-lotus-flower-tea-cut',
            'blue-lotus-flower-packs'
          ]}
        />

        <RichText
          heading="Safety and Compliance"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Quality Standards</h3>
              <p>Important considerations:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Third-party testing</li>
                <li>Product purity</li>
                <li>Proper labeling</li>
                <li>Source verification</li>
                <li>Safety documentation</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Best Practices</h3>
              <p>Guidelines for consumers:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Verify vendor legitimacy</li>
                <li>Check product certifications</li>
                <li>Review lab reports</li>
                <li>Understand usage guidelines</li>
                <li>Keep purchase records</li>
              </ul>

              <p className="mt-4">For more information about safe usage, read our guide on <Link to="/articles/how-to-use-blue-lotus-flower" className="text-blue-600 hover:text-blue-800">how to use Blue Lotus</Link>.</p>
            </div>
          }
        />

        <FAQComponent
          title="Frequently Asked Questions About Blue Lotus Legality"
          faqs={[
            {
              question: "Is blue lotus flower legal to buy in the US?",
              answer: "Yes, blue lotus flower is legal to purchase in the United States at the federal level. It's sold as a botanical product and is widely available from reputable suppliers. However, always verify your state's specific regulations."
            },
            {
              question: "Can I legally import blue lotus to the US?",
              answer: "Yes, you can legally import blue lotus flower into the US, provided you comply with customs regulations and obtain any necessary import documentation. Commercial importers may need additional permits."
            },
            {
              question: "Are there age restrictions for buying blue lotus?",
              answer: "While there's no federal age restriction, some states or retailers may impose age limits, typically 18 or 21 years. Always check local regulations and retailer policies."
            },
            {
              question: "Can I sell blue lotus products in my store?",
              answer: "Yes, you can sell blue lotus products, but you must comply with federal and state regulations regarding botanical products. This includes proper labeling, quality control, and any required business licenses."
            },
            {
              question: "Do I need a special license to buy blue lotus?",
              answer: "No special license is required for personal purchase of blue lotus flower. However, businesses selling blue lotus may need appropriate retail or dietary supplement licenses."
            },
            {
              question: "What forms of blue lotus are legal?",
              answer: "All traditional forms of blue lotus (dried flowers, tea, extracts) are legal when sold as botanical products. However, products making medical claims must comply with FDA regulations."
            },
            {
              question: "Can I grow blue lotus in the US?",
              answer: "Yes, growing blue lotus is legal in the US. However, check local regulations and zoning laws if planning outdoor cultivation. See our growing guides for more information."
            },
            {
              question: "Are there restrictions on shipping blue lotus?",
              answer: "Domestic shipping is generally unrestricted. International shipping may require customs documentation and compliance with destination country regulations."
            },
            {
              question: "How do US regulations compare to other countries?",
              answer: "US regulations are generally more permissive than some countries. Blue lotus is legal as a botanical product, while some nations may have stricter controls."
            },
            {
              question: "What should I look for in legal documentation?",
              answer: "Look for proper labeling, ingredient disclosure, batch testing results, and any required regulatory compliance statements. Reputable vendors will provide necessary documentation."
            }
          ]}
        />

        <CTAButtons
          title="Shop Our Legal Blue Lotus Products"
          description="Explore our selection of premium, legally compliant blue lotus products."
          buttons={[
            {
              label: "Browse Blue Lotus Products",
              href: "/products",
              variant: "primary",
              ariaLabel: "View our collection of legal blue lotus products"
            },
            {
              label: "Learn More About Blue Lotus",
              href: "/articles/what-is-blue-lotus-flower",
              variant: "secondary",
              ariaLabel: "Read our complete guide about blue lotus flower"
            }
          ]}
          align="center"
          className="mt-12"
          addStructuredData={true}
        />
      </GuideLayout>
    </>
  );
};

export default BlueLotusLegalityUS; 