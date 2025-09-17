import React from 'react';
import { Helmet } from 'react-helmet';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';
import RecommendedProducts from '../../../components/sub-components/recommended-products';
import { PRODUCTS } from '../../../constants/products';
import { Link } from 'react-router-dom';

const LionsManeHistory: React.FC = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Ancient History of Lion\'s Mane Mushroom: From Traditional Medicine to Modern Science',
    description: 'Discover the fascinating history of Lion\'s Mane mushroom, from its traditional use in Chinese medicine to modern scientific research and its role in cognitive enhancement.',
    image: '/images/articles/lions-mane-history.jpg',
    datePublished: '2025-01-22T10:00:00Z',
    dateModified: '2025-01-22T10:00:00Z',
    author: {
      '@type': 'Organization',
      name: "Lions Mane Labs UK Team",
      url: 'https://lionsmanelabs.co.uk'
    },
    publisher: {
      '@type': 'Organization',
      name: "Lions Mane Labs UK",
      logo: {
        '@type': 'ImageObject',
        url: 'https://lionsmanelabs.co.uk/images/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://lionsmanelabs.co.uk/articles/lions-mane-history'
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://lionsmanelabs.co.uk"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Articles",
        "item": "https://lionsmanelabs.co.uk/articles"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Lion's Mane History",
        "item": "https://lionsmanelabs.co.uk/articles/lions-mane-history"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>The Ancient History of Lion's Mane Mushroom | Lions Mane Labs UK</title>
        <meta name="description" content="Discover the fascinating history of Lion's Mane mushroom, from its traditional use in Chinese medicine to modern scientific research and its role in cognitive enhancement." />
        <meta property="og:title" content="The Ancient History of Lion's Mane Mushroom" />
        <meta property="og:description" content="Discover the fascinating history of Lion's Mane mushroom, from its traditional use in Chinese medicine to modern scientific research and its role in cognitive enhancement." />
        <meta property="og:image" content="https://lionsmanelabs.co.uk/images/articles/lions-mane-history.jpg" />
        <meta property="og:url" content="https://lionsmanelabs.co.uk/articles/lions-mane-history" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Ancient History of Lion's Mane Mushroom" />
        <meta name="twitter:description" content="Discover the fascinating history of Lion's Mane mushroom, from its traditional use in Chinese medicine to modern scientific research and its role in cognitive enhancement." />
        <meta name="twitter:image" content="https://lionsmanelabs.co.uk/images/articles/lions-mane-history.jpg" />
        <link rel="canonical" href="https://lionsmanelabs.co.uk/articles/lions-mane-history" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <RichText
        heading="The Ancient Origins of Lion's Mane Mushroom"
        content={
          <div>
            <p>
              Lion's Mane mushroom (Hericium Erinaceus) has a rich and fascinating history that spans thousands of years. Known as "Yamabushitake" in Japan and "Houtou" in China, this unique mushroom has been revered in traditional medicine for its remarkable cognitive and neurological benefits.
            </p>
            <p>
              The mushroom gets its name from its distinctive appearance - long, cascading spines that resemble a lion's mane. This striking visual characteristic made it easily identifiable to ancient practitioners, who quickly recognized its exceptional medicinal properties.
            </p>
            <p>
              Archaeological evidence suggests that Lion's Mane has been used in traditional medicine for over 2,000 years, making it one of the longest-documented medicinal mushrooms in human history.
            </p>
          </div>
        }
      />

      <RichText
        heading="Traditional Chinese Medicine and Lion's Mane"
        content={
          <div>
            <h3 className="text-xl font-semibold mb-4">Ancient Chinese Medical Texts</h3>
            <p>
              Lion's Mane first appears in ancient Chinese medical texts dating back to the Han Dynasty (206 BCE - 220 CE). Traditional Chinese Medicine (TCM) practitioners classified it as a "tonic" herb, believed to strengthen the body's vital energy (Qi) and support overall health and longevity.
            </p>
            <p>
              In TCM, Lion's Mane was specifically associated with the heart and spleen meridians, and was used to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nourish the heart and calm the spirit</li>
              <li>Strengthen the spleen and improve digestion</li>
              <li>Enhance memory and cognitive function</li>
              <li>Support the nervous system</li>
              <li>Promote longevity and vitality</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 mt-8">Preparation Methods in Ancient China</h3>
            <p>
              Ancient Chinese practitioners developed sophisticated methods for preparing Lion's Mane. The mushroom was typically:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dried and ground into powder for tea preparation</li>
              <li>Cooked in soups and broths to extract its beneficial compounds</li>
              <li>Combined with other herbs to create synergistic formulas</li>
              <li>Used in tinctures and extracts for concentrated benefits</li>
            </ul>
          </div>
        }
      />

      <RichText
        heading="Japanese Buddhist Monks and Yamabushitake"
        content={
          <div>
            <h3 className="text-xl font-semibold mb-4">The Yamabushi Connection</h3>
            <p>
              In Japan, Lion's Mane became known as "Yamabushitake" (mountain priest mushroom) because it was frequently used by Yamabushi, the mountain-dwelling Buddhist monks. These ascetic practitioners valued the mushroom for its ability to enhance meditation and spiritual practices.
            </p>
            <p>
              The Yamabushi believed that Lion's Mane helped them achieve deeper states of meditation and enhanced their spiritual awareness. They would often consume it before long periods of meditation and spiritual retreats in the mountains.
            </p>

            <h3 className="text-xl font-semibold mb-4 mt-8">Culinary Traditions</h3>
            <p>
              Beyond its medicinal use, Lion's Mane became a prized culinary ingredient in Japanese cuisine. Its meaty texture and delicate flavor made it a favorite among chefs and food enthusiasts. Traditional Japanese cooking methods included:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Grilling with soy sauce and mirin</li>
              <li>Simmering in dashi broth</li>
              <li>Tempura-style frying</li>
              <li>Adding to hot pot dishes (nabe)</li>
            </ul>
          </div>
        }
      />

      <RichText
        heading="Spread to Other Asian Cultures"
        content={
          <div>
            <h3 className="text-xl font-semibold mb-4">Korean Traditional Medicine</h3>
            <p>
              Lion's Mane found its way into Korean traditional medicine, where it was known as "Norugong" (노루공). Korean practitioners used it to support brain health and improve cognitive function, particularly for students and scholars.
            </p>

            <h3 className="text-xl font-semibold mb-4 mt-8">Southeast Asian Practices</h3>
            <p>
              In Southeast Asia, particularly in Thailand and Vietnam, Lion's Mane was incorporated into traditional healing practices. Local healers used it to support nervous system health and improve mental clarity.
            </p>

            <h3 className="text-xl font-semibold mb-4 mt-8">Tibetan Medicine</h3>
            <p>
              Tibetan medicine also recognized the benefits of Lion's Mane, incorporating it into their holistic approach to health and wellness. Tibetan practitioners used it to support both physical and mental well-being.
            </p>
          </div>
        }
      />

      <RichText
        heading="Modern Scientific Discovery"
        content={
          <div>
            <h3 className="text-xl font-semibold mb-4">20th Century Research</h3>
            <p>
              The modern scientific study of Lion's Mane began in the 20th century, when researchers started to investigate the traditional claims about its medicinal properties. Early studies focused on its nutritional content and basic pharmacological effects.
            </p>

            <h3 className="text-xl font-semibold mb-4 mt-8">Nerve Growth Factor Discovery</h3>
            <p>
              A breakthrough came in the 1990s when Japanese researchers discovered that Lion's Mane contains compounds that can stimulate the production of Nerve Growth Factor (NGF). This discovery provided scientific validation for the traditional claims about its cognitive and neurological benefits.
            </p>

            <h3 className="text-xl font-semibold mb-4 mt-8">Contemporary Research</h3>
            <p>
              Today, Lion's Mane is the subject of extensive scientific research, with studies investigating its potential benefits for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Alzheimer's disease and dementia</li>
              <li>Parkinson's disease</li>
              <li>Depression and anxiety</li>
              <li>Nerve regeneration and repair</li>
              <li>Cognitive enhancement and memory improvement</li>
              <li>Neuroplasticity and brain health</li>
            </ul>
          </div>
        }
      />

      <RichText
        heading="Cultural Significance and Folklore"
        content={
          <div>
            <h3 className="text-xl font-semibold mb-4">Symbolic Meaning</h3>
            <p>
              Throughout history, Lion's Mane has held symbolic significance in various cultures. Its unique appearance and remarkable properties led to associations with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Wisdom and intelligence</li>
              <li>Spiritual enlightenment</li>
              <li>Longevity and vitality</li>
              <li>Mental clarity and focus</li>
              <li>Connection between mind and body</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 mt-8">Folklore and Legends</h3>
            <p>
              Various folk tales and legends surround Lion's Mane mushroom. In some cultures, it was believed that consuming the mushroom could grant wisdom and enhance one's ability to learn and remember. Other legends suggested it could help bridge the gap between the physical and spiritual worlds.
            </p>
          </div>
        }
      />

      <RichText
        heading="The Modern Renaissance of Lion's Mane"
        content={
          <div>
            <h3 className="text-xl font-semibold mb-4">Growing Popularity in the West</h3>
            <p>
              In recent decades, Lion's Mane has experienced a renaissance in Western countries, driven by growing interest in natural health solutions and the increasing body of scientific research supporting its traditional uses.
            </p>

            <h3 className="text-xl font-semibold mb-4 mt-8">Integration into Modern Wellness</h3>
            <p>
              Today, Lion's Mane is widely recognized as a powerful nootropic and adaptogen, finding its way into:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dietary supplements and capsules</li>
              <li>Functional foods and beverages</li>
              <li>Skincare and beauty products</li>
              <li>Pet health supplements</li>
              <li>Professional medical applications</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 mt-8">Future Prospects</h3>
            <p>
              As research continues to uncover the mechanisms behind Lion's Mane's benefits, its role in modern medicine and wellness is likely to expand. The combination of ancient wisdom and modern science makes Lion's Mane one of the most promising natural compounds for supporting brain health and cognitive function.
            </p>
          </div>
        }
      />

      <FAQComponent
        title="Frequently Asked Questions About Lion's Mane History"
        faqs={[
          {
            question: "How long has Lion's Mane been used medicinally?",
            answer: "Lion's Mane has been used in traditional medicine for over 2,000 years, with the earliest documented use dating back to the Han Dynasty in ancient China (206 BCE - 220 CE)."
          },
          {
            question: "Why is it called Lion's Mane?",
            answer: "The mushroom gets its name from its distinctive appearance - long, cascading spines that resemble a lion's mane. In Japan, it's called 'Yamabushitake' (mountain priest mushroom)."
          },
          {
            question: "What did ancient cultures use Lion's Mane for?",
            answer: "Ancient cultures used Lion's Mane to enhance memory, support cognitive function, improve digestion, calm the spirit, and promote overall vitality and longevity."
          },
          {
            question: "When was Lion's Mane's NGF-stimulating properties discovered?",
            answer: "The discovery that Lion's Mane contains compounds that stimulate Nerve Growth Factor (NGF) production was made by Japanese researchers in the 1990s, providing scientific validation for traditional claims."
          },
          {
            question: "How did Lion's Mane spread from Asia to the West?",
            answer: "Lion's Mane spread to the West through increased interest in traditional medicine, scientific research validating its benefits, and growing awareness of natural health solutions in recent decades."
          }
        ]}
      />

      <RecommendedProducts
        heading="Experience the Legacy of Lion's Mane"
        description="Connect with ancient traditions through our premium Lion's Mane products:"
        productSlugs={[
          'lions-mane-capsules',
          'lions-mane-powder',
          'lions-mane-tincture',
          'lions-mane-tea',
        ]}
      />

      <CTAButtons
        title="Discover the Power of Ancient Wisdom"
        description="Experience the cognitive benefits that have been treasured for thousands of years."
        buttons={[
          {
            label: "Shop Lion's Mane Products",
            href: "/products/lions-mane-capsules",
            variant: "primary",
            ariaLabel: "Browse our complete collection of Lion's Mane products"
          },
          {
            label: "Learn About Lion's Mane Benefits",
            href: "/articles/lions-mane-cognitive-benefits",
            variant: "secondary",
            ariaLabel: "Read about the cognitive benefits of Lion's Mane"
          }
        ]}
        align="left"
        className="mt-12"
      />
    </>
  );
};

export default LionsManeHistory;