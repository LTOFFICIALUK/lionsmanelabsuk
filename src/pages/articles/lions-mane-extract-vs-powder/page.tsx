import React from 'react';
import { Helmet } from 'react-helmet';
import GuideLayout from '../GuideLayout';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';

const LionsManeExtractVsPowder: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Lion's Mane Extract vs Powder: Which Form is Best? | Lions Mane Labs UK</title>
        <meta name="description" content="Compare Lion's Mane extract and powder to determine which form offers the best bioavailability and cognitive benefits." />
        <link rel="canonical" href="https://lionsmanelabs.co.uk/articles/lions-mane-extract-vs-powder" />
      </Helmet>

        <RichText
          heading="Understanding the Differences"
          content={
            <div>
              <p>
                Both Lion's Mane extract and powder offer unique advantages. Understanding these differences helps you choose the best form for your needs and lifestyle.
              </p>
            </div>
          }
          className="mb-8"
        />

        <FAQComponent
          title="Extract vs Powder Questions"
          faqs={[
            {
              question: "Which is more potent - extract or powder?",
              answer: "Extracts are typically more concentrated and potent, containing higher levels of active compounds per gram. However, both forms can be effective when used appropriately."
            }
          ]}
          className="mb-8"
        />

        <CTAButtons
          title="Choose Your Lion's Mane Form"
          description="Browse our selection of Lion's Mane extract and powder products."
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

export default LionsManeExtractVsPowder;
