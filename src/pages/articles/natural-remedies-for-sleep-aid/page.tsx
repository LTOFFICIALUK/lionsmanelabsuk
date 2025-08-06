import React, { useRef } from 'react';
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

const NaturalRemediesForSleepAid: React.FC = () => {
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
    headline: 'Natural Remedies For Sleep Aid',
    description: 'Explore proven natural remedies to support restful sleep. Learn how Blue Lotus, a traditional botanical, may help improve sleep quality without harsh pharmaceuticals.',
    image: '/images/articles/blue-lotus-sleep-guide.jpg',
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
      '@id': 'https://bluedreamtea.co.uk/articles/natural-remedies-for-sleep-aid'
    }
  };

  const recommendedProductsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: Object.entries(PRODUCTS)
      .filter(([key]) => [
        'blue-lotus-flower-tea-bags',
        'blue-lotus-flower-tea-cut',
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
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length,
            reviewCount: product.reviews.length
          }
        }
      }))
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
          '@id': 'https://bluedreamtea.co.uk/articles/natural-remedies-for-sleep-aid',
          name: 'Natural Remedies For Sleep Aid'
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Natural Remedies For Sleep Aid | Sleep Better With Blue Lotus</title>
        <meta name="description" content="Explore proven natural remedies to support restful sleep. Learn how Blue Lotus, a traditional botanical, may help improve sleep quality without harsh pharmaceuticals." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Natural Remedies For Sleep Aid" />
        <meta property="og:description" content="Explore proven natural remedies to support restful sleep. Learn how Blue Lotus, a traditional botanical, may help improve sleep quality without harsh pharmaceuticals." />
        <meta property="og:image" content="/images/articles/blue-lotus-sleep-guide.jpg" />
        <meta property="og:url" content="https://bluedreamtea.co.uk/articles/natural-remedies-for-sleep-aid" />
        <meta property="article:published_time" content="2025-01-15T10:00:00Z" />
        <meta property="article:modified_time" content="2025-01-15T10:00:00Z" />
        <meta property="article:author" content="Blue Dream Tea UK Team" />
        <meta property="article:section" content="Health" />
        <meta property="article:tag" content="sleep aid" />
        <meta property="article:tag" content="blue lotus" />
        <meta property="article:tag" content="natural sleep remedies" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Natural Remedies For Sleep Aid" />
        <meta name="twitter:description" content="Explore proven natural remedies to support restful sleep. Learn how Blue Lotus, a traditional botanical, may help improve sleep quality without harsh pharmaceuticals." />
        <meta name="twitter:image" content="/images/articles/blue-lotus-sleep-guide.jpg" />
        <link rel="canonical" href="https://bluedreamtea.co.uk/articles/natural-remedies-for-sleep-aid" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(recommendedProductsSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <GuideLayout
        title="Natural Remedies For Sleep Aid"
        description="Explore proven natural remedies to support restful sleep. Learn how Blue Lotus, a traditional botanical, may help improve sleep quality without harsh pharmaceuticals."
        publishDate="2025-01-15T10:00:00Z"
        lastModified="2025-01-15T10:00:00Z"
        category="wellness"
        featuredImage="/images/articles/blue-lotus-sleep-guide.jpg"
        keywords={[
          'natural sleep remedies',
          'blue lotus sleep',
          'botanical sleep aids',
          'relaxation tea',
          'sleep herbs',
          'blue lotus effects',
          'non-pharmaceutical sleep aid',
          'plant-based sleep support'
        ]}
        wordCount={2600}
        readingTime="13 min read"
      >
        <RichText
          heading="Natural Sleep Aids That Actually Work"
          content={
            <div>
              <p>In our fast-paced world, restful sleep can be difficult to achieve. Many turn to pharmaceuticals, but these can bring unwanted side effects. Thankfully, nature provides a variety of safe, effective sleep aids—including Blue Lotus. Learn more about Blue Lotus's sleep-supporting properties in our guide on <Link to="/articles/does-blue-lotus-flower-make-you-sleepy" className="text-blue-600 hover:text-blue-800">Blue Lotus and sleep</Link>.</p>
              <p>This guide explores the best natural remedies for sleep, including how to use Blue Lotus to support your nightly wind-down routine. For more information about Blue Lotus's effects, see our guide on <Link to="/articles/blue-lotus-flower-effects" className="text-blue-600 hover:text-blue-800">Blue Lotus effects</Link>.</p>
            </div>
          }
        />

        <RichText
          heading="Understanding Sleep Support"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Natural Sleep Aids</h3>
              <p>Popular botanical options include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Blue Lotus Flower</li>
                <li>Chamomile</li>
                <li>Valerian Root</li>
                <li>Passionflower</li>
                <li>Lavender</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">How They Work</h3>
              <p>Natural mechanisms include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>GABA support</li>
                <li>Stress reduction</li>
                <li>Muscle relaxation</li>
                <li>Nervous system calming</li>
                <li>Hormone balance</li>
              </ul>
            </div>
          }
        />

        <RichText
          heading="Blue Lotus for Sleep"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Sleep Benefits</h3>
              <p>How Blue Lotus helps:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Natural relaxation</li>
                <li>Mental quieting</li>
                <li>Dream enhancement</li>
                <li>Sleep cycle support</li>
                <li>Gentle sedation</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Usage Methods</h3>
              <p>Different ways to use:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Evening tea</li>
                <li>Bath soaks</li>
                <li>Aromatherapy</li>
                <li>Tinctures</li>
                <li>Herbal blends</li>
              </ul>

              <p className="mt-4">For detailed preparation instructions, see our guide on <Link to="/articles/how-to-use-blue-lotus-flower" className="text-blue-600 hover:text-blue-800">how to use Blue Lotus</Link>.</p>
            </div>
          }
        />

        <RecommendedProducts
          heading="Sleep Support Products"
          description="Explore our selection of quality Blue Lotus products for better sleep:"
          productSlugs={[
            'blue-lotus-flower-tea-bags',
            'blue-lotus-flower-tea-cut',
            'blue-lotus-flower'
          ]}
        />

        <RichText
          heading="Best Practices"
          content={
            <div>
              <h3 className="text-xl font-semibold mb-4">Sleep Hygiene</h3>
              <p>Important habits include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Consistent schedule</li>
                <li>Dark environment</li>
                <li>Cool temperature</li>
                <li>Quiet space</li>
                <li>Comfortable bedding</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Timing Guidelines</h3>
              <p>When to use remedies:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>30-60 minutes before bed</li>
                <li>After evening meal</li>
                <li>During wind-down routine</li>
                <li>With relaxation practices</li>
                <li>Before meditation</li>
              </ul>

              <p className="mt-4">For more information about safety considerations, read our guide on <Link to="/articles/blue-lotus-flower-side-effects" className="text-blue-600 hover:text-blue-800">Blue Lotus side effects</Link>.</p>
            </div>
          }
        />

        <FAQComponent
          title="FAQs About Natural Sleep Aids"
          faqs={[
            {
              question: "Is Blue Lotus good for sleep?",
              answer: "Yes, many users find Blue Lotus helps them relax and prepare for sleep, especially when consumed as a tea or infusion in the evening. Its natural compounds support relaxation without harsh side effects."
            },
            {
              question: "What are the best natural remedies for sleep?",
              answer: "Popular remedies include chamomile, lavender, valerian root, passionflower, and Blue Lotus. Each supports sleep in a slightly different way, with Blue Lotus offering both relaxation and potential dream enhancement."
            },
            {
              question: "Are plant-based sleep aids safe?",
              answer: "Generally, yes—when used properly and in moderation. Always start with a small amount and avoid mixing with alcohol or sedatives. Consult healthcare providers about specific combinations."
            },
            {
              question: "How do I use Blue Lotus for sleep?",
              answer: "Blue Lotus is most commonly used as a tea. Steep the dried petals in hot water for 5–10 minutes and enjoy 30–60 minutes before bedtime. Other methods include bath soaks and aromatherapy."
            },
            {
              question: "How long does it take to work?",
              answer: "Most people feel relaxation effects within 30-60 minutes. Regular use may help establish better sleep patterns over time."
            },
            {
              question: "Can I use natural sleep aids every night?",
              answer: "While generally safe for regular use, it's good to rotate between different herbs and take occasional breaks to prevent tolerance buildup."
            },
            {
              question: "What's the best time to take sleep aids?",
              answer: "Take natural sleep aids 30-60 minutes before your intended bedtime. This allows time for the calming effects to develop naturally."
            },
            {
              question: "Do natural sleep aids cause grogginess?",
              answer: "Most natural sleep aids, including Blue Lotus, are gentle and don't typically cause morning grogginess when used as directed."
            },
            {
              question: "Can I combine different sleep herbs?",
              answer: "Yes, many herbs work well together. However, start with one at a time to understand your response before combining."
            },
            {
              question: "What if natural sleep aids don't work?",
              answer: "If natural remedies aren't effective, consider reviewing sleep hygiene practices and consulting healthcare providers about other options."
            }
          ]}
        />

        <CTAButtons
          title="Support Your Sleep Naturally"
          description="Explore our selection of high-quality Blue Lotus products designed to help you unwind, relax, and rest deeply."
          buttons={[
            {
              label: "Shop Sleep Support Products",
              href: "/products",
              variant: "primary",
              ariaLabel: "Shop Blue Lotus and natural sleep support products"
            },
            {
              label: "Learn About Blue Lotus",
              href: "/articles/what-is-blue-lotus-flower",
              variant: "secondary",
              ariaLabel: "Read our detailed guide on Blue Lotus benefits"
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

export default NaturalRemediesForSleepAid;
