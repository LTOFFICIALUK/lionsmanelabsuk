import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import GuideLayout from '../GuideLayout';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';
import RecommendedProducts from '../../../components/sub-components/recommended-products';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../../constants/products';

const HowToUseBlueLotus: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How To Use Blue Lotus Flower (Smoking, Drinking & Alcohol Infusing)',
    description: 'Discover how to use Blue Lotus Flower in tea, as a smokeable herb, and infused in alcohol. Learn about preparation, effects, and wellness benefits.',
    image: '/images/articles/how-to-use-blue-lotus.jpg',
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
      '@id': 'https://bluedreamtea.co.uk/articles/how-to-use-blue-lotus-flower'
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
          '@id': 'https://bluedreamtea.co.uk/articles/how-to-use-blue-lotus-flower',
          name: 'How To Use Blue Lotus Flower (Smoking, Drinking & Alcohol Infusing)'
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>How To Use Blue Lotus Flower (Smoking, Drinking & Alcohol Infusing)</title>
        <meta name="description" content="Discover how to use Blue Lotus Flower in tea, as a smokeable herb, and infused in alcohol. Learn about preparation, effects, and wellness benefits." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="How To Use Blue Lotus Flower (Smoking, Drinking & Alcohol Infusing)" />
        <meta property="og:description" content="Discover how to use Blue Lotus Flower in tea, as a smokeable herb, and infused in alcohol. Learn about preparation, effects, and wellness benefits." />
        <meta property="og:image" content="/images/articles/how-to-use-blue-lotus.jpg" />
        <meta property="og:url" content="https://bluedreamtea.co.uk/articles/how-to-use-blue-lotus-flower" />
        <meta property="article:published_time" content="2025-01-22T10:00:00Z" />
        <meta property="article:modified_time" content="2025-01-22T10:00:00Z" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How To Use Blue Lotus Flower (Smoking, Drinking & Alcohol Infusing)" />
        <meta name="twitter:description" content="Discover how to use Blue Lotus Flower in tea, as a smokeable herb, and infused in alcohol. Learn about preparation, effects, and wellness benefits." />
        <meta name="twitter:image" content="/images/articles/how-to-use-blue-lotus.jpg" />
        <link rel="canonical" href="https://bluedreamtea.co.uk/articles/how-to-use-blue-lotus-flower" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <GuideLayout
        title="How To Use Blue Lotus Flower (Smoking, Drinking & Alcohol Infusing)"
        description="Discover how to use Blue Lotus Flower in tea, as a smokeable herb, and infused in alcohol. Learn about preparation, effects, and wellness benefits."
        publishDate="2025-01-22T10:00:00Z"
        lastModified="2025-01-22T10:00:00Z"
        category="usage-guides"
        featuredImage="/images/articles/how-to-use-blue-lotus.jpg"
        keywords={[
          'how to use blue lotus',
          'blue lotus flower preparation',
          'smoking blue lotus',
          'drinking blue lotus tea',
          'blue lotus tincture',
          'infusing blue lotus in alcohol',
          'blue lotus experience',
          'nymphaea caerulea uses'
        ]}
        wordCount={2000}
        readingTime="10 min read"
      >
        <RichText
          heading="How To Use Blue Lotus Flower"
          content={
            <div>
              <p>The <strong>Blue Lotus Flower</strong>, scientifically known as <em>Nymphaea caerulea</em>, has long been revered for its historical and cultural significance. Learn more about its rich history in our <Link to="/articles/blue-lotus-flower-history" className="text-blue-600 hover:text-blue-800">historical guide</Link>. Originating from the Nile region, this mystical flower has been used in various traditional practices, including religious ceremonies and spiritual rituals, as well as for promoting relaxation.</p>
              <p>In this comprehensive guide, we will explore the diverse ways to incorporate the Blue Lotus Flower into your wellness routine, highlighting its calming and soothing benefits. For a complete understanding of its effects, see our guide on <Link to="/articles/blue-lotus-flower-effects" className="text-blue-600 hover:text-blue-800">Blue Lotus effects</Link>.</p>
            </div>
          }
        />

        <RichText
          heading="Smoking Methods"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Traditional Smoking</h3>
              <p>The stamen and petals are preferred for smoking:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fine, smooth texture</li>
                <li>Gentle burning properties</li>
                <li>Natural flavor profile</li>
                <li>Easy to blend</li>
                <li>Quick onset of effects</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Preparation Tips</h3>
              <p>For optimal smoking experience:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proper grinding technique</li>
                <li>Moisture content control</li>
                <li>Blend ratios</li>
                <li>Rolling methods</li>
                <li>Storage considerations</li>
              </ul>

              <p className="mt-4">For more detailed information about smoking methods, see our guide on <Link to="/articles/smoking-blue-lotus-flower-a-users-guide" className="text-blue-600 hover:text-blue-800">smoking Blue Lotus</Link>.</p>
            </div>
          }
        />

        <RichText
          heading="Tea Preparation"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Hot Brewing</h3>
              <p>Traditional tea preparation:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Water temperature: 175-185°F</li>
                <li>Steeping time: 5-10 minutes</li>
                <li>Dosage guidelines</li>
                <li>Strain properly</li>
                <li>Optional honey or lemon</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Cold Brewing</h3>
              <p>Alternative preparation method:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Room temperature water</li>
                <li>Extended steeping (4-8 hours)</li>
                <li>Refrigeration method</li>
                <li>Flavor preservation</li>
                <li>Summer refreshment</li>
              </ul>
            </div>
          }
        />

        <RecommendedProducts
          heading="Premium Blue Lotus Products"
          description="Explore our selection of quality Blue Lotus products:"
          productSlugs={[
            'blue-lotus-flower-tea-bags',
            'blue-lotus-flower-tea-cut',
            'blue-lotus-flower-smoking-blend'
          ]}
        />

        <RichText
          heading="Alcohol Infusion"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Traditional Method</h3>
              <p>Ancient Egyptian technique:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Choose quality alcohol</li>
                <li>Proper ratios</li>
                <li>Infusion duration</li>
                <li>Storage conditions</li>
                <li>Filtering process</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Modern Variations</h3>
              <p>Contemporary approaches:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Quick infusion methods</li>
                <li>Alcohol selection guide</li>
                <li>Flavor combinations</li>
                <li>Serving suggestions</li>
                <li>Safety considerations</li>
              </ul>
            </div>
          }
        />

        <RichText
          heading="Safety and Best Practices"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">General Guidelines</h3>
              <p>Important safety considerations:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Start with small amounts</li>
                <li>Monitor personal response</li>
                <li>Quality product selection</li>
                <li>Storage requirements</li>
                <li>Usage frequency</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Precautions</h3>
              <p>Be mindful of:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Individual sensitivity</li>
                <li>Medication interactions</li>
                <li>Timing considerations</li>
                <li>Activity restrictions</li>
                <li>Health conditions</li>
              </ul>

              <p className="mt-4">For more safety information, read our guide on <Link to="/articles/blue-lotus-flower-side-effects" className="text-blue-600 hover:text-blue-800">Blue Lotus side effects</Link>.</p>
            </div>
          }
        />

        <FAQComponent
          title="FAQs: Using Blue Lotus Flower"
          faqs={[
            {
              question: "What is the best way to use Blue Lotus Flower?",
              answer: "Tea is the most popular method for ease and mild effects, but smoking or alcohol infusion offer their own unique experiences. Choose based on your preferences and desired effects."
            },
            {
              question: "Can I mix Blue Lotus with other herbs?",
              answer: "Yes, especially when smoking. Lavender, damiana, and chamomile are common pairings. Always research compatibility and start with small amounts when trying new combinations."
            },
            {
              question: "How long does it take for Blue Lotus to work?",
              answer: "Tea typically takes 15–30 minutes. Smoking effects can be felt sooner, within 5–10 minutes. Alcohol infusions may take 30-60 minutes depending on concentration and individual factors."
            },
            {
              question: "Is Blue Lotus legal and safe?",
              answer: "Yes, it is legal in most regions and considered safe when used responsibly. Always verify local regulations and consult healthcare providers about personal use."
            },
            {
              question: "What's the best storage method?",
              answer: "Store in an airtight container away from light and moisture. Keep in a cool, dark place. Properly stored Blue Lotus can maintain potency for up to two years."
            },
            {
              question: "Can I reuse Blue Lotus tea leaves?",
              answer: "While possible for a second steeping, the effects will be milder. For best results, use fresh material each time to ensure optimal potency."
            },
            {
              question: "What's the ideal dosage for beginners?",
              answer: "Start with 1-2 grams for tea, or a small pinch for smoking blends. Gradually adjust based on personal response and comfort level."
            },
            {
              question: "How often can I use Blue Lotus?",
              answer: "Most users enjoy Blue Lotus 2-3 times per week. Listen to your body and avoid daily use to prevent tolerance buildup."
            },
            {
              question: "What's the difference between fresh and dried Blue Lotus?",
              answer: "Dried Blue Lotus is more concentrated and convenient for most uses. Fresh flowers are rare outside growing regions and require different preparation methods."
            },
            {
              question: "Can I vaporize Blue Lotus?",
              answer: "Yes, Blue Lotus can be vaporized at temperatures between 175-200°C (347-392°F). This method offers a gentle alternative to smoking."
            }
          ]}
        />

        <CTAButtons
          title="Ready to Try Blue Lotus?"
          description="Explore our premium Blue Lotus selection and discover how this ancient botanical can elevate your wellness routine."
          buttons={[
            {
              label: "Shop Blue Lotus Now",
              href: "/products",
              variant: "primary",
              ariaLabel: "Buy Blue Lotus Flower online"
            },
            {
              label: "Blue Lotus Benefits",
              href: "/articles/benefits-of-blue-lotus",
              variant: "secondary",
              ariaLabel: "Read about the benefits of Blue Lotus"
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

export default HowToUseBlueLotus;