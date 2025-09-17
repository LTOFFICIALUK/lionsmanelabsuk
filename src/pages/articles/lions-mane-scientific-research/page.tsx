import React from 'react';
import { Helmet } from 'react-helmet';
import GuideLayout from '../GuideLayout';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';

const LionsManeScientificResearch: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>The Science Behind Lion's Mane: Research and Studies | Lions Mane Labs UK</title>
        <meta name="description" content="Explore the scientific research behind Lion's Mane mushroom and its proven benefits for brain health and cognitive function." />
        <meta property="og:title" content="The Science Behind Lion's Mane: Research and Studies" />
        <meta property="og:description" content="Explore the scientific research behind Lion's Mane mushroom and its proven benefits for brain health and cognitive function." />
        <link rel="canonical" href="https://lionsmanelabs.co.uk/articles/lions-mane-scientific-research" />
      </Helmet>

        <RichText
          heading="Introduction to Lion's Mane Research"
          content={
            <div>
              <p>
                The scientific community has shown increasing interest in Lion's Mane mushroom (Hericium erinaceus) due to its potential neuroprotective and cognitive-enhancing properties. Over the past few decades, numerous studies have investigated the mushroom's active compounds and their effects on brain health.
              </p>
              <p>
                This comprehensive review examines the current scientific literature on Lion's Mane, including key studies, mechanisms of action, and clinical findings that support its traditional use in cognitive enhancement and neurological health.
              </p>
            </div>
          }
          className="mb-8"
        />

        <RichText
          heading="Key Active Compounds and Mechanisms"
          content={
            <div>
              <p>
                Lion's Mane contains several bioactive compounds that are responsible for its potential health benefits. The most studied compounds are hericenones and erinacines, which have shown remarkable potential in supporting brain health.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Hericenones:</strong> Found in the fruiting body, stimulate nerve growth factor (NGF) production</li>
                <li><strong>Erinacines:</strong> Present in the mycelium, also support NGF synthesis</li>
                <li><strong>Beta-glucans:</strong> Support immune system function</li>
                <li><strong>Phenolic compounds:</strong> Provide antioxidant protection</li>
              </ul>
            </div>
          }
          className="mb-8"
        />

        <RichText
          heading="Clinical Studies and Findings"
          content={
            <div>
              <p>
                Several clinical studies have investigated the effects of Lion's Mane on cognitive function, memory, and neurological health. While research is still evolving, preliminary results are promising.
              </p>
              <p>
                Key findings from human studies suggest potential benefits for cognitive function, memory enhancement, and mood support, though more large-scale clinical trials are needed to confirm these effects.
              </p>
            </div>
          }
          className="mb-8"
        />

        <FAQComponent
          title="Research Frequently Asked Questions"
          faqs={[
            {
              question: "What does the research say about Lion's Mane and memory?",
              answer: "Several studies suggest Lion's Mane may support memory function and cognitive performance, particularly in older adults. The research indicates potential benefits for both short-term and long-term memory."
            },
            {
              question: "Are there any side effects reported in the research?",
              answer: "Research generally shows Lion's Mane to be well-tolerated with minimal side effects. Some studies report mild digestive upset in a small percentage of participants."
            }
          ]}
          className="mb-8"
        />

        <CTAButtons
          title="Experience the Benefits of Lion's Mane"
          description="Try our scientifically-backed Lion's Mane products for cognitive enhancement."
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

export default LionsManeScientificResearch;
