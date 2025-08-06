import React, { useRef } from 'react';
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

const BenefitsOfBlueLotus: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const isVariantGrouped = (variants: (ProductVariant | ProductVariantGroup)[]): variants is ProductVariantGroup[] => {
    return variants.length > 0 && 'name' in variants[0];
  };

  const getStartingPrice = (variants: (ProductVariant | ProductVariantGroup)[], fallbackPrice: number) => {
    if (!variants || variants.length === 0) return fallbackPrice;
    if (isVariantGrouped(variants)) {
      const sizeGroup = variants.find(group => group.name === 'size');
      if (sizeGroup && sizeGroup.options.length > 0) {
        const lowestPriceOption = sizeGroup.options.reduce((lowest, option) =>
          (option.salePrice || option.price) < (lowest.salePrice || lowest.price) ? option : lowest
        );
        return lowestPriceOption.salePrice || lowestPriceOption.price;
      }
      return fallbackPrice;
    } else {
      const simpleVariants = variants as ProductVariant[];
      const lowestPriceVariant = simpleVariants.reduce((lowest, variant) =>
        (variant.salePrice || variant.price) < (lowest.salePrice || lowest.price) ? variant : lowest
      );
      return lowestPriceVariant.salePrice || lowestPriceVariant.price;
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Blue Lotus Flower: Benefits Explained - Everything You Should Know',
    description: 'Discover the many potential benefits of the Blue Lotus Flower, from relaxation and mood support to its ancient ceremonial uses. Learn why this botanical has been valued for centuries.',
    image: '/images/articles/blue-lotus-benefits-guide.jpg',
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
      '@id': 'https://bluedreamtea.co.uk/articles/benefits-of-blue-lotus'
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
          '@id': 'https://bluedreamtea.co.uk/articles/benefits-of-blue-lotus',
          name: 'Blue Lotus Flower: Benefits Explained'
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Blue Lotus Flower: Benefits Explained - Everything You Should Know</title>
        <meta name="description" content="Discover the many potential benefits of the Blue Lotus Flower, from relaxation and mood support to its ancient ceremonial uses. Learn why this botanical has been valued for centuries." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Blue Lotus Flower: Benefits Explained - Everything You Should Know" />
        <meta property="og:description" content="Discover the many potential benefits of the Blue Lotus Flower, from relaxation and mood support to its ancient ceremonial uses. Learn why this botanical has been valued for centuries." />
        <meta property="og:image" content="/images/articles/blue-lotus-benefits-guide.jpg" />
        <meta property="og:url" content="https://bluedreamtea.co.uk/articles/benefits-of-blue-lotus" />
        <meta property="article:published_time" content="2025-01-22T10:00:00Z" />
        <meta property="article:modified_time" content="2025-01-22T10:00:00Z" />
        <meta property="article:author" content="Blue Dream Tea UK Team" />
        <meta property="article:section" content="Herbal Education" />
        <meta property="article:tag" content="blue lotus benefits" />
        <meta property="article:tag" content="nymphaea caerulea" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blue Lotus Flower: Benefits Explained - Everything You Should Know" />
        <meta name="twitter:description" content="Discover the many potential benefits of the Blue Lotus Flower, from relaxation and mood support to its ancient ceremonial uses. Learn why this botanical has been valued for centuries." />
        <meta name="twitter:image" content="/images/articles/blue-lotus-benefits-guide.jpg" />
        <link rel="canonical" href="https://bluedreamtea.co.uk/articles/benefits-of-blue-lotus" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <GuideLayout
        title="Blue Lotus Flower: Benefits Explained - Everything You Should Know"
        description="Discover the many potential benefits of the Blue Lotus Flower, from relaxation and mood support to its ancient ceremonial uses. Learn why this botanical has been valued for centuries."
        publishDate="2025-01-22T10:00:00Z"
        lastModified="2025-01-22T10:00:00Z"
        category="wellness"
        featuredImage="/images/articles/blue-lotus-benefits-guide.jpg"
        keywords={[
          'blue lotus benefits',
          'nymphaea caerulea effects',
          'blue lotus flower uses',
          'natural mood support',
          'blue lotus wellness',
          'plant-based relaxation',
          'blue lotus properties',
          'herbal calming remedies'
        ]}
        wordCount={2500}
        readingTime="12 min read"
      >
        <RichText
          heading="Why Blue Lotus Has Been Cherished for Centuries"
          content={
            <div>
              <p>The Blue Lotus Flower (Nymphaea Caerulea) has long captivated human curiosity with its mystical allure and rich cultural history. Renowned in ancient civilizations, this botanical treasure was revered for its soothing effects on the mind and body.</p>
              <p>Used in ceremonial contexts, artistic depictions, and traditional wellness practices, Blue Lotus has maintained a legacy of calm and clarity. Today, it's making a modern resurgence as a natural aid for relaxation, sleep support, and emotional balance.</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Supports calm and relaxation</li>
                <li>May enhance mood and reduce stress</li>
                <li>Used in teas, tinctures, and blends</li>
                <li>Traditionally linked to meditation and sleep</li>
                <li>Contains antioxidants and calming alkaloids</li>
              </ul>
            </div>
          }
        />

        <RichText
          heading="Key Benefits of Blue Lotus Flower"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">1. Relaxation and Stress Relief</h3>
              <p>One of the most celebrated benefits of Blue Lotus is its natural ability to promote relaxation and reduce stress. The flower contains compounds that interact with the body's natural relaxation responses, helping to ease tension and promote a sense of calm. Learn more about these effects in our detailed guide on <Link to="/articles/blue-lotus-flower-effects" className="text-blue-600 hover:text-blue-800">Blue Lotus effects</Link>.</p>
              
              <h3 className="text-xl font-semibold mb-4 mt-6">2. Sleep Support</h3>
              <p>Many users report improved sleep quality when incorporating Blue Lotus into their evening routine. While not a sedative, its gentle calming properties can help prepare both mind and body for rest. For more information, visit our article on <Link to="/articles/does-blue-lotus-flower-make-you-sleepy" className="text-blue-600 hover:text-blue-800">Blue Lotus and sleep</Link>.</p>
              
              <h3 className="text-xl font-semibold mb-4 mt-6">3. Mood Enhancement</h3>
              <p>Blue Lotus has been traditionally used to uplift mood and promote emotional balance. Modern users often report a gentle sense of wellbeing and positivity. Read more about emotional benefits in our guide to <Link to="/articles/blue-lotus-a-natural-remedy-for-combating-seasonal-anxiety" className="text-blue-600 hover:text-blue-800">Blue Lotus for seasonal anxiety</Link>.</p>
              
              <h3 className="text-xl font-semibold mb-4 mt-6">4. Cognitive Support</h3>
              <p>Some users report enhanced mental clarity and focus when using Blue Lotus. While research is ongoing, traditional use suggests potential cognitive benefits. Explore more in our article about <Link to="/articles/how-does-blue-lotus-flower-help-those-seeking-concentration" className="text-blue-600 hover:text-blue-800">Blue Lotus and concentration</Link>.</p>
            </div>
          }
        />

        <RichText
          heading="Traditional Uses and Modern Applications"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Historical Context</h3>
              <p>In ancient Egypt, Blue Lotus was more than just a beautiful flower—it was a sacred plant used in religious ceremonies, medicine, and daily life. The flowers were often depicted in tomb paintings and hieroglyphics, symbolizing rebirth and spiritual awakening. Learn more about this rich history in our <Link to="/articles/blue-lotus-flower-history" className="text-blue-600 hover:text-blue-800">Blue Lotus history guide</Link>.</p>

              <h3 className="text-xl font-semibold mb-4 mt-6">Modern Wellness Applications</h3>
              <p>Today, Blue Lotus is experiencing a renaissance in wellness circles. People are rediscovering its potential benefits through various consumption methods:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Herbal tea blends for relaxation</li>
                <li>Aromatherapy applications</li>
                <li>Meditation and mindfulness support</li>
                <li>Natural sleep aid alternatives</li>
                <li>Stress management programs</li>
              </ul>
              <p className="mt-4">For detailed instructions on different usage methods, visit our comprehensive <Link to="/articles/how-to-use-blue-lotus-flower" className="text-blue-600 hover:text-blue-800">Blue Lotus usage guide</Link>.</p>
            </div>
          }
        />

        <RecommendedProducts
          heading="Experience Blue Lotus Benefits"
          description="Explore our carefully selected Blue Lotus products to experience these benefits yourself:"
          productSlugs={[
            'blue-lotus-flower-tea-bags',
            'blue-lotus-flower-tea-cut',
            'blue-lotus-flower'
          ]}
        />

        <RichText
          heading="Safety and Considerations"
          content={
            <div>
              <p>While Blue Lotus is generally considered safe, it's important to approach any botanical with mindful consideration. Understanding proper usage and potential interactions helps ensure a positive experience.</p>
              
              <h3 className="text-xl font-semibold mb-4 mt-6">Best Practices</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Start with small amounts to assess personal sensitivity</li>
                <li>Choose high-quality, properly sourced products</li>
                <li>Follow recommended preparation methods</li>
                <li>Be aware of potential interactions with medications</li>
                <li>Listen to your body's response</li>
              </ul>
              
              <p className="mt-4">For more detailed safety information, read our article on <Link to="/articles/blue-lotus-flower-side-effects" className="text-blue-600 hover:text-blue-800">Blue Lotus side effects</Link>.</p>
            </div>
          }
        />

        <FAQComponent
          title="FAQs About Blue Lotus Benefits"
          faqs={[
            {
              question: "What are the primary benefits of Blue Lotus?",
              answer: "The most cited benefits include promoting relaxation, supporting sleep, uplifting mood, and aiding meditation or mindfulness practices."
            },
            {
              question: "Is Blue Lotus safe to use?",
              answer: "Yes, when used responsibly and in moderation. It's best enjoyed as tea or infused in blends, and generally well-tolerated."
            },
            {
              question: "Does Blue Lotus make you high or sedated?",
              answer: "No, Blue Lotus typically produces a gentle calming sensation—not a high. It's often used for its serene and mildly euphoric qualities."
            },
            {
              question: "How do I consume Blue Lotus?",
              answer: "You can steep dried petals in tea, use it in aromatherapy, or blend it with other calming herbs."
            },
            {
              question: "How quickly do Blue Lotus benefits take effect?",
              answer: "Effects typically begin within 15-30 minutes when consumed as tea. Timing can vary based on the method of consumption and individual factors."
            },
            {
              question: "Can I use Blue Lotus daily?",
              answer: "While Blue Lotus can be used regularly, it's recommended to take occasional breaks and listen to your body's response. Start with 2-3 times per week."
            },
            {
              question: "What's the best time of day to use Blue Lotus?",
              answer: "This depends on your goals. For relaxation and sleep support, evening use is common. For focus and clarity, morning or afternoon use may be preferred."
            },
            {
              question: "Can Blue Lotus be combined with other herbs?",
              answer: "Yes, Blue Lotus pairs well with many calming herbs like chamomile, lavender, and passionflower. Always research combinations and start with small amounts."
            },
            {
              question: "How do I know if I'm getting quality Blue Lotus?",
              answer: "Look for reputable suppliers, proper botanical identification (Nymphaea caerulea), and third-party testing when available. Color, aroma, and proper storage are also important factors."
            },
            {
              question: "Are there any groups who should avoid Blue Lotus?",
              answer: "Pregnant or nursing individuals, those on medication, and people with certain medical conditions should consult healthcare providers before use."
            }
          ]}
        />

        <CTAButtons
          title="Explore Blue Lotus Benefits Firsthand"
          description="Browse our collection of premium Blue Lotus products and discover the botanical that's helped people relax for generations."
          buttons={[
            {
              label: "Shop Blue Lotus Products",
              href: "/products",
              variant: "primary",
              ariaLabel: "Shop Blue Lotus teas and blends"
            },
            {
              label: "Learn More About Blue Lotus",
              href: "/articles/what-is-blue-lotus-flower",
              variant: "secondary",
              ariaLabel: "Read the full Blue Lotus flower guide"
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

export default BenefitsOfBlueLotus;