import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import GuideLayout from '../GuideLayout';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';
import RecommendedProducts from '../../../components/sub-components/recommended-products';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../../constants/products';

const HowToMakeBlueLotus: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate schema markup for the article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Make Blue Lotus Tea: A Complete Guide',
    'description': 'Master the art of brewing the perfect cup of Blue Lotus tea with our comprehensive guide. Learn about proper temperatures, steeping times, and expert tips.',
    'image': '/images/articles/blue-lotus-tea-guide.jpg',
    'datePublished': '2024-03-20T10:00:00Z',
    'dateModified': '2024-03-20T10:00:00Z',
    'author': {
      '@type': 'Organization',
      'name': 'Blue Dream Tea UK Team',
      'url': 'https://bluedreamtea.co.uk'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Blue Dream Tea UK',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://bluedreamtea.co.uk/images/logo.png'
      }
    },
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Choose Your Blue Lotus',
        'text': 'Select high-quality Blue Lotus flower, either in tea cut or tea bag form.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Heat Water',
        'text': 'Heat water to just below boiling (95°C/203°F).'
      },
      {
        '@type': 'HowToStep',
        'name': 'Measure and Add',
        'text': 'Use 1-2 grams of tea cut or one tea bag per cup.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Steep',
        'text': 'Allow to steep for 5-7 minutes for optimal flavor extraction.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Optional Enhancement',
        'text': 'Add honey or lemon if desired, and enjoy.'
      }
    ],
    'tool': [
      'Kettle or pot for heating water',
      'Cup or teapot',
      'Tea infuser (for loose tea)',
      'Timer'
    ],
    'totalTime': 'PT10M',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://bluedreamtea.co.uk/articles/how-to-make-blue-lotus-tea'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'item': {
          '@id': 'https://bluedreamtea.co.uk',
          'name': 'Home'
        }
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'item': {
          '@id': 'https://bluedreamtea.co.uk/articles',
          'name': 'Articles'
        }
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'item': {
          '@id': 'https://bluedreamtea.co.uk/articles/how-to-make-blue-lotus-tea',
          'name': 'How to Make Blue Lotus Tea: A Complete Guide'
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>How to Make Blue Lotus Tea: Complete Brewing Guide | Blue Dream Tea UK</title>
        <meta name="description" content="Master the art of brewing Blue Lotus tea with our comprehensive guide. Learn proper temperatures, steeping times, and tips for the perfect cup." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="How to Make Blue Lotus Tea: Complete Brewing Guide" />
        <meta property="og:description" content="Master the art of brewing Blue Lotus tea with our comprehensive guide. Learn proper temperatures, steeping times, and tips for the perfect cup." />
        <meta property="og:image" content="/images/articles/blue-lotus-tea-guide.jpg" />
        <meta property="og:url" content="https://bluedreamtea.co.uk/articles/how-to-make-blue-lotus-tea" />
        <meta property="article:published_time" content="2024-03-20T10:00:00Z" />
        <meta property="article:modified_time" content="2024-03-20T10:00:00Z" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Make Blue Lotus Tea: Complete Brewing Guide" />
        <meta name="twitter:description" content="Master the art of brewing Blue Lotus tea with our comprehensive guide. Learn proper temperatures, steeping times, and tips for the perfect cup." />
        <meta name="twitter:image" content="/images/articles/blue-lotus-tea-guide.jpg" />
        
        <link rel="canonical" href="https://bluedreamtea.co.uk/articles/how-to-make-blue-lotus-tea" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <GuideLayout
        title="How to Make Blue Lotus Tea: A Complete Guide"
        description="Master the art of brewing the perfect cup of Blue Lotus tea with our comprehensive guide. Learn about proper temperatures, steeping times, and expert tips for maximum enjoyment."
        publishDate="2024-03-20T10:00:00Z"
        lastModified="2024-03-20T10:00:00Z"
        category="education"
        featuredImage="/images/articles/blue-lotus-tea-guide.jpg"
        keywords={[
          'blue lotus tea',
          'how to make blue lotus tea',
          'blue lotus brewing guide',
          'blue lotus preparation',
          'tea brewing tips',
          'herbal tea guide',
          'blue lotus steeping time',
          'blue lotus tea temperature',
          'blue lotus tea benefits',
          'blue lotus tea recipe'
        ]}
        wordCount={2000}
        readingTime="10 min read"
      >
        <RichText
          heading="The Art of Brewing Blue Lotus Tea"
          content={
            <div>
              <p>
                Brewing the perfect cup of Blue Lotus tea is a rewarding experience that combines ancient wisdom with modern convenience. Whether you're using our premium <Link to="/products/blue-lotus-flower-tea-cut" className="text-blue-600 hover:text-blue-800">Tea Cut</Link> or convenient <Link to="/products/blue-lotus-flower-tea-bags" className="text-blue-600 hover:text-blue-800">Tea Bags</Link>, this guide will help you achieve the ideal brew every time.
              </p>
              <p>
                Blue Lotus tea has been cherished for millennia, and today we'll share the secrets to unlocking its full potential. <Link to="/articles/what-is-blue-lotus-flower" className="text-blue-600 hover:text-blue-800">Learn more about Blue Lotus's rich history</Link> and discover why this remarkable flower has captivated cultures for generations.
              </p>
              <p>
                Before we dive into the brewing process, it's worth noting that Blue Lotus can be enjoyed in various ways. While this guide focuses on tea preparation, you might also be interested in learning about <Link to="/articles/smoking-blue-lotus-flower-effects" className="text-blue-600 hover:text-blue-800">other methods of consumption</Link>.
              </p>
            </div>
          }
        />

        <RichText
          heading="Understanding Blue Lotus Tea"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Types of Blue Lotus Tea</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Loose Tea Cut - Traditional form offering maximum control over strength</li>
                <li>Tea Bags - Convenient and precisely portioned</li>
                <li>Blended Varieties - Such as our Chamomile blend for enhanced relaxation</li>
                <li>Whole Flower - For traditional preparation methods</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Quality Matters</h3>
              <p>The quality of your Blue Lotus tea significantly impacts your experience. Look for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Natural color and aroma</li>
                <li>Proper drying and storage</li>
                <li>Lab-tested products</li>
                <li>Reputable suppliers</li>
              </ul>
            </div>
          }
        />

        <RichText
          heading="Essential Equipment"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Basic Requirements</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kettle or pot for heating water</li>
                <li>Cup or teapot (ceramic or glass recommended)</li>
                <li>Tea infuser (for loose tea cut)</li>
                <li>Timer</li>
                <li>Filtered water (recommended)</li>
                <li>Optional: honey or lemon for taste</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Optional Equipment</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Temperature-controlled kettle</li>
                <li>Tea scale for precise measurements</li>
                <li>Traditional ceramic teapot</li>
                <li>Double-walled glass cup for better temperature retention</li>
              </ul>
            </div>
          }
        />

        <RichText
          heading="Step-by-Step Brewing Guide"
          content={
            <div>
              <h3 className="text-lg font-semibold mb-2">1. Water Temperature</h3>
              <p className="mb-4">
                Heat water to just below boiling (95°C/203°F). This temperature preserves the delicate compounds while ensuring optimal extraction. If you don't have a thermometer, bring water to a boil and let it cool for 1-2 minutes.
              </p>

              <h3 className="text-lg font-semibold mb-2">2. Measure Your Tea</h3>
              <p className="mb-4">
                • For Tea Cut: Use 1-2 grams (about 1-2 teaspoons) per cup<br />
                • For Tea Bags: Use one tea bag per cup<br />
                • For Stronger Brew: Increase amount slightly, don't extend steeping time
              </p>

              <h3 className="text-lg font-semibold mb-2">3. Steeping Time</h3>
              <p className="mb-4">
                Allow to steep for 5-7 minutes. For a stronger brew, you can extend to 10 minutes, but avoid over-steeping as it may result in a bitter taste. Learn more about <Link to="/articles/blue-lotus-flower-effects" className="text-blue-600 hover:text-blue-800">Blue Lotus effects</Link> to understand how steeping time affects potency.
              </p>

              <h3 className="text-lg font-semibold mb-2">4. Optional Enhancements</h3>
              <p className="mb-4">
                Add honey or lemon if desired. Blue Lotus tea also pairs beautifully with chamomile for an extra soothing experience. Experiment with different combinations to find your perfect blend.
              </p>

              <h3 className="text-lg font-semibold mb-2">5. Storage</h3>
              <p>
                Store unused tea in an airtight container away from direct sunlight and moisture. This preserves its natural properties and ensures freshness for up to 12 months.
              </p>
            </div>
          }
        />

        <RecommendedProducts
          heading="Perfect for Tea Brewing"
          description="Choose your preferred format for the perfect cup:"
          productSlugs={[
            'blue-lotus-flower-tea-cut',
            'blue-lotus-flower-tea-bags',
            'blue-lotus-flower-packs'
          ]}
        />

        <RichText
          heading="Advanced Brewing Techniques"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Cold Brew Method</h3>
              <p className="mb-4">
                For a refreshing alternative, try cold brewing:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use room temperature water</li>
                <li>Steep for 8-12 hours in the refrigerator</li>
                <li>Strain and enjoy over ice</li>
                <li>Add citrus or mint for extra freshness</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Traditional Method</h3>
              <p className="mb-4">
                For a more traditional experience:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use whole flower petals</li>
                <li>Multiple steeping sessions</li>
                <li>Traditional ceramic vessels</li>
                <li>Mindful preparation ritual</li>
              </ul>
            </div>
          }
        />

        <RichText
          heading="Pro Tips for the Perfect Cup"
          content={
            <div>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use fresh, filtered water for the best taste</li>
                <li>Don't squeeze tea bags - this can release bitter compounds</li>
                <li>Pre-warm your cup or teapot for optimal temperature maintenance</li>
                <li>Tea cut can be re-steeped 1-2 times</li>
                <li>Experiment with steeping times to find your perfect strength</li>
                <li>Store properly to maintain freshness</li>
                <li>Clean equipment thoroughly between uses</li>
                <li>Consider water quality - soft water is preferred</li>
              </ul>
            </div>
          }
        />

        <FAQComponent
          title="Frequently Asked Questions About Blue Lotus Tea"
          faqs={[
            {
              question: "Can I make Blue Lotus tea with cold water?",
              answer: "Yes, you can make cold-brew Blue Lotus tea. Use room temperature water and steep for 8-12 hours in the refrigerator. This method produces a smoother, less bitter taste and can be particularly refreshing during warm weather."
            },
            {
              question: "How many cups of Blue Lotus tea can I drink per day?",
              answer: "While individual preferences vary, we recommend starting with 1-2 cups per day to assess your personal response. Always listen to your body and adjust accordingly. For more information about consumption guidelines, visit our article on Blue Lotus effects."
            },
            {
              question: "Can I mix Blue Lotus tea with other herbs?",
              answer: "Yes, Blue Lotus tea pairs well with many herbs, especially chamomile, lavender, and mint. Our tea bags are available in a Blue Lotus & Chamomile blend. Experiment with different combinations to find your perfect blend."
            },
            {
              question: "How long does Blue Lotus tea stay fresh?",
              answer: "When stored properly in an airtight container away from light and moisture, Blue Lotus tea maintains its quality for up to 12 months. Always check for any signs of degradation before use."
            },
            {
              question: "Why is water temperature important?",
              answer: "The right water temperature (95°C/203°F) ensures optimal extraction of beneficial compounds while preventing bitterness from over-extraction. Too hot water can damage delicate compounds, while too cool water may not extract effectively."
            },
            {
              question: "Can I reuse Blue Lotus tea leaves?",
              answer: "Yes, Blue Lotus tea cut can typically be steeped 2-3 times. Each subsequent steeping will produce a lighter brew but may reveal different subtle flavors. Adjust steeping time slightly longer for later infusions."
            },
            {
              question: "Is Blue Lotus tea caffeine-free?",
              answer: "Yes, Blue Lotus tea is naturally caffeine-free, making it an excellent choice for evening consumption or for those sensitive to caffeine. Learn more about Blue Lotus properties in our detailed guide."
            },
            {
              question: "What's the best way to store Blue Lotus tea?",
              answer: "Store in an airtight container in a cool, dark place away from direct sunlight and moisture. Avoid storing near strong-smelling substances as the tea can absorb other aromas."
            },
            {
              question: "Can I add milk to Blue Lotus tea?",
              answer: "While traditionally enjoyed plain, you can add milk if preferred. However, we recommend trying it without first to experience the natural flavors. Non-dairy alternatives work well too."
            },
            {
              question: "What's the difference between tea cut and tea bags?",
              answer: "Tea cut offers more control over strength and is typically of higher quality, while tea bags provide convenience and consistent portioning. Both forms can produce excellent results when prepared properly."
            }
          ]}
        />

        <CTAButtons
          title="Ready to Brew Your Perfect Cup?"
          description="Choose your preferred Blue Lotus tea format and start your journey to the perfect brew."
          buttons={[
            {
              label: "Shop Tea Cut",
              href: "/products/blue-lotus-flower-tea-cut",
              variant: "primary",
              ariaLabel: "Shop Blue Lotus Tea Cut"
            },
            {
              label: "Shop Tea Bags",
              href: "/products/blue-lotus-flower-tea-bags",
              variant: "secondary",
              ariaLabel: "Shop Blue Lotus Tea Bags"
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

export default HowToMakeBlueLotus; 