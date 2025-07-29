import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import GuideLayout from '../GuideLayout';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';
import RecommendedProducts from '../../../components/sub-components/recommended-products';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../../constants/products';

const GrowingBlueLotus: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'A Beginner’s Guide to Growing Blue Lotus Flower at Home',
    description: 'Learn how to grow Blue Lotus Flower (Nymphaea caerulea) at home. Discover step-by-step instructions, care tips, and how to harvest for wellness and spiritual use.',
    image: '/images/articles/growing-blue-lotus.jpg',
    datePublished: '2025-01-22T10:00:00Z',
    dateModified: '2025-01-22T10:00:00Z',
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
      '@id': 'https://bluedreamtea.co.uk/articles/growing-blue-lotus-at-home'
    }
  };

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
          '@id': 'https://bluedreamtea.co.uk/articles/growing-blue-lotus-at-home',
          name: 'A Beginner’s Guide to Growing Blue Lotus Flower at Home'
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>A Beginner’s Guide to Growing Blue Lotus Flower at Home</title>
        <meta name="description" content="Learn how to grow Blue Lotus Flower (Nymphaea caerulea) at home. Discover step-by-step instructions, care tips, and how to harvest for wellness and spiritual use." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="A Beginner’s Guide to Growing Blue Lotus Flower at Home" />
        <meta property="og:description" content="Learn how to grow Blue Lotus Flower (Nymphaea caerulea) at home. Discover step-by-step instructions, care tips, and how to harvest for wellness and spiritual use." />
        <meta property="og:image" content="/images/articles/growing-blue-lotus.jpg" />
        <meta property="og:url" content="https://bluedreamtea.co.uk/articles/growing-blue-lotus-at-home" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="A Beginner’s Guide to Growing Blue Lotus Flower at Home" />
        <meta name="twitter:description" content="Learn how to grow Blue Lotus Flower (Nymphaea caerulea) at home. Discover step-by-step instructions, care tips, and how to harvest for wellness and spiritual use." />
        <meta name="twitter:image" content="/images/articles/growing-blue-lotus.jpg" />
        <link rel="canonical" href="https://bluedreamtea.co.uk/articles/growing-blue-lotus-at-home" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <GuideLayout
        title="A Beginner's Guide to Growing Blue Lotus Flower at Home"
        description="Learn how to grow Blue Lotus Flower (Nymphaea caerulea) at home. Discover step-by-step instructions, care tips, and how to harvest for wellness and spiritual use."
        publishDate="2025-01-22T10:00:00Z"
        lastModified="2025-01-22T10:00:00Z"
        category="usage-guides"
        featuredImage="/images/articles/growing-blue-lotus.jpg"
        keywords={[
          'how to grow blue lotus',
          'growing blue lotus in containers',
          'blue lotus pond care',
          'planting blue lotus seeds',
          'blue lotus gardening tips',
          'blue lotus home cultivation',
          'blue lotus growing conditions',
          'nymphaea caerulea planting guide'
        ]}
        wordCount={2200}
        readingTime="11 min read"
      >
        <RichText
          heading="A Beginner's Guide to Growing Blue Lotus Flower at Home"
          content={<div>
            <p><strong>Blue Lotus Flower (Nymphaea caerulea)</strong> is a stunning and spiritually significant plant that can be grown successfully at home. Learn more about its historical significance in our <Link to="/articles/blue-lotus-flower-history" className="text-blue-600 hover:text-blue-800">historical guide</Link>. This guide walks you through choosing the right environment, preparing seeds, caring for your plant, and harvesting blooms for personal use.</p>
            <p>Whether you grow in a pond, container, or aquarium, Blue Lotus rewards your care with beauty and wellness benefits. For region-specific guidance, check our guides for <Link to="/articles/can-you-grow-blue-lotus-flower-in-the-uk" className="text-blue-600 hover:text-blue-800">growing in the UK</Link> or <Link to="/articles/can-you-grow-blue-lotus-flower-in-the-us" className="text-blue-600 hover:text-blue-800">growing in the US</Link>.</p>
          </div>}
        />

        <RichText
          heading="Getting Started"
          content={<div>
            <h3 className="text-xl font-semibold mb-4">Essential Equipment</h3>
            <p>Basic supplies needed:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Growing container or pond</li>
              <li>Aquatic soil or loam</li>
              <li>Water treatment supplies</li>
              <li>Temperature control</li>
              <li>Lighting equipment</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 mt-6">Growing Environment</h3>
            <p>Optimal conditions include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full sun exposure</li>
              <li>Warm water (70-85°F)</li>
              <li>Proper water depth</li>
              <li>Good circulation</li>
              <li>Protected location</li>
            </ul>
          </div>}
        />

        <RichText
          heading="Planting and Care"
          content={<div>
            <h3 className="text-xl font-semibold mb-4">Seed Preparation</h3>
            <p>Steps for success:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Scarification process</li>
              <li>Pre-soaking method</li>
              <li>Germination timing</li>
              <li>Temperature control</li>
              <li>Light exposure</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 mt-6">Ongoing Maintenance</h3>
            <p>Regular care tasks:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Water quality checks</li>
              <li>Fertilization schedule</li>
              <li>Pest monitoring</li>
              <li>Pruning and cleaning</li>
              <li>Growth tracking</li>
            </ul>
          </div>}
        />

        <RecommendedProducts
          heading="Essential Growing Supplies"
          description="Get started with our selection of quality Blue Lotus products:"
          productSlugs={[
            'blue-lotus-flower-packs',
            'blue-lotus-flower-tea-cut'
          ]}
        />

        <RichText
          heading="Harvesting and Use"
          content={<div>
            <h3 className="text-xl font-semibold mb-4">Harvesting Methods</h3>
            <p>Best practices for collection:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Timing considerations</li>
              <li>Proper techniques</li>
              <li>Tool selection</li>
              <li>Storage preparation</li>
              <li>Sustainable practices</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 mt-6">Processing and Storage</h3>
            <p>After harvest care:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Drying methods</li>
              <li>Storage conditions</li>
              <li>Quality checks</li>
              <li>Usage preparation</li>
              <li>Long-term preservation</li>
            </ul>

            <p className="mt-4">For guidance on using your harvested Blue Lotus, see our guide on <Link to="/articles/how-to-use-blue-lotus-flower" className="text-blue-600 hover:text-blue-800">Blue Lotus usage</Link>.</p>
          </div>}
        />

        <FAQComponent
          title="FAQs About Growing Blue Lotus"
          faqs={[
            {
              question: "How long does it take to grow Blue Lotus from seed?",
              answer: "From seed to first bloom typically takes 4-6 months under optimal conditions. The plant needs warm temperatures and plenty of sunlight for best growth."
            },
            {
              question: "Can I grow Blue Lotus indoors?",
              answer: "Yes, Blue Lotus can be grown indoors in containers or aquariums with proper lighting and temperature control. Ensure adequate light and maintain water temperature between 70-85°F."
            },
            {
              question: "What's the best container size for growing Blue Lotus?",
              answer: "Start with containers at least 12 inches deep and 18 inches wide. Larger containers provide more stability and room for growth. Ensure proper drainage and water depth."
            },
            {
              question: "How often should I fertilize Blue Lotus?",
              answer: "During the growing season (spring and summer), fertilize every 2-4 weeks with aquatic plant fertilizer. Reduce or stop fertilization during dormant periods."
            },
            {
              question: "What are common growing problems?",
              answer: "Common issues include algae growth, insufficient light, temperature fluctuations, and pest problems. Regular monitoring and maintenance help prevent most issues."
            },
            {
              question: "When should I harvest Blue Lotus flowers?",
              answer: "Harvest flowers in the morning when fully opened, typically 3-4 days after they first bloom. This ensures optimal potency and easier processing."
            },
            {
              question: "How do I prepare the growing medium?",
              answer: "Use heavy loam or aquatic soil mixed with clay. Avoid regular potting soil as it will float. Top with gravel to prevent soil dispersion in water."
            },
            {
              question: "Can Blue Lotus survive winter?",
              answer: "In cold climates, protect plants by moving them indoors or to deeper water below the frost line. Some varieties go dormant and regrow in spring."
            },
            {
              question: "How do I propagate existing plants?",
              answer: "Blue Lotus can be propagated through rhizome division in spring or by collecting and planting seeds. Division provides faster results than growing from seed."
            },
            {
              question: "What lighting is best for indoor growing?",
              answer: "Use full-spectrum LED grow lights or high-output fluorescent lights. Provide 12-14 hours of light daily, positioned 12-18 inches above the water surface."
            }
          ]}
        />

        <CTAButtons
          title="Shop Blue Lotus Seeds & Teas"
          description="Ready to grow your own Blue Lotus or enjoy its calming benefits? Explore our high-quality seeds and herbal teas."
          buttons={[
            {
              label: "Shop Blue Lotus Products",
              href: "/products",
              variant: "primary",
              ariaLabel: "Buy Blue Lotus seeds and wellness teas"
            },
            {
              label: "How to Use Blue Lotus",
              href: "/articles/how-to-use-blue-lotus-flower",
              variant: "secondary",
              ariaLabel: "Learn more about using Blue Lotus"
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

export default GrowingBlueLotus;