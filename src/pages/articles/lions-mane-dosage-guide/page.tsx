import React from 'react';
import { Helmet } from 'react-helmet';
import GuideLayout from '../GuideLayout';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';

const LionsManeDosageGuide: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Lion's Mane Dosage Guide: Finding Your Perfect Amount | Lions Mane Labs UK</title>
        <meta name="description" content="Learn the optimal Lion's Mane dosage for different goals, from cognitive enhancement to nerve regeneration support." />
        <meta property="og:title" content="Lion's Mane Dosage Guide: Finding Your Perfect Amount" />
        <meta property="og:description" content="Learn the optimal Lion's Mane dosage for different goals, from cognitive enhancement to nerve regeneration support." />
        <link rel="canonical" href="https://lionsmanelabs.co.uk/articles/lions-mane-dosage-guide" />
      </Helmet>

        <RichText
          heading="Understanding Lion's Mane Dosage"
          content={
            <div>
              <p>
                Finding the right Lion's Mane dosage is crucial for maximizing benefits while ensuring safety. The optimal dose depends on several factors including your goals, body weight, tolerance, and the form of Lion's Mane you're using.
              </p>
              <p>
                This guide will help you determine the perfect dosage for your specific needs and circumstances.
              </p>
            </div>
          }
          className="mb-8"
        />

        <RichText
          heading="General Dosage Recommendations"
          content={
            <div>
              <h3 className="mt-6 mb-4 text-xl font-semibold">By Form:</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Powder:</strong> 1-3 grams daily</li>
                <li><strong>Capsules:</strong> 500-1000mg daily (2-3 capsules)</li>
                <li><strong>Extract:</strong> 500-1000mg daily</li>
                <li><strong>Tea:</strong> 1-2 cups daily</li>
                <li><strong>Tincture:</strong> 1-2 droppers full daily</li>
              </ul>
            </div>
          }
          className="mb-8"
        />

        <FAQComponent
          title="Dosage Frequently Asked Questions"
          faqs={[
            {
              question: "How do I know if I'm taking the right dose?",
              answer: "Start with the recommended dose and monitor your response. If you experience benefits without side effects, you've found your optimal dose. If you need more benefits, gradually increase the dose."
            },
            {
              question: "Can I take too much Lion's Mane?",
              answer: "Lion's Mane is generally safe, but very high doses may cause digestive upset. Stick to recommended dosages and consult a healthcare provider if you have concerns."
            }
          ]}
          className="mb-8"
        />

        <CTAButtons
          title="Start Your Lion's Mane Journey"
          description="Find the perfect Lion's Mane products for your dosage needs."
          buttons={[
            {
              label: "Shop Lion's Mane Products",
              href: "/products/lions-mane-capsules",
              variant: "primary",
              ariaLabel: "Browse Lion's Mane products"
            }
          ]}
          align="left"
          className="mt-12"
        />
    </>
  );
};

export default LionsManeDosageGuide;
