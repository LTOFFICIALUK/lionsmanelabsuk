import React from 'react';
import { Helmet } from 'react-helmet';
import GuideLayout from '../GuideLayout';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';
import RecommendedProducts from '../../../components/sub-components/recommended-products';
import { Link } from 'react-router-dom';

const BlueLotusLegalityUK: React.FC = () => {
  // Generate schema markup for the article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Blue Lotus Flower Legal in the UK? Complete Legal Guide',
    description: 'Understand the legal status of blue lotus flower in the United Kingdom. Learn about current regulations, purchasing guidelines, and important considerations.',
    image: '/images/articles/blue-lotus-legal-guide.jpg',
    datePublished: '2024-03-20T10:00:00Z',
    dateModified: '2024-03-20T10:00:00Z',
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
      '@id': 'https://bluedreamtea.co.uk/articles/is-blue-lotus-flower-legal-in-the-uk'
    }
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
          '@id': 'https://bluedreamtea.co.uk/articles/is-blue-lotus-flower-legal-in-the-uk',
          name: 'Is Blue Lotus Flower Legal in the UK? Complete Legal Guide'
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Is Blue Lotus Flower Legal in the UK? Complete Legal Guide | Blue Dream Tea UK</title>
        <meta name="description" content="Understand the legal status of blue lotus flower in the United Kingdom. Learn about current regulations, purchasing guidelines, and important considerations." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Is Blue Lotus Flower Legal in the UK? Complete Legal Guide" />
        <meta property="og:description" content="Understand the legal status of blue lotus flower in the United Kingdom. Learn about current regulations, purchasing guidelines, and important considerations." />
        <meta property="og:image" content="/images/articles/blue-lotus-legal-guide.jpg" />
        <meta property="og:url" content="https://bluedreamtea.co.uk/articles/is-blue-lotus-flower-legal-in-the-uk" />
        <meta property="article:published_time" content="2024-03-20T10:00:00Z" />
        <meta property="article:modified_time" content="2024-03-20T10:00:00Z" />
        <meta property="article:author" content="Blue Dream Tea UK Team" />
        <meta property="article:section" content="Education" />
        <meta property="article:tag" content="blue lotus flower" />
        <meta property="article:tag" content="UK law" />
        <meta property="article:tag" content="legal status" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Is Blue Lotus Flower Legal in the UK? Complete Legal Guide" />
        <meta name="twitter:description" content="Understand the legal status of blue lotus flower in the United Kingdom. Learn about current regulations, purchasing guidelines, and important considerations." />
        <meta name="twitter:image" content="/images/articles/blue-lotus-legal-guide.jpg" />
        
        {/* Additional SEO Tags */}
        <link rel="canonical" href="https://bluedreamtea.co.uk/articles/is-blue-lotus-flower-legal-in-the-uk" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <GuideLayout
        title="Is Blue Lotus Flower Legal in the UK? Complete Legal Guide"
        description="Understand the legal status of blue lotus flower in the United Kingdom. Learn about current regulations, purchasing guidelines, and important considerations."
        publishDate="2024-03-20T10:00:00Z"
        lastModified="2024-03-20T10:00:00Z"
        category="education"
        featuredImage="/images/articles/blue-lotus-legal-guide.jpg"
        keywords={[
          'blue lotus legal status UK',
          'blue lotus UK law',
          'legal blue lotus UK',
          'blue lotus regulations UK',
          'buying blue lotus UK',
          'blue lotus flower legality',
          'UK herbal laws',
          'botanical regulations UK'
        ]}
        wordCount={2500}
        readingTime="12 min read"
      >
        <RichText
          heading="Understanding Blue Lotus Flower Legal Status in the UK"
          content={
            <div>
              <p>
                Blue lotus flower (Nymphaea Caerulea) has a unique legal position in the United Kingdom. Learn more about this remarkable plant in our <Link to="/articles/what-is-blue-lotus-flower" className="text-blue-600 hover:text-blue-800">comprehensive guide</Link>. As a natural botanical product with historical significance, it's important to understand its current legal status in the UK.
              </p>
              <p>
                Whether you're a consumer, retailer, or simply interested in understanding the regulations, this guide will provide clear, accurate information about blue lotus flower's legal status in the United Kingdom. For information about its effects and uses, see our guide on <Link to="/articles/blue-lotus-flower-effects" className="text-blue-600 hover:text-blue-800">Blue Lotus effects</Link>.
              </p>
            </div>
          }
        />

        <RichText
          heading="Current Legal Status in the UK"
          content={
            <div>
              <p>
                In the United Kingdom, blue lotus flower is currently legal to purchase, possess, and use as a botanical product or food supplement. It is not classified as a controlled substance under the Misuse of Drugs Act 1971 or its subsequent amendments.
              </p>
              
              <h3 className="mt-6 mb-4 text-xl font-semibold">Key UK Regulations:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Not listed in the Misuse of Drugs Act 1971</li>
                <li>Regulated under food safety and supplement regulations</li>
                <li>Subject to Trading Standards oversight</li>
                <li>Must comply with UK food safety standards</li>
                <li>Import/export regulations apply</li>
              </ul>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Regulatory Framework:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Food Safety Act 1990</li>
                <li>Food Supplements Regulations</li>
                <li>General Food Law Regulation</li>
                <li>Consumer Protection Regulations</li>
                <li>Product Safety Regulations</li>
              </ul>
            </div>
          }
          className="mb-8"
        />

        <RichText
          heading="Post-Brexit Considerations"
          content={
            <div>
              <p>
                Following Brexit, some regulations regarding herbal products and supplements have been updated. Understanding these changes is crucial for both consumers and retailers.
              </p>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Current Framework:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>UK-specific regulations now apply</li>
                <li>UKCA marking requirements</li>
                <li>Updated import procedures</li>
                <li>Modified labelling requirements</li>
                <li>New compliance standards</li>
              </ul>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Key Changes:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>UK Food Standards Agency oversight</li>
                <li>Updated safety assessments</li>
                <li>Modified documentation requirements</li>
                <li>New import/export procedures</li>
                <li>Revised quality standards</li>
              </ul>
            </div>
          }
          className="mb-8"
        />

        <RecommendedProducts
          heading="Legal Blue Lotus Products in the UK"
          description="Explore our selection of quality, UK-compliant Blue Lotus products:"
          productSlugs={[
            'blue-lotus-flower-tea-bags',
            'blue-lotus-flower-tea-cut',
            'blue-lotus-flower'
          ]}
        />

        <RichText
          heading="Safety and Compliance in the UK Market"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Quality Standards</h3>
              <p>Important considerations for UK consumers:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Independent laboratory testing</li>
                <li>Product purity verification</li>
                <li>UK-compliant labelling</li>
                <li>Traceable sourcing</li>
                <li>Safety documentation</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Best Practices</h3>
              <p>Guidelines for UK consumers:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Purchase from registered UK suppliers</li>
                <li>Verify product certifications</li>
                <li>Check laboratory analysis reports</li>
                <li>Follow usage guidelines</li>
                <li>Maintain purchase records</li>
              </ul>

              <p className="mt-4">For more information about safe usage, read our guide on <Link to="/articles/how-to-use-blue-lotus-flower" className="text-blue-600 hover:text-blue-800">how to use Blue Lotus</Link>.</p>
            </div>
          }
        />

        <FAQComponent
          title="Frequently Asked Questions About Blue Lotus Legality in the UK"
          faqs={[
            {
              question: "Is blue lotus flower legal to buy in the UK?",
              answer: "Yes, blue lotus flower is legal to purchase in the UK. It's sold as a botanical product and food supplement, and is not classified as a controlled substance under UK law."
            },
            {
              question: "Can I legally import blue lotus to the UK?",
              answer: "Yes, you can legally import blue lotus flower into the UK, provided you comply with current import regulations and obtain any necessary documentation. Commercial importers may need additional permits."
            },
            {
              question: "Are there age restrictions for buying blue lotus in the UK?",
              answer: "While there's no specific legal age restriction, most retailers implement an 18+ policy for purchasing blue lotus products as a matter of best practice."
            },
            {
              question: "Do I need a license to sell blue lotus products in the UK?",
              answer: "While no specific license is required for blue lotus, businesses must comply with general retail regulations, food safety standards, and trading standards requirements."
            },
            {
              question: "What forms of blue lotus are legal in the UK?",
              answer: "All traditional forms of blue lotus (dried flowers, tea, extracts) are legal when sold as botanical products or food supplements, provided they comply with UK food safety regulations."
            },
            {
              question: "Can I grow blue lotus in the UK?",
              answer: "Yes, growing blue lotus is legal in the UK. However, check local planning regulations if considering outdoor cultivation, especially for water features."
            },
            {
              question: "What documentation should UK sellers provide?",
              answer: "UK sellers should provide product safety information, ingredients lists, usage guidelines, and any relevant certification or testing documentation."
            },
            {
              question: "How has Brexit affected blue lotus regulations?",
              answer: "Brexit has led to some changes in import procedures and compliance requirements, but the basic legal status remains unchanged. UK-specific regulations now apply."
            },
            {
              question: "Are there restrictions on shipping blue lotus within the UK?",
              answer: "Domestic shipping is generally unrestricted, though proper packaging and labeling requirements must be followed. International shipping may require additional documentation."
            },
            {
              question: "What should I look for when buying blue lotus in the UK?",
              answer: "Look for products with clear labeling, ingredient disclosure, batch testing results, and compliance with UK food safety standards. Purchase from reputable UK-based suppliers."
            }
          ]}
        />

        <CTAButtons
          title="Shop Our UK-Legal Blue Lotus Products"
          description="Explore our selection of premium, UK-compliant blue lotus products."
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

export default BlueLotusLegalityUK; 