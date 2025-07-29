import React from 'react';
import { Helmet } from 'react-helmet';
import GuideLayout from '../GuideLayout';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import HowToComponent from '../../../components/sub-components/how-to-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';
import { Link } from 'react-router-dom';
import RecommendedProducts from '../../../components/sub-components/recommended-products';
import { PRODUCTS } from '../../../constants/products';

const WhatIsBlueLotusFlower: React.FC = () => {
  // Generate schema markup for the article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What is Blue Lotus Flower? Complete Guide to Nymphaea Caerulea',
    description: 'Discover everything about blue lotus flower (Nymphaea Caerulea). Learn about its history, traditional uses, benefits, and how to incorporate this sacred Egyptian flower into your wellness routine.',
    image: '/images/articles/blue-lotus-flower-guide.jpg',
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
      '@id': 'https://bluedreamtea.co.uk/articles/what-is-blue-lotus-flower'
    }
  };

  // Generate schema markup for recommended products
  const recommendedProductsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: Object.entries(PRODUCTS)
      .filter(([key]) => [
        'blue-lotus-flower-tea-bags',
        'blue-lotus-flower-tea-cut',
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
          '@id': 'https://bluedreamtea.co.uk/articles/what-is-blue-lotus-flower',
          name: 'What is Blue Lotus Flower?'
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>What is Blue Lotus Flower? Complete Guide to Nymphaea Caerulea | Blue Dream Tea UK</title>
        <meta name="description" content="Discover everything about blue lotus flower (Nymphaea Caerulea). Learn about its history, traditional uses, benefits, and how to incorporate this sacred Egyptian flower into your wellness routine." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="What is Blue Lotus Flower? Complete Guide to Nymphaea Caerulea" />
        <meta property="og:description" content="Discover everything about blue lotus flower (Nymphaea Caerulea). Learn about its history, traditional uses, benefits, and how to incorporate this sacred Egyptian flower into your wellness routine." />
        <meta property="og:image" content="/images/articles/blue-lotus-flower-guide.jpg" />
        <meta property="og:url" content="https://bluedreamtea.co.uk/articles/what-is-blue-lotus-flower" />
        <meta property="article:published_time" content="2025-01-15T10:00:00Z" />
        <meta property="article:modified_time" content="2025-01-15T10:00:00Z" />
        <meta property="article:author" content="Blue Dream Tea UK Team" />
        <meta property="article:section" content="Education" />
        <meta property="article:tag" content="blue lotus flower" />
        <meta property="article:tag" content="nymphaea caerulea" />
        <meta property="article:tag" content="sacred blue lily" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="What is Blue Lotus Flower? Complete Guide to Nymphaea Caerulea" />
        <meta name="twitter:description" content="Discover everything about blue lotus flower (Nymphaea Caerulea). Learn about its history, traditional uses, benefits, and how to incorporate this sacred Egyptian flower into your wellness routine." />
        <meta name="twitter:image" content="/images/articles/blue-lotus-flower-guide.jpg" />
        
        {/* Additional SEO Tags */}
        <link rel="canonical" href="https://bluedreamtea.co.uk/articles/what-is-blue-lotus-flower" />
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
        title="What is Blue Lotus Flower? Complete Guide to Nymphaea Caerulea"
        description="Discover everything about blue lotus flower (Nymphaea Caerulea). Learn about its history, traditional uses, benefits, and how to incorporate this sacred Egyptian flower into your wellness routine."
        publishDate="2025-01-15T10:00:00Z"
        lastModified="2025-01-15T10:00:00Z"
        category="education"
        featuredImage="/images/articles/blue-lotus-flower-guide.jpg"
        keywords={[
          'blue lotus flower',
          'nymphaea caerulea',
          'sacred blue lily',
          'egyptian lotus',
          'blue lotus tea',
          'blue lotus benefits',
          'blue lotus history',
          'lotus flower wellness'
        ]}
        wordCount={2800}
        readingTime="14 min read"
      >
        <RichText
          heading="Introduction to Blue Lotus Flower"
          content={
            <div>
              <p>
                Blue lotus flower (Nymphaea Caerulea), also known as the sacred blue lily of the Nile, is an ancient flower that has captivated humanity for over 3,000 years. This beautiful aquatic plant, native to Egypt and East Africa, holds a special place in history as one of the most revered flowers in ancient Egyptian culture.
              </p>
              <p>
                Today, blue lotus flower has experienced a remarkable renaissance as people rediscover its traditional uses for relaxation, meditation, and wellness practices. Unlike many modern synthetic alternatives, blue lotus offers a natural approach to enhancing one's daily routine through traditional preparation methods including teas, aromatherapy, and smoking blends.
              </p>
              <p>In this comprehensive guide, you'll discover:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>The fascinating history and cultural significance of blue lotus flower</li>
                <li>Scientific classification and botanical characteristics</li>
                <li>Traditional preparation methods and modern applications</li>
                <li>How to identify authentic, high-quality blue lotus products</li>
                <li>Safety considerations and legal status</li>
                <li>Where to source premium blue lotus flower products</li>
              </ul>
            </div>
          }
          className="mb-8"
          addStructuredData={true}
        />

        <RichText
          heading="What is Blue Lotus Flower? Botanical Overview"
          content={
            <div>
              <p>
                Blue lotus flower (Nymphaea Caerulea) is a water lily species that belongs to the family Nymphaeaceae. This aquatic perennial plant is characterized by its distinctive blue petals, yellow center, and broad floating leaves that can reach up to 40 centimeters in diameter.
              </p>
              
              <h3 className="mt-6 mb-4 text-xl font-semibold">Scientific Classification:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Kingdom:</strong> Plantae</li>
                <li><strong>Family:</strong> Nymphaeaceae</li>
                <li><strong>Genus:</strong> Nymphaea</li>
                <li><strong>Species:</strong> N. caerulea</li>
                <li><strong>Common Names:</strong> Blue lotus, Sacred blue lily, Blue water lily</li>
              </ul>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Physical Characteristics:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Delicate blue to purple petals with 15-20 petals per flower</li>
                <li>Bright yellow center containing numerous stamens</li>
                <li>Large, round floating leaves with a distinctive notch</li>
                <li>Flowers typically measure 10-15 cm in diameter</li>
                <li>Sweet, subtle fragrance that intensifies during blooming hours</li>
                <li>Natural habitat includes shallow freshwater environments</li>
              </ul>

              <p className="mt-4">
                The blue lotus flower is often confused with other lotus species, particularly the sacred lotus (Nelumbo nucifera). However, blue lotus belongs to the water lily family, while sacred lotus belongs to a different botanical family entirely. This distinction is important for those seeking authentic blue lotus products.
              </p>
            </div>
          }
          className="mb-8"
        />

        <RichText
          heading="The Sacred History of Blue Lotus in Ancient Egypt"
          content={
            <div>
              <p>
                Blue lotus flower holds an unparalleled position in ancient Egyptian civilization, where it was revered as a sacred symbol of rebirth, creation, and the sun god Ra. Archaeological evidence shows that blue lotus was integral to Egyptian religious ceremonies, daily life, and artistic expression for over three millennia.
              </p>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Religious and Spiritual Significance:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Symbol of rebirth and resurrection, closely associated with the afterlife</li>
                <li>Sacred to the sun god Ra, representing the daily cycle of death and rebirth</li>
                <li>Featured prominently in tomb paintings and burial chambers</li>
                <li>Used in religious ceremonies and temple rituals</li>
                <li>Believed to facilitate spiritual connection and meditation</li>
              </ul>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Cultural Applications:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Brewed into teas for relaxation and ceremonial purposes</li>
                <li>Used in aromatherapy and incense preparations</li>
                <li>Incorporated into garlands and bouquets for celebrations</li>
                <li>Featured in perfumes and cosmetic preparations</li>
                <li>Added to wine and beverages for special occasions</li>
              </ul>

              <p className="mt-4">
                Modern archaeological discoveries continue to reveal the extent of blue lotus use in ancient Egypt. The flower appears in countless tomb paintings, papyrus documents, and artifacts, demonstrating its central role in Egyptian culture and spirituality.
              </p>
            </div>
          }
          className="mb-8"
        />

        <RichText
          heading="Traditional Uses and Modern Applications"
          content={
            <div>
              <p>
                Throughout history, blue lotus flower has been valued for its gentle, calming properties and its ability to enhance relaxation and meditation practices. Modern users continue to appreciate these traditional applications while discovering new ways to incorporate blue lotus into contemporary wellness routines.
              </p>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Traditional Preparation Methods:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Tea Preparation:</strong> Steeping dried petals in hot water for 10-15 minutes</li>
                <li><strong>Aromatherapy:</strong> Burning dried flowers as incense for relaxation</li>
                <li><strong>Smoking Blends:</strong> Combining with other herbs for traditional smoking mixtures</li>
                <li><strong>Wine Infusions:</strong> Steeping flowers in wine for ceremonial use</li>
                <li><strong>Topical Applications:</strong> Creating oils and balms for external use</li>
              </ul>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Modern Applications:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Meditation Aid:</strong> Enhancing mindfulness and meditation practices</li>
                <li><strong>Relaxation Tea:</strong> Evening ritual for unwinding after stressful days</li>
                <li><strong>Bath Additives:</strong> Creating relaxing bath experiences</li>
                <li><strong>Herbal Blends:</strong> Combining with chamomile, lavender, and other relaxing herbs</li>
                <li><strong>Wellness Routines:</strong> Incorporating into holistic health practices</li>
              </ul>

              <p className="mt-4">
                The versatility of blue lotus flower makes it an excellent addition to various wellness practices. Many users appreciate its gentle nature and the fact that it can be easily incorporated into existing routines without significant lifestyle changes.
              </p>
            </div>
          }
          className="mb-8"
        />

        <HowToComponent
          title="How to Prepare Blue Lotus Tea"
          description="Learn the traditional method for brewing the perfect cup of blue lotus tea"
          supplies={[
            { name: "Blue lotus flower petals (1-2 teaspoons)" },
            { name: "Hot water (not boiling) (8 oz)" },
            { name: "Strainer or tea infuser (1)" },
            { name: "Honey or natural sweetener (Optional)" }
          ]}
          steps={[
            {
              name: "Prepare Your Blue Lotus",
              text: "Measure 1-2 teaspoons of dried blue lotus petals. For a stronger infusion, use up to 1 tablespoon. Ensure your blue lotus is from a reputable source and properly dried."
            },
            {
              name: "Heat the Water",
              text: "Heat water to approximately 200°F (93°C). Avoid boiling water as it can damage the delicate compounds in blue lotus petals. The ideal temperature preserves the flower's beneficial properties."
            },
            {
              name: "Steep the Tea",
              text: "Place blue lotus petals in a tea infuser or directly in your cup. Pour the hot water over the petals and steep for 10-15 minutes. Longer steeping times result in stronger flavor and potency."
            },
            {
              name: "Strain and Serve",
              text: "Remove the tea infuser or strain the petals from the liquid. Add honey or your preferred natural sweetener if desired. Enjoy your blue lotus tea warm for the best experience."
            }
          ]}
          totalTime="PT15M"
          difficulty="Beginner"
          className="mb-8"
        />

        <RichText
          heading="Quality and Sourcing: How to Choose Premium Blue Lotus"
          content={
            <div>
              <p>
                With the growing popularity of blue lotus flower, the market has seen an influx of products varying significantly in quality. Understanding how to identify premium blue lotus ensures you receive the full benefits this ancient flower has to offer.
              </p>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Quality Indicators:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Color:</strong> Vibrant blue to purple petals with minimal browning</li>
                <li><strong>Aroma:</strong> Sweet, floral fragrance without musty or stale odors</li>
                <li><strong>Texture:</strong> Properly dried petals that maintain their structure</li>
                <li><strong>Origin:</strong> Sourced from Egypt or regions with similar growing conditions</li>
                <li><strong>Processing:</strong> Carefully dried and stored to preserve active compounds</li>
              </ul>

              <h3 className="mt-6 mb-4 text-xl font-semibold">What to Avoid:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Products with excessive stems and leaves mixed with petals</li>
                <li>Blue lotus that appears overly brown or deteriorated</li>
                <li>Packages without clear sourcing information</li>
                <li>Unusually low-priced products that may indicate poor quality</li>
                <li>Products stored in environments that compromise freshness</li>
              </ul>

              <p className="mt-4">
                At Blue Dream Tea UK, we source our blue lotus directly from trusted cultivators who maintain traditional growing and harvesting methods. Our blue lotus undergoes careful quality testing to ensure you receive only the finest petals with optimal potency and freshness.
              </p>
            </div>
          }
          className="mb-8"
        />

        <RichText
          heading="Legal Status and Safety Considerations"
          content={
            <div>
              <p>
                Blue lotus flower is completely legal in the United Kingdom, United States, and most countries worldwide. It is classified as a natural botanical product and is not subject to the same regulations as controlled substances.
              </p>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Legal Status:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Legal to purchase, possess, and use in the UK and EU</li>
                <li>Legal in all 50 US states with no restrictions</li>
                <li>Sold as a natural botanical product for traditional uses</li>
                <li>No age restrictions for purchase in most jurisdictions</li>
                <li>Can be imported and exported without special permits</li>
              </ul>

              <h3 className="mt-6 mb-4 text-xl font-semibold">Safety Guidelines:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Start with small amounts to assess individual tolerance</li>
                <li>Consult healthcare providers if you have medical conditions</li>
                <li>Avoid use during pregnancy and breastfeeding</li>
                <li>Do not combine with alcohol or medications without medical advice</li>
                <li>Purchase only from reputable suppliers with quality assurance</li>
              </ul>

              <p className="mt-4">
                <em>Note: This information is for educational purposes only and does not constitute medical advice. Blue lotus flower is sold as a natural botanical product for traditional uses including tea preparation and aromatherapy. Individual experiences may vary.</em>
              </p>
            </div>
          }
          className="mb-8"
        />

        <RecommendedProducts
          heading="Featured Products"
          description="Discover our premium blue lotus products:"
          productSlugs={[
            'blue-lotus-flower-tea-bags',
            'blue-lotus-flower-tea-cut',
            'blue-lotus-flower-packs'
          ]}
        />

        <FAQComponent
          title="Frequently Asked Questions About Blue Lotus Flower"
          faqs={[
            {
              question: "What does blue lotus flower taste like?",
              answer: "Blue lotus has a mild, slightly sweet flavor with subtle floral notes. Many describe it as delicate and pleasant, similar to a light herbal tea. The taste becomes more pronounced with longer steeping times, and many users enjoy adding honey to enhance the natural sweetness."
            },
            {
              question: "How long does blue lotus tea stay fresh?",
              answer: "Properly stored dried blue lotus petals can maintain their quality for 2-3 years. Store in an airtight container away from direct sunlight, moisture, and heat. Once brewed, blue lotus tea should be consumed within 24 hours for best quality and taste."
            },
            {
              question: "Can I grow blue lotus at home?",
              answer: "Yes, blue lotus can be grown at home in suitable conditions. It requires a warm climate, full sun, and still or slow-moving water. Many enthusiasts successfully grow blue lotus in ponds, large containers, or water gardens. Seeds are available from specialized aquatic plant suppliers."
            },
            {
              question: "What's the difference between blue lotus and sacred lotus?",
              answer: "Blue lotus (Nymphaea caerulea) is a water lily, while sacred lotus (Nelumbo nucifera) belongs to a different plant family. Blue lotus has blue-purple petals and was sacred to ancient Egyptians, whereas sacred lotus typically has pink or white petals and is significant in Asian cultures."
            },
            {
              question: "How much blue lotus should I use for tea?",
              answer: "Start with 1-2 teaspoons of dried blue lotus petals per 8 oz of water. You can increase the amount for a stronger brew, with some users preferring up to 1 tablespoon. Begin with smaller amounts to assess your preference and gradually adjust to your desired strength."
            },
            {
              question: "Is blue lotus safe to use daily?",
              answer: "Blue lotus is generally considered safe for regular use as a herbal tea when used in moderation. Many people enjoy blue lotus tea as part of their daily relaxation routine. However, as with any herbal product, it's wise to consult with a healthcare provider if you have specific health concerns."
            },
            {
              question: "Where can I buy authentic blue lotus flower?",
              answer: "Blue Dream Tea UK offers premium, authentic blue lotus flower sourced directly from traditional suppliers. We ensure quality through careful selection and proper storage. <a href='/products' className='text-blue-600 underline hover:text-blue-800'>Shop our blue lotus collection</a> for guaranteed authenticity and freshness."
            },
            {
              question: "Can blue lotus be combined with other herbs?",
              answer: "Yes, blue lotus combines beautifully with many other herbs. Popular combinations include chamomile for enhanced relaxation, lavender for aromatherapy benefits, and peppermint for a refreshing twist. Many users create custom blends to suit their personal preferences and wellness goals."
            },
            {
              question: "What is the best time of day to use blue lotus?",
              answer: "The best time depends on your intended use. Many enjoy blue lotus tea in the evening for relaxation and sleep support, while others prefer morning or afternoon use for meditation and mindfulness practices. Listen to your body and adjust timing based on your needs."
            },
            {
              question: "How do I know if my blue lotus is high quality?",
              answer: "High-quality blue lotus should have vibrant blue-purple petals, a sweet floral aroma, and proper drying without signs of mold or deterioration. Look for products from reputable suppliers who provide clear sourcing information and proper storage guidelines."
            }
          ]}
          className="mb-8"
          showLastUpdated={true}
        />

        {/* Recommended Articles Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
              <span className="text-sm text-blue-600 mb-2 block">Usage Guide</span>
              <h3 className="text-lg font-semibold mb-2">How to Use Blue Lotus Flower: Complete Guide</h3>
              <p className="text-gray-600 text-sm mb-4">Learn the different methods of using blue lotus flower, from tea preparation to other traditional applications.</p>
              <Link 
                to="/articles/how-to-use-blue-lotus-flower" 
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Read More →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
              <span className="text-sm text-blue-600 mb-2 block">Benefits Guide</span>
              <h3 className="text-lg font-semibold mb-2">Benefits of Blue Lotus: A Comprehensive Guide</h3>
              <p className="text-gray-600 text-sm mb-4">Explore the potential benefits and effects of blue lotus flower. Learn about traditional uses, modern research, and what to expect.</p>
              <Link 
                to="/articles/benefits-of-blue-lotus" 
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>

        <CTAButtons
          title="Start Your Blue Lotus Journey Today"
          description="Discover the ancient wisdom of blue lotus flower with our premium, authentically sourced products."
          buttons={[
            {
              label: "Shop Blue Lotus Products",
              href: "/products/blue-lotus-flower-tea-bags",
              variant: "primary",
              ariaLabel: "Browse our complete collection of blue lotus products"
            },
            {
              label: "Learn How To Use Blue Lotus",
              href: "/articles/how-to-use-blue-lotus-flower",
              variant: "secondary",
              ariaLabel: "Read our complete guide to using blue lotus"
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

export default WhatIsBlueLotusFlower; 