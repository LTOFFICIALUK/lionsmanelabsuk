import React from 'react';
import { Helmet } from 'react-helmet';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';
import RecommendedProducts from '../../../components/sub-components/recommended-products';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../../constants/products';

const LionsManeSideEffects: React.FC = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Lion\'s Mane Side Effects: What You Need to Know',
    description: 'Understanding potential side effects and safety considerations when using Lion\'s Mane mushroom supplements.',
    image: '/images/articles/lions-mane-side-effects.jpg',
    datePublished: '2025-01-15T10:00:00Z',
    dateModified: '2025-01-15T10:00:00Z',
    author: {
      '@type': 'Organization',
      name: "Lions Mane Labs UK"
    },
    publisher: {
      '@type': 'Organization',
      name: "Lions Mane Labs UK",
      logo: {
        '@type': 'ImageObject',
        url: 'https://lionsmanelabs.co.uk/logo.png'
      }
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://lionsmanelabs.co.uk'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: 'https://lionsmanelabs.co.uk/articles'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Lion\'s Mane Side Effects',
        item: 'https://lionsmanelabs.co.uk/articles/lions-mane-side-effects'
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Lion's Mane Side Effects: What You Need to Know | Lions Mane Labs UK</title>
        <meta name="description" content="Understanding potential side effects and safety considerations when using Lion's Mane mushroom supplements." />
        <meta name="keywords" content="lions mane side effects, safety, precautions, health considerations, supplement safety" />
        <meta property="og:title" content="Lion's Mane Side Effects: What You Need to Know" />
        <meta property="og:description" content="Understanding potential side effects and safety considerations when using Lion's Mane mushroom supplements." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lionsmanelabs.co.uk/articles/lions-mane-side-effects" />
        <meta property="og:image" content="https://lionsmanelabs.co.uk/images/articles/lions-mane-side-effects.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lion's Mane Side Effects: What You Need to Know" />
        <meta name="twitter:description" content="Understanding potential side effects and safety considerations when using Lion's Mane mushroom supplements." />
        <meta name="twitter:image" content="https://lionsmanelabs.co.uk/images/articles/lions-mane-side-effects.jpg" />
        <link rel="canonical" href="https://lionsmanelabs.co.uk/articles/lions-mane-side-effects" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

        <RichText
          heading="Understanding Lion's Mane Side Effects and Safety"
          content={
            <div>
              <p>
                Lion's Mane mushroom (Hericium Erinaceus) is generally considered one of the safest nootropic supplements available, with an excellent safety profile backed by extensive research. However, like any supplement, it's important to understand potential side effects and safety considerations to make informed decisions about your health.
              </p>
              
              <p>
                The good news is that Lion's Mane has been used safely for centuries in traditional medicine and has undergone rigorous scientific testing. Most users experience no adverse effects, and when side effects do occur, they are typically mild and temporary.
              </p>

              <div className="bg-green-50 border-l-4 border-green-400 p-6 my-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Safety First</h3>
                <p className="text-green-700">
                  Lion's Mane is classified as Generally Recognized as Safe (GRAS) and has been used safely in traditional medicine for over 1,000 years. Clinical studies show minimal side effects even at high doses.
                </p>
              </div>
            </div>
          }
        />

        <RichText
          heading="Common Side Effects of Lion's Mane"
          content={
            <div>
              <p>
                While Lion's Mane is well-tolerated by most people, some users may experience mild side effects, particularly when first starting supplementation or when taking higher doses. Understanding these potential effects can help you make informed decisions about dosage and timing.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6">1. Digestive Discomfort</h3>
              <p>
                The most commonly reported side effect is mild digestive discomfort, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Nausea (especially on an empty stomach)</li>
                <li>Stomach upset or cramping</li>
                <li>Bloating or gas</li>
                <li>Diarrhea (rare, usually with high doses)</li>
              </ul>
              <p>
                These effects are typically mild and often resolve within a few days as your body adjusts to the supplement. Taking Lion's Mane with food can significantly reduce digestive discomfort.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6">2. Allergic Reactions</h3>
              <p>
                Some individuals may experience allergic reactions to Lion's Mane, particularly those with known mushroom allergies. Symptoms may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Skin rash or hives</li>
                <li>Itching</li>
                <li>Swelling of the face, lips, or throat</li>
                <li>Difficulty breathing</li>
              </ul>
              <p>
                If you experience any signs of an allergic reaction, discontinue use immediately and consult a healthcare professional.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6">3. Headaches</h3>
              <p>
                Some users report mild headaches when first starting Lion's Mane, which may be related to the mushroom's effects on brain function and blood flow. These headaches are typically temporary and may indicate that the supplement is beginning to work.
              </p>
            </div>
          }
        />

        <RichText
          heading="Rare and Serious Side Effects"
          content={
            <div>
              <p>
                Serious side effects from Lion's Mane are extremely rare, but it's important to be aware of potential concerns, especially for individuals with specific health conditions or those taking certain medications.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6">Blood Sugar Effects</h3>
              <p>
                Lion's Mane may have mild blood sugar-lowering effects, which could be problematic for individuals with diabetes or hypoglycemia. If you have blood sugar concerns, monitor your levels closely and consult your healthcare provider before starting supplementation.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6">Bleeding Risk</h3>
              <p>
                Some research suggests that Lion's Mane may have mild anticoagulant properties. While this is generally beneficial for cardiovascular health, it could potentially increase bleeding risk in individuals taking blood-thinning medications or those with bleeding disorders.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6">Autoimmune Conditions</h3>
              <p>
                Lion's Mane may stimulate the immune system, which could potentially worsen symptoms in individuals with autoimmune conditions. If you have an autoimmune disorder, consult your healthcare provider before using Lion's Mane.
              </p>
            </div>
          }
        />

        <RichText
          heading="Drug Interactions and Contraindications"
          content={
            <div>
              <p>
                While Lion's Mane is generally safe, it's important to be aware of potential interactions with medications and health conditions. Always consult your healthcare provider before starting any new supplement, especially if you're taking medications or have underlying health conditions.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6">Medications to Watch</h3>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><strong>Blood thinners (Warfarin, Aspirin):</strong> May increase bleeding risk</li>
                <li><strong>Diabetes medications:</strong> May enhance blood sugar-lowering effects</li>
                <li><strong>Immunosuppressants:</strong> May interfere with immune system suppression</li>
                <li><strong>Anticoagulants:</strong> May increase bleeding risk</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Health Conditions to Consider</h3>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Diabetes or blood sugar disorders</li>
                <li>Bleeding disorders</li>
                <li>Autoimmune conditions</li>
                <li>Pregnancy or breastfeeding</li>
                <li>Upcoming surgery</li>
              </ul>
            </div>
          }
        />

        <RichText
          heading="How to Minimize Side Effects"
          content={
            <div>
              <p>
                Most side effects from Lion's Mane can be minimized or avoided with proper usage and dosage management. Here are evidence-based strategies to ensure a positive experience with Lion's Mane supplementation.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6">1. Start with Low Doses</h3>
              <p>
                Begin with a low dose (500-1000mg daily) and gradually increase over several weeks. This allows your body to adjust and helps identify your optimal dosage without overwhelming your system.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6">2. Take with Food</h3>
              <p>
                Taking Lion's Mane with meals can significantly reduce digestive discomfort and improve absorption. The presence of food helps buffer the supplement and provides a more gradual release into your system.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6">3. Choose Quality Products</h3>
              <p>
                Select high-quality Lion's Mane supplements from reputable manufacturers. Look for products that are third-party tested, use organic mushrooms, and provide clear information about extraction methods and potency.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6">4. Stay Hydrated</h3>
              <p>
                Proper hydration is essential when taking any supplement. Drink plenty of water throughout the day to support optimal absorption and help your body process the supplement effectively.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6">5. Monitor Your Response</h3>
              <p>
                Pay attention to how your body responds to Lion's Mane. Keep a simple journal to track any changes in mood, energy, sleep, or digestive function. This can help you identify your optimal dosage and timing.
              </p>
            </div>
          }
        />

        <RichText
          heading="When to Stop Taking Lion's Mane"
          content={
            <div>
              <p>
                While Lion's Mane is generally safe for long-term use, there are certain situations where you should discontinue use and consult a healthcare professional.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6">Immediate Discontinuation</h3>
              <p>
                Stop taking Lion's Mane immediately if you experience:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Signs of allergic reaction (rash, swelling, difficulty breathing)</li>
                <li>Severe digestive distress</li>
                <li>Unusual bleeding or bruising</li>
                <li>Significant changes in blood sugar levels</li>
                <li>Any other concerning symptoms</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Consult Your Doctor</h3>
              <p>
                Speak with your healthcare provider if you experience:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Persistent side effects that don't improve</li>
                <li>Worsening of existing health conditions</li>
                <li>Concerns about drug interactions</li>
                <li>Questions about long-term safety</li>
              </ul>
            </div>
          }
        />

        <RichText
          heading="Safety During Pregnancy and Breastfeeding"
          content={
            <div>
              <p>
                There is limited research on the safety of Lion's Mane during pregnancy and breastfeeding. While traditional use suggests it may be safe, the lack of comprehensive studies means caution is warranted.
              </p>

              <p>
                <strong>Recommendation:</strong> Avoid Lion's Mane during pregnancy and breastfeeding unless specifically recommended by your healthcare provider. The potential benefits don't outweigh the unknown risks during these critical periods.
              </p>

              <p>
                If you're planning to become pregnant or are currently breastfeeding and considering Lion's Mane, discuss the potential risks and benefits with your healthcare provider to make an informed decision.
              </p>
            </div>
          }
        />

        <FAQComponent
          faqs={[
            {
              question: "Are Lion's Mane side effects common?",
              answer: "No, side effects from Lion's Mane are relatively uncommon. Most users experience no adverse effects, and when side effects do occur, they are typically mild and temporary. The mushroom has an excellent safety profile backed by extensive research and centuries of traditional use."
            },
            {
              question: "How long do Lion's Mane side effects last?",
              answer: "Most side effects from Lion's Mane are temporary and resolve within a few days to a week as your body adjusts to the supplement. Digestive discomfort is the most common side effect and typically improves when taking the supplement with food or reducing the dosage."
            },
            {
              question: "Can Lion's Mane cause liver damage?",
              answer: "No, there is no evidence that Lion's Mane causes liver damage. In fact, some research suggests it may have hepatoprotective (liver-protecting) properties. However, if you have existing liver conditions, consult your healthcare provider before starting any new supplement."
            },
            {
              question: "Is it safe to take Lion's Mane with other supplements?",
              answer: "Lion's Mane is generally safe to take with other supplements, but it's important to consider potential interactions. It may enhance the effects of other nootropics or cognitive enhancers. Start with lower doses when combining supplements and monitor your response carefully."
            },
            {
              question: "Can Lion's Mane cause anxiety or panic attacks?",
              answer: "Lion's Mane is not known to cause anxiety or panic attacks. In fact, it's often used to help manage anxiety and stress. However, some individuals may be sensitive to its effects on brain function. If you experience increased anxiety, reduce your dosage or discontinue use."
            },
            {
              question: "Should I stop taking Lion's Mane before surgery?",
              answer: "Yes, it's recommended to stop taking Lion's Mane at least 2 weeks before any scheduled surgery due to its potential effects on bleeding and blood sugar levels. Always inform your surgical team about any supplements you're taking."
            }
          ]}
        />

        <CTAButtons
          title="Choose Safe Lion's Mane Products"
          description="Discover our premium, tested Lion's Mane products for safe supplementation."
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

        <RecommendedProducts
          heading="Featured Lion's Mane Products"
          description="High-quality Lion's Mane supplements for safe and effective cognitive enhancement"
          productSlugs={[
            'lions-mane-capsules',
            'lions-mane-powder',
            'lions-mane-extract-powder',
          ]}
        />
    </>
  );
};

export default LionsManeSideEffects;