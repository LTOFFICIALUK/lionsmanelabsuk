import React from 'react';
import { Helmet } from 'react-helmet';
import GuideLayout from '../GuideLayout';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import HowToComponent from '../../../components/sub-components/how-to-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';
import RecommendedProducts from '../../../components/sub-components/recommended-products';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../../constants/products';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { ProductVariant, ProductVariantGroup } from '../../../types';

const VapingBlueLotus: React.FC = () => {
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
    headline: 'Can You Vape Blue Lotus? Complete Guide to Vaping Blue Lotus Flower',
    description: 'Learn everything about vaping blue lotus flower, including safety considerations, proper methods, and what to expect. Expert advice on vaporizing this ancient botanical.',
    image: '/images/articles/blue-lotus-vaping-guide.jpg',
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
      '@id': 'https://bluedreamtea.co.uk/articles/can-you-vape-blue-lotus'
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
        'blue-lotus-flower'
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
          '@id': 'https://bluedreamtea.co.uk/articles/can-you-vape-blue-lotus',
          name: 'Can You Vape Blue Lotus? Complete Guide to Vaping Blue Lotus Flower'
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Can You Vape Blue Lotus? Complete Guide to Vaping Blue Lotus Flower | Blue Dream Tea UK</title>
        <meta name="description" content="Learn everything about vaping blue lotus flower, including safety considerations, proper methods, and what to expect. Expert advice on vaporizing this ancient botanical." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Can You Vape Blue Lotus? Complete Guide to Vaping Blue Lotus Flower" />
        <meta property="og:description" content="Learn everything about vaping blue lotus flower, including safety considerations, proper methods, and what to expect. Expert advice on vaporizing this ancient botanical." />
        <meta property="og:image" content="/images/articles/blue-lotus-vaping-guide.jpg" />
        <meta property="og:url" content="https://bluedreamtea.co.uk/articles/can-you-vape-blue-lotus" />
        <meta property="article:published_time" content="2025-01-15T10:00:00Z" />
        <meta property="article:modified_time" content="2025-01-15T10:00:00Z" />
        <meta property="article:author" content="Blue Dream Tea UK Team" />
        <meta property="article:section" content="Education" />
        <meta property="article:tag" content="blue lotus flower" />
        <meta property="article:tag" content="smoking blue lotus" />
        <meta property="article:tag" content="herbal smoking blend" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Can You Vape Blue Lotus? Complete Guide to Vaping Blue Lotus Flower" />
        <meta name="twitter:description" content="Learn everything about vaping blue lotus flower, including safety considerations, proper methods, and what to expect. Expert advice on vaporizing this ancient botanical." />
        <meta name="twitter:image" content="/images/articles/blue-lotus-vaping-guide.jpg" />
        
        {/* Additional SEO Tags */}
        <link rel="canonical" href="https://bluedreamtea.co.uk/articles/can-you-vape-blue-lotus" />
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
        title="Can You Vape Blue Lotus? Complete Guide to Vaping Blue Lotus Flower"
        description="Learn everything about vaping blue lotus flower, including safety considerations, proper methods, and what to expect. Expert advice on vaporizing this ancient botanical."
        publishDate="2025-01-15T10:00:00Z"
        lastModified="2025-01-15T10:00:00Z"
        category="usage-guides"
        featuredImage="/images/articles/blue-lotus-vaping-guide.jpg"
        keywords={[
          'vaping blue lotus',
          'blue lotus vaporizer',
          'vape blue lotus flower',
          'blue lotus vapor',
          'vaporizing herbs',
          'herbal vaping',
          'blue lotus effects',
          'vaporizer temperature'
        ]}
        wordCount={2800}
        readingTime="14 min read"
      >
        <RichText
          heading="Vaping Blue Lotus Flower: An Introduction"
          content={
            <div>
              <p>
                As alternative consumption methods gain popularity, many people are asking whether blue lotus flower (Nymphaea Caerulea) can be vaporized. This comprehensive guide explores the practice of vaping blue lotus, including proper techniques, safety considerations, and what to expect. For a complete overview of Blue Lotus, see our <Link to="/articles/what-is-blue-lotus-flower" className="text-blue-600 hover:text-blue-800">introduction to Blue Lotus</Link>.
              </p>
              <p>
                Vaporizing herbs has become increasingly popular as a gentler alternative to traditional smoking methods. Understanding the proper approach to vaping blue lotus can help ensure a safe and enjoyable experience. For more information about smoking methods, check our guide on <Link to="/articles/smoking-blue-lotus-flower-a-users-guide" className="text-blue-600 hover:text-blue-800">smoking Blue Lotus</Link>.
              </p>
              <p>In this detailed guide, you'll learn about:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Proper vaporizing techniques for blue lotus</li>
                <li>Optimal temperature settings</li>
                <li>Equipment selection and preparation</li>
                <li>Safety considerations and best practices</li>
                <li>Effects and expectations</li>
                <li>Common mistakes to avoid</li>
              </ul>
            </div>
          }
          className="mb-8"
          addStructuredData={true}
        />

        <RichText
          heading="Vaporizing Methods and Equipment"
          content={
            <div>
              <p>
                Choosing the right vaporizer and understanding proper techniques are crucial for successfully vaping blue lotus flower. Different methods and devices can significantly impact your experience.
              </p>
              
              <h3 className="mt-6 mb-4 text-xl font-semibold">Types of Vaporizers:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Desktop vaporizers for home use</li>
                <li>Portable dry herb vaporizers</li>
                <li>Convection vs. conduction heating</li>
                <li>Temperature control capabilities</li>
                <li>Material compatibility considerations</li>
              </ul>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Preparation Methods:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Proper grinding techniques</li>
                <li>Optimal packing density</li>
                <li>Chamber size considerations</li>
                <li>Material moisture content</li>
                <li>Cleaning and maintenance</li>
              </ul>
            </div>
          }
          className="mb-8"
        />

        <RichText
          heading="Temperature and Timing Guidelines"
          content={
            <div>
              <p>
                Temperature control is crucial when vaping blue lotus flower. Different compounds are released at various temperatures, affecting both the experience and efficiency.
              </p>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Temperature Ranges:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Low temperature (315-350°F): Mild effects</li>
                <li>Medium temperature (350-385°F): Balanced experience</li>
                <li>High temperature (385-420°F): Stronger effects</li>
                <li>Avoiding combustion temperatures</li>
                <li>Device-specific adjustments</li>
              </ul>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Session Guidelines:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Optimal session duration</li>
                <li>Pacing between draws</li>
                <li>Material replacement timing</li>
                <li>Cool-down periods</li>
                <li>Device maintenance intervals</li>
              </ul>
            </div>
          }
          className="mb-8"
        />

        <RecommendedProducts
          heading="Recommended Products From Blue Dream Tea"
          description="Explore our selection of Blue Lotus products suitable for vaporizing:"
          productSlugs={[
            'blue-lotus-flower-smoking-blend',
            'blue-lotus-flower-pre-rolls',
            'blue-lotus-flower'
          ]}
        />

        <FAQComponent
          title="Frequently Asked Questions About Vaping Blue Lotus"
          faqs={[
            {
              question: "Is it safe to vape blue lotus flower?",
              answer: "When done properly with appropriate equipment and temperatures, vaping blue lotus flower can be a gentle alternative to smoking. However, it's important to use quality materials and follow proper temperature guidelines to avoid potential risks."
            },
            {
              question: "What temperature should I vape blue lotus at?",
              answer: "The optimal vaping temperature for blue lotus typically ranges from 350-385°F (175-195°C). Start at lower temperatures and adjust based on personal preference. Avoid temperatures above 420°F (215°C) to prevent combustion."
            },
            {
              question: "Which vaporizer is best for blue lotus?",
              answer: "Dry herb vaporizers with precise temperature control work best for blue lotus. Look for devices with good temperature range, proper air flow, and easy cleaning. Both portable and desktop vaporizers can be suitable."
            },
            {
              question: "How should I prepare blue lotus for vaping?",
              answer: "Gently grind dried blue lotus petals to a medium consistency - not too fine or too coarse. Ensure the material is properly dried but not overly brittle. Remove any stems or tough plant material before vaping."
            },
            {
              question: "How long does a vaping session last?",
              answer: "A typical blue lotus vaping session might last 5-15 minutes, depending on your device and preference. The material should be replaced when vapor production diminishes or the taste changes significantly."
            },
            {
              question: "Can I mix blue lotus with other herbs for vaping?",
              answer: "Yes, blue lotus can be combined with other vaporizer-friendly herbs. However, ensure all materials are compatible with vaping and consider how different vaporization temperatures might affect the blend."
            },
            {
              question: "How do the effects compare to other consumption methods?",
              answer: "Vaping typically produces milder, more controlled effects compared to smoking. The onset is usually quicker than tea but gentler than smoking. Effects can be more easily modulated through temperature control."
            },
            {
              question: "How often should I clean my vaporizer when using blue lotus?",
              answer: "Clean your vaporizer after every 3-5 sessions to maintain optimal performance and flavor. Regular cleaning prevents residue buildup and ensures consistent vapor quality."
            },
            {
              question: "Are there any contraindications for vaping blue lotus?",
              answer: "Those with respiratory conditions, pregnant individuals, or people taking certain medications should consult healthcare providers before vaping blue lotus. Learn more about safety in our side effects guide."
            },
            {
              question: "What's the best way to store blue lotus for vaping?",
              answer: "Store in an airtight container away from light and moisture. Properly stored material maintains potency and ensures optimal vaping experience. Avoid plastic containers that might affect flavor."
            }
          ]}
          className="mb-8"
          showLastUpdated={true}
        />

        <CTAButtons
          title="Explore Our Blue Lotus Collection"
          description="Discover our premium blue lotus products suitable for various consumption methods."
          buttons={[
            {
              label: "Shop Blue Lotus Products",
              href: "/products",
              variant: "primary",
              ariaLabel: "Browse our collection of blue lotus products"
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

export default VapingBlueLotus; 