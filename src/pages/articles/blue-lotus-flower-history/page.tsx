import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import GuideLayout from '../GuideLayout';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';
import RecommendedProducts from '../../../components/sub-components/recommended-products';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../../constants/products';

const BlueLotusHistory: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The History Of Blue Lotus Flower',
    description: 'Discover the ancient history of Blue Lotus Flower and how this mystical plant was used in ancient Egypt and other cultures for spiritual and medicinal purposes.',
    image: '/images/articles/blue-lotus-history.jpg',
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
      '@id': 'https://bluedreamtea.co.uk/articles/blue-lotus-flower-history'
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
          '@id': 'https://bluedreamtea.co.uk/articles/blue-lotus-flower-history',
          name: 'The History Of Blue Lotus Flower'
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>The History Of Blue Lotus Flower</title>
        <meta name="description" content="Discover the ancient history of Blue Lotus Flower and how this mystical plant was used in ancient Egypt and other cultures for spiritual and medicinal purposes." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="The History Of Blue Lotus Flower" />
        <meta property="og:description" content="Discover the ancient history of Blue Lotus Flower and how this mystical plant was used in ancient Egypt and other cultures for spiritual and medicinal purposes." />
        <meta property="og:image" content="/images/articles/blue-lotus-history.jpg" />
        <meta property="og:url" content="https://bluedreamtea.co.uk/articles/blue-lotus-flower-history" />
        <meta property="article:published_time" content="2025-01-22T10:00:00Z" />
        <meta property="article:modified_time" content="2025-01-22T10:00:00Z" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The History Of Blue Lotus Flower" />
        <meta name="twitter:description" content="Discover the ancient history of Blue Lotus Flower and how this mystical plant was used in ancient Egypt and other cultures for spiritual and medicinal purposes." />
        <meta name="twitter:image" content="/images/articles/blue-lotus-history.jpg" />
        <link rel="canonical" href="https://bluedreamtea.co.uk/articles/blue-lotus-flower-history" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <GuideLayout
        title="The History Of Blue Lotus Flower"
        description="Discover the ancient history of Blue Lotus Flower and how this mystical plant was used in ancient Egypt and other cultures for spiritual and medicinal purposes."
        publishDate="2025-01-22T10:00:00Z"
        lastModified="2025-01-22T10:00:00Z"
        category="culture-history"
        featuredImage="/images/articles/blue-lotus-history.jpg"
        keywords={[
          'blue lotus flower history',
          'ancient egyptian plants',
          'nymphaea caerulea origin',
          'spiritual herbs history',
          'egyptian blue lotus',
          'historical uses of blue lotus',
          'blue lotus cultural significance'
        ]}
        wordCount={2000}
        readingTime="10 min read"
      >
        <RichText
          heading="Origins and Ancient Significance"
          content={
            <div>
              <p>The <strong>Blue Lotus Flower</strong> (<em>Nymphaea caerulea</em>) has a deep-rooted history that stretches back thousands of years. Often associated with the ancient civilizations of Egypt, this sacred water lily played an important role in spiritual, medicinal, and artistic traditions. Today, it continues to be valued for its <Link to="/articles/benefits-of-blue-lotus" className="text-blue-600 hover:text-blue-800">numerous benefits</Link>.</p>
              <p>It was commonly depicted in temple carvings, tombs, and ancient scrolls. Revered for its beauty and aromatic properties, the Blue Lotus was also believed to offer connection to the divine and promote lucid dreaming and relaxation. Learn more about its effects on dreams in our article about <Link to="/articles/blue-lotus-lucid-dreaming-deep-sleep" className="text-blue-600 hover:text-blue-800">Blue Lotus and lucid dreaming</Link>.</p>
            </div>
          }
        />

        <RichText
          heading="Ancient Egyptian Uses"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Religious and Spiritual Significance</h3>
              <p>In ancient Egypt, Blue Lotus held profound religious importance:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Symbol of creation and rebirth</li>
                <li>Sacred to the sun god Ra</li>
                <li>Associated with the afterlife</li>
                <li>Used in temple offerings</li>
                <li>Featured in burial rituals</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Medicinal Applications</h3>
              <p>Egyptian healers utilized Blue Lotus for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pain relief and sedation</li>
                <li>Mood enhancement</li>
                <li>Sleep support</li>
                <li>Spiritual ceremonies</li>
                <li>Physical wellness</li>
              </ul>
              <p className="mt-4">Many of these traditional uses align with modern applications. Learn more about current medicinal uses in our guide to <Link to="/articles/blue-lotus-flower-effects" className="text-blue-600 hover:text-blue-800">Blue Lotus effects</Link>.</p>
            </div>
          }
        />

        <RichText
          heading="Cultural Spread and Influence"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Mediterranean Expansion</h3>
              <p>While its roots are in Egypt, the use of Blue Lotus gradually spread across Mediterranean regions. Traders and explorers helped introduce it to Greek and Roman societies, where it was also admired for its calming effects.</p>

              <h3 className="text-xl font-semibold mb-4 mt-6">Artistic Representations</h3>
              <p>Blue Lotus appears in various art forms:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Temple wall paintings</li>
                <li>Hieroglyphic inscriptions</li>
                <li>Ceremonial objects</li>
                <li>Jewelry and decorative arts</li>
                <li>Architectural motifs</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Literary References</h3>
              <p>Ancient texts mention Blue Lotus in various contexts:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Religious hymns and prayers</li>
                <li>Medical papyri</li>
                <li>Poetry and literature</li>
                <li>Historical records</li>
                <li>Philosophical writings</li>
              </ul>
            </div>
          }
        />

        <RecommendedProducts
          heading="Experience Historical Blue Lotus"
          description="Connect with ancient traditions through our authentic Blue Lotus products:"
          productSlugs={[
            'blue-lotus-flower-tea-bags',
            'blue-lotus-flower-tea-cut',
            'blue-lotus-flower'
          ]}
        />

        <RichText
          heading="Modern Revival and Legacy"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Contemporary Interest</h3>
              <p>Today, Blue Lotus is experiencing a renaissance:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Wellness and relaxation practices</li>
                <li>Meditation support</li>
                <li>Natural sleep aid</li>
                <li>Aromatherapy applications</li>
                <li>Traditional medicine studies</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Scientific Research</h3>
              <p>Modern research continues to explore traditional uses. Learn more about current applications in our articles about:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><Link to="/articles/blue-lotus-detoxifying-effects" className="text-blue-600 hover:text-blue-800">Detoxifying properties</Link></li>
                <li><Link to="/articles/how-does-blue-lotus-flower-help-those-seeking-concentration" className="text-blue-600 hover:text-blue-800">Concentration support</Link></li>
                <li><Link to="/articles/blue-lotus-a-natural-remedy-for-combating-seasonal-anxiety" className="text-blue-600 hover:text-blue-800">Emotional balance</Link></li>
              </ul>
            </div>
          }
        />

        <FAQComponent
          title="FAQs About Blue Lotus History"
          faqs={[
            {
              question: "When was Blue Lotus first used in ancient Egypt?",
              answer: "Blue Lotus use dates back to at least 3000 BCE in ancient Egypt, where it was depicted in early dynastic period art and hieroglyphs."
            },
            {
              question: "Why was Blue Lotus considered sacred in ancient Egypt?",
              answer: "It was associated with the sun god Ra and the creation myth, as the flower emerges from water and opens to the sun each day, symbolizing rebirth and spiritual awakening."
            },
            {
              question: "How did ancient Egyptians use Blue Lotus in ceremonies?",
              answer: "They used it in various ways: as temple offerings, in burial rituals, infused in wine for ceremonies, and as a component of perfumes and medicines."
            },
            {
              question: "Did other ancient cultures use Blue Lotus?",
              answer: "Yes, its use spread to Greek, Roman, and other Mediterranean cultures through trade routes, where it was valued for both medicinal and spiritual purposes."
            },
            {
              question: "What historical evidence exists for Blue Lotus use?",
              answer: "Evidence includes temple carvings, tomb paintings, preserved flowers in burial sites, mentions in papyri, and archaeological remains of pottery and ceremonial objects."
            },
            {
              question: "How was Blue Lotus preserved in ancient times?",
              answer: "Egyptians developed methods to dry and preserve the flowers, often storing them in sealed containers. Some were also preserved in honey or wine."
            },
            {
              question: "What role did Blue Lotus play in ancient medicine?",
              answer: "It was used as a sedative, pain reliever, and mood enhancer. Medical papyri mention it in various remedies and treatments."
            },
            {
              question: "When did Blue Lotus use decline historically?",
              answer: "Its widespread use began to decline with the rise of Christianity and Islam in the region, though it continued to be used in some traditional practices."
            },
            {
              question: "How was Blue Lotus cultivated in ancient times?",
              answer: "It was grown in sacred pools and along the Nile River. Temples often had dedicated pools for cultivating the flowers used in ceremonies."
            },
            {
              question: "What's the connection between Blue Lotus and ancient Egyptian art?",
              answer: "Blue Lotus was a popular motif in Egyptian art, symbolizing creation, rebirth, and divine connection. It appears in countless paintings, carvings, and decorative objects."
            }
          ]}
        />

        <CTAButtons
          title="Explore the Legacy of Blue Lotus"
          description="Experience the same botanical that ancient civilizations treasured. Shop our premium Blue Lotus products."
          buttons={[
            {
              label: "Shop Blue Lotus",
              href: "/products",
              variant: "primary",
              ariaLabel: "Shop Blue Lotus online"
            },
            {
              label: "Modern Uses of Blue Lotus",
              href: "/articles/how-to-use-blue-lotus-flower",
              variant: "secondary",
              ariaLabel: "Learn about modern Blue Lotus uses"
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

export default BlueLotusHistory;