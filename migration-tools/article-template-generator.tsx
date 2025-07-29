import React from 'react';
import GuideLayout from '../src/pages/articles/GuideLayout';
import Title from '../src/components/sub-components/title';
import RichText from '../src/components/sub-components/rich-text';
import FAQComponent from '../src/components/sub-components/faq-component';
import HowToComponent from '../src/components/sub-components/how-to-component';
import CTAButtons from '../src/components/sub-components/cta-buttons';
import { GuideCategory } from '../src/types';

// Template configurations for different article types
export const ARTICLE_TEMPLATES = {
  'product-guide': {
    name: 'Product Guide Template',
    description: 'For product-specific articles and reviews',
    sections: [
      'introduction',
      'what-is-product',
      'benefits-effects',
      'how-to-use',
      'comparison',
      'faq',
      'product-cta'
    ]
  },
  'educational': {
    name: 'Educational Content Template',
    description: 'For informational and educational articles',
    sections: [
      'introduction',
      'background-history',
      'scientific-explanation',
      'practical-applications',
      'myths-facts',
      'faq',
      'further-reading-cta'
    ]
  },
  'brewing-guide': {
    name: 'Brewing/Recipe Guide Template',
    description: 'For tea recipes and preparation guides',
    sections: [
      'introduction',
      'ingredients-tools',
      'step-by-step',
      'variations',
      'tips-tricks',
      'faq',
      'product-cta'
    ]
  },
  'wellness': {
    name: 'Wellness Benefits Template',
    description: 'For health and wellness focused articles',
    sections: [
      'introduction',
      'what-research-says',
      'potential-benefits',
      'how-to-incorporate',
      'safety-considerations',
      'faq',
      'wellness-products-cta'
    ]
  }
};

// Article template interface
interface ArticleTemplateProps {
  slug: string;
  title: string;
  description: string;
  category: GuideCategory;
  templateType: keyof typeof ARTICLE_TEMPLATES;
  keywords?: string[];
  shopifySlug?: string;
  publishDate?: string;
  author?: string;
  featuredImage?: string;
  wordCount?: number;
  customSections?: any[];
}

// Helper function to generate article template
export const generateArticleTemplate = (props: ArticleTemplateProps): string => {
  const template = ARTICLE_TEMPLATES[props.templateType];
  
  return `import React from 'react';
import GuideLayout from '../GuideLayout';
import Title from '../../../components/sub-components/title';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import HowToComponent from '../../../components/sub-components/how-to-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';

const ${toPascalCase(props.slug)}: React.FC = () => {
  return (
    <GuideLayout
      title="${props.title}"
      description="${props.description}"
      category="${props.category}"
      publishDate="${props.publishDate || new Date().toISOString()}"
      ${props.author ? `author="${props.author}"` : ''}
      ${props.featuredImage ? `featuredImage="${props.featuredImage}"` : ''}
      ${props.keywords ? `keywords={${JSON.stringify(props.keywords)}}` : ''}
      ${props.wordCount ? `wordCount={${props.wordCount}}` : ''}
    >
      ${generateSectionComponents(template.sections, props)}
    </GuideLayout>
  );
};

export default ${toPascalCase(props.slug)};`;
};

// Generate section components based on template
const generateSectionComponents = (sections: string[], props: ArticleTemplateProps): string => {
  return sections.map(section => {
    switch (section) {
      case 'introduction':
        return generateIntroSection(props);
      case 'what-is-product':
        return generateWhatIsSection(props);
      case 'benefits-effects':
        return generateBenefitsSection(props);
      case 'how-to-use':
        return generateHowToSection(props);
      case 'step-by-step':
        return generateStepByStepSection(props);
      case 'faq':
        return generateFAQSection(props);
      case 'product-cta':
        return generateProductCTASection(props);
      case 'wellness-products-cta':
        return generateWellnessCTASection(props);
      default:
        return generateCustomSection(section, props);
    }
  }).join('\n\n      ');
};

// Section generators
const generateIntroSection = (props: ArticleTemplateProps): string => {
  return `<RichText
        heading="Introduction"
        content={
          <div>
            <p>[Write an engaging introduction that hooks the reader and explains what they'll learn]</p>
            <p>Key points to cover:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>[Point 1 - what the article covers]</li>
              <li>[Point 2 - benefits of reading]</li>
              <li>[Point 3 - what makes this information valuable]</li>
            </ul>
          </div>
        }
        className="mb-8"
      />`;
};

const generateWhatIsSection = (props: ArticleTemplateProps): string => {
  return `<RichText
        heading="What is [Product Name]?"
        content={
          <div>
            <p>[Explain what the product is, its scientific name, origin, etc.]</p>
            <p>[Include key characteristics and what makes it unique]</p>
            <h3 className="mt-6 mb-2 font-semibold">Key Characteristics:</h3>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>[Characteristic 1]</li>
              <li>[Characteristic 2]</li>
              <li>[Characteristic 3]</li>
            </ul>
          </div>
        }
        className="mb-8"
      />`;
};

const generateBenefitsSection = (props: ArticleTemplateProps): string => {
  return `<RichText
        heading="Benefits and Effects"
        content={
          <div>
            <p>[Describe the potential benefits and effects]</p>
            <h3 className="mt-6 mb-2 font-semibold">Potential Benefits:</h3>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>[Benefit 1]:</strong> [Explanation]</li>
              <li><strong>[Benefit 2]:</strong> [Explanation]</li>
              <li><strong>[Benefit 3]:</strong> [Explanation]</li>
            </ul>
            <p className="mt-4"><em>Note: [Include any disclaimers about research, individual results, etc.]</em></p>
          </div>
        }
        className="mb-8"
      />`;
};

const generateHowToSection = (props: ArticleTemplateProps): string => {
  return `<HowToComponent
        title="How to Use [Product Name]"
        description="Step-by-step guide to get the best results"
        steps={[
          {
            title: "Step 1: [Action]",
            content: "[Detailed explanation of first step]",
            image: "/images/articles/step1.jpg"
          },
          {
            title: "Step 2: [Action]",
            content: "[Detailed explanation of second step]",
            image: "/images/articles/step2.jpg"
          },
          {
            title: "Step 3: [Action]",
            content: "[Detailed explanation of third step]"
          }
        ]}
        totalTime="PT15M"
        difficulty="Beginner"
        className="mb-8"
      />`;
};

const generateStepByStepSection = (props: ArticleTemplateProps): string => {
  return `<HowToComponent
        title="How to Make [Recipe Name]"
        description="Perfect brewing guide for delicious results"
        supplies={[
          { name: "[Supply 1]", quantity: "[Amount]" },
          { name: "[Supply 2]", quantity: "[Amount]" },
          { name: "[Supply 3]", quantity: "[Amount]" }
        ]}
        steps={[
          {
            title: "Prepare Your Ingredients",
            content: "[Preparation instructions]"
          },
          {
            title: "Heat the Water",
            content: "[Water heating instructions with specific temperature]"
          },
          {
            title: "Steep and Serve",
            content: "[Steeping time and serving instructions]"
          }
        ]}
        totalTime="PT10M"
        difficulty="Beginner"
        className="mb-8"
      />`;
};

const generateFAQSection = (props: ArticleTemplateProps): string => {
  return `<FAQComponent
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "[Common question 1]?",
            answer: "[Detailed answer providing value and addressing concern]"
          },
          {
            question: "[Common question 2]?",
            answer: "[Detailed answer with helpful information]"
          },
          {
            question: "[Common question 3]?",
            answer: "[Detailed answer that might include links to products]"
          },
          {
            question: "Is [product] safe to use?",
            answer: "[Safety information and any necessary disclaimers]"
          },
          {
            question: "Where can I buy high-quality [product]?",
            answer: "Blue Dream Tea UK offers premium [product] sourced from [location]. <a href='/products' className='text-blue-600 underline'>Shop our collection</a> for the best quality and value."
          }
        ]}
        className="mb-8"
      />`;
};

const generateProductCTASection = (props: ArticleTemplateProps): string => {
  return `<CTAButtons
        title="Ready to Try Premium Blue Lotus?"
        description="Experience the quality difference with our carefully sourced blue lotus products."
        buttons={[
          {
            label: "Shop Blue Lotus Products",
            href: "/products",
            variant: "primary",
            ariaLabel: "Browse our blue lotus product collection"
          },
          {
            label: "Learn More About Blue Lotus",
            href: "/articles/what-is-blue-lotus-flower",
            variant: "secondary",
            ariaLabel: "Read our complete guide to blue lotus"
          }
        ]}
        align="center"
        className="mt-12"
      />`;
};

const generateWellnessCTASection = (props: ArticleTemplateProps): string => {
  return `<CTAButtons
        title="Start Your Wellness Journey"
        description="Discover our premium wellness collection designed for relaxation and well-being."
        buttons={[
          {
            label: "Browse Wellness Products",
            href: "/products?category=wellness",
            variant: "primary",
            ariaLabel: "Shop wellness-focused blue lotus products"
          },
          {
            label: "Read More Wellness Articles",
            href: "/articles?category=wellness",
            variant: "secondary",
            ariaLabel: "Explore more wellness and benefits articles"
          }
        ]}
        align="center"
        className="mt-12"
      />`;
};

const generateCustomSection = (sectionName: string, props: ArticleTemplateProps): string => {
  return `<RichText
        heading="${toTitleCase(sectionName.replace(/-/g, ' '))}"
        content={
          <div>
            <p>[Content for ${sectionName} section]</p>
            {/* Add your custom content here */}
          </div>
        }
        className="mb-8"
      />`;
};

// Utility functions
const toPascalCase = (str: string): string => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

const toTitleCase = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Example usage for generating articles
export const createArticleFromTemplate = (config: ArticleTemplateProps) => {
  const content = generateArticleTemplate(config);
  const filename = `${config.slug}/page.tsx`;
  
  return {
    filename,
    content,
    directory: `src/pages/articles/${config.slug}`,
    guideEntry: {
      [config.slug]: {
        title: config.title,
        description: config.description,
        category: config.category,
        keywords: config.keywords,
        shopifySlug: config.shopifySlug,
        readTime: config.wordCount ? `${Math.ceil(config.wordCount / 200)} min` : undefined,
        difficulty: 'Beginner' as const
      }
    }
  };
};

// Batch creation helper
export const createMultipleArticles = (configs: ArticleTemplateProps[]) => {
  return configs.map(config => createArticleFromTemplate(config));
};

export default generateArticleTemplate; 