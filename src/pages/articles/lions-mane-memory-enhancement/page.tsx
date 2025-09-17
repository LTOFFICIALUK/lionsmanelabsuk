import React from 'react';
import { Helmet } from 'react-helmet';
import GuideLayout from '../GuideLayout';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';

const LionsManeMemoryEnhancement: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Lion's Mane for Memory: Can It Really Improve Your Recall? | Lions Mane Labs UK</title>
        <meta name="description" content="Discover how Lion's Mane mushroom can enhance memory formation, retention, and recall through its unique neuroprotective properties." />
        <link rel="canonical" href="https://lionsmanelabs.co.uk/articles/lions-mane-memory-enhancement" />
      </Helmet>

        <RichText
          heading="How Lion's Mane Supports Memory"
          content={
            <div>
              <p>
                Lion's Mane mushroom has gained significant attention for its potential to support memory function and cognitive performance. Research suggests that its active compounds may help enhance memory formation, retention, and recall through several mechanisms.
              </p>
              <p>
                The mushroom's ability to stimulate nerve growth factor (NGF) production and support neuroplasticity makes it a promising natural option for those looking to enhance their memory and cognitive abilities.
              </p>
            </div>
          }
          className="mb-8"
        />

        <FAQComponent
          title="Memory Enhancement Questions"
          faqs={[
            {
              question: "How long does it take to see memory improvements with Lion's Mane?",
              answer: "Most people begin to notice subtle memory improvements within 2-4 weeks of consistent use. Significant benefits may take 6-8 weeks or longer to become apparent."
            },
            {
              question: "Can Lion's Mane help with age-related memory decline?",
              answer: "Some research suggests Lion's Mane may help support cognitive function in older adults, though more studies are needed to confirm these effects."
            }
          ]}
          className="mb-8"
        />

        <CTAButtons
          title="Enhance Your Memory with Lion's Mane"
          description="Try our premium Lion's Mane products for memory support."
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

export default LionsManeMemoryEnhancement;
