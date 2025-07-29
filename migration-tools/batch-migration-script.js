#!/usr/bin/env node

/**
 * Batch Migration Script for Blue Lotus Articles
 * 
 * This script helps migrate multiple articles from Shopify to your custom site.
 * It creates article files, updates the guides.ts file, and sets up the directory structure.
 * 
 * Usage:
 * node batch-migration-script.js --input articles.json
 * 
 * Input JSON format:
 * [
 *   {
 *     "title": "Article Title",
 *     "description": "Meta description",
 *     "slug": "article-slug",
 *     "category": "category-name",
 *     "templateType": "product-guide",
 *     "keywords": ["keyword1", "keyword2"],
 *     "shopifySlug": "blogs/original/path",
 *     "content": "Original content from Shopify (optional)",
 *     "priority": "high|medium|low"
 *   }
 * ]
 */

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

// Template configurations
const ARTICLE_TEMPLATES = {
  'product-guide': {
    name: 'Product Guide Template',
    sections: ['introduction', 'what-is-product', 'benefits-effects', 'how-to-use', 'faq', 'product-cta']
  },
  'educational': {
    name: 'Educational Content Template', 
    sections: ['introduction', 'background-history', 'scientific-explanation', 'practical-applications', 'faq', 'further-reading-cta']
  },
  'brewing-guide': {
    name: 'Brewing/Recipe Guide Template',
    sections: ['introduction', 'ingredients-tools', 'step-by-step', 'variations', 'tips-tricks', 'faq', 'product-cta']
  },
  'wellness': {
    name: 'Wellness Benefits Template',
    sections: ['introduction', 'what-research-says', 'potential-benefits', 'how-to-incorporate', 'safety-considerations', 'faq', 'wellness-products-cta']
  }
};

// Category mapping
const CATEGORY_MAPPING = {
  'getting-started': 'getting-started',
  'brewing-guides': 'brewing-guides', 
  'wellness': 'wellness',
  'recipes': 'recipes',
  'general': 'general',
  'usage-guides': 'usage-guides',
  'product-information': 'product-information',
  'education': 'education',
  'culture-history': 'culture-history',
  'comparison-guides': 'comparison-guides'
};

class ArticleMigrator {
  constructor(options = {}) {
    this.articlesDir = path.join(process.cwd(), 'src/pages/articles');
    this.guidesFile = path.join(process.cwd(), 'src/constants/guides.ts');
    this.dryRun = options.dryRun || false;
    this.verbose = options.verbose || false;
  }

  log(message, level = 'info') {
    if (this.verbose || level === 'error') {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
    }
  }

  async migrateArticles(articles) {
    this.log(`Starting migration of ${articles.length} articles`);
    
    const results = {
      success: [],
      failed: [],
      skipped: []
    };

    // Sort by priority (high -> medium -> low)
    const sortedArticles = this.sortByPriority(articles);

    for (const article of sortedArticles) {
      try {
        await this.migrateArticle(article);
        results.success.push(article.slug);
        this.log(`✅ Successfully migrated: ${article.slug}`);
      } catch (error) {
        results.failed.push({ slug: article.slug, error: error.message });
        this.log(`❌ Failed to migrate ${article.slug}: ${error.message}`, 'error');
      }
    }

    // Update guides.ts with all new articles
    if (!this.dryRun && results.success.length > 0) {
      await this.updateGuidesFile(sortedArticles.filter(a => results.success.includes(a.slug)));
    }

    return results;
  }

  sortByPriority(articles) {
    const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
    return articles.sort((a, b) => {
      const aPriority = priorityOrder[a.priority] || 3;
      const bPriority = priorityOrder[b.priority] || 3;
      return aPriority - bPriority;
    });
  }

  async migrateArticle(article) {
    // Validate article data
    this.validateArticle(article);

    // Generate article content
    const content = this.generateArticleContent(article);
    
    // Create directory
    const articleDir = path.join(this.articlesDir, article.slug);
    const articleFile = path.join(articleDir, 'page.tsx');

    if (!this.dryRun) {
      // Create directory if it doesn't exist
      if (!fs.existsSync(articleDir)) {
        fs.mkdirSync(articleDir, { recursive: true });
      }

      // Write article file
      fs.writeFileSync(articleFile, content);
    }

    this.log(`📝 ${this.dryRun ? '[DRY RUN] ' : ''}Created article: ${articleFile}`);
  }

  validateArticle(article) {
    const required = ['title', 'description', 'slug', 'category', 'templateType'];
    for (const field of required) {
      if (!article[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (!ARTICLE_TEMPLATES[article.templateType]) {
      throw new Error(`Invalid template type: ${article.templateType}`);
    }

    if (!CATEGORY_MAPPING[article.category]) {
      throw new Error(`Invalid category: ${article.category}`);
    }
  }

  generateArticleContent(article) {
    const template = ARTICLE_TEMPLATES[article.templateType];
    const pascalSlug = this.toPascalCase(article.slug);
    
    return `import React from 'react';
import GuideLayout from '../GuideLayout';
import RichText from '../../../components/sub-components/rich-text';
import FAQComponent from '../../../components/sub-components/faq-component';
import HowToComponent from '../../../components/sub-components/how-to-component';
import CTAButtons from '../../../components/sub-components/cta-buttons';

const ${pascalSlug}: React.FC = () => {
  return (
    <GuideLayout
      title="${article.title}"
      description="${article.description}"
      category="${article.category}"
      publishDate="${new Date().toISOString()}"
      ${article.keywords ? `keywords={${JSON.stringify(article.keywords)}}` : ''}
      ${article.shopifySlug ? `// Original Shopify URL: ${article.shopifySlug}` : ''}
    >
      ${this.generateSectionComponents(template.sections, article)}
    </GuideLayout>
  );
};

export default ${pascalSlug};
`;
  }

  generateSectionComponents(sections, article) {
    return sections.map(section => {
      switch (section) {
        case 'introduction':
          return this.generateIntroSection(article);
        case 'what-is-product':
          return this.generateWhatIsSection(article);
        case 'benefits-effects':
          return this.generateBenefitsSection(article);
        case 'how-to-use':
        case 'step-by-step':
          return this.generateHowToSection(article);
        case 'faq':
          return this.generateFAQSection(article);
        case 'product-cta':
          return this.generateProductCTASection(article);
        case 'wellness-products-cta':
          return this.generateWellnessCTASection(article);
        default:
          return this.generateCustomSection(section, article);
      }
    }).join('\n\n      ');
  }

  generateIntroSection(article) {
    return `<RichText
        heading="Introduction"
        content={
          <div>
            <p>
              ${article.content ? 
                this.extractIntroFromContent(article.content) : 
                '[Write an engaging introduction that hooks the reader and explains what they\'ll learn in this comprehensive guide.]'
              }
            </p>
            <p>In this article, you'll discover:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>[Key point 1 that readers will learn]</li>
              <li>[Key point 2 that adds value]</li>
              <li>[Key point 3 that makes this guide unique]</li>
            </ul>
          </div>
        }
        className="mb-8"
      />`;
  }

  generateWhatIsSection(article) {
    return `<RichText
        heading="What is Blue Lotus Flower?"
        content={
          <div>
            <p>[Comprehensive explanation of blue lotus flower, its scientific name Nymphaea Caerulea, and key characteristics]</p>
            <h3 className="mt-6 mb-2 font-semibold">Key Characteristics:</h3>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>[Characteristic 1 - e.g., Sacred flower from ancient Egypt]</li>
              <li>[Characteristic 2 - e.g., Natural relaxation properties]</li>
              <li>[Characteristic 3 - e.g., Beautiful blue petals and unique aroma]</li>
            </ul>
          </div>
        }
        className="mb-8"
      />`;
  }

  generateBenefitsSection(article) {
    return `<RichText
        heading="Benefits and Effects"
        content={
          <div>
            <p>[Detailed explanation of potential benefits and effects based on traditional use and modern understanding]</p>
            <h3 className="mt-6 mb-2 font-semibold">Potential Benefits:</h3>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Relaxation:</strong> [Explanation of calming properties]</li>
              <li><strong>Wellness:</strong> [Explanation of wellness benefits]</li>
              <li><strong>Traditional Use:</strong> [Historical usage context]</li>
            </ul>
            <p className="mt-4"><em>Note: These statements have not been evaluated by the FDA. Individual results may vary.</em></p>
          </div>
        }
        className="mb-8"
      />`;
  }

  generateHowToSection(article) {
    return `<HowToComponent
        title="How to Use Blue Lotus"
        description="Step-by-step guide for best results"
        steps={[
          {
            title: "Prepare Your Blue Lotus",
            content: "[Instructions for preparation - varies by product type]"
          },
          {
            title: "Follow Proper Dosage",
            content: "[Guidelines for safe and effective use]"
          },
          {
            title: "Enjoy Mindfully",
            content: "[Best practices for optimal experience]"
          }
        ]}
        totalTime="PT15M"
        difficulty="Beginner"
        className="mb-8"
      />`;
  }

  generateFAQSection(article) {
    return `<FAQComponent
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "Is blue lotus safe to use?",
            answer: "Blue lotus is generally considered safe for most people when used as directed. However, consult with a healthcare provider if you have any concerns or medical conditions."
          },
          {
            question: "How long do effects typically last?",
            answer: "[Information about duration based on usage method and individual factors]"
          },
          {
            question: "Can I use blue lotus with other herbs?",
            answer: "[Information about combinations and compatibility]"
          },
          {
            question: "Where can I buy high-quality blue lotus?",
            answer: "Blue Dream Tea UK offers premium blue lotus products sourced from trusted suppliers. <a href='/products' className='text-blue-600 underline'>Shop our collection</a> for guaranteed quality and freshness."
          }
        ]}
        className="mb-8"
      />`;
  }

  generateProductCTASection(article) {
    return `<CTAButtons
        title="Ready to Experience Premium Blue Lotus?"
        description="Discover our carefully curated collection of high-quality blue lotus products."
        buttons={[
          {
            label: "Shop Blue Lotus Products",
            href: "/products",
            variant: "primary",
            ariaLabel: "Browse our premium blue lotus collection"
          },
          {
            label: "Learn More",
            href: "/articles",
            variant: "secondary",
            ariaLabel: "Read more blue lotus articles and guides"
          }
        ]}
        align="center"
        className="mt-12"
      />`;
  }

  generateWellnessCTASection(article) {
    return `<CTAButtons
        title="Start Your Wellness Journey"
        description="Explore our wellness-focused blue lotus products for relaxation and well-being."
        buttons={[
          {
            label: "Shop Wellness Collection",
            href: "/products?category=wellness",
            variant: "primary",
            ariaLabel: "Browse wellness-focused blue lotus products"
          },
          {
            label: "More Wellness Articles",
            href: "/articles?category=wellness",
            variant: "secondary",
            ariaLabel: "Read more wellness and benefits articles"
          }
        ]}
        align="center"
        className="mt-12"
      />`;
  }

  generateCustomSection(sectionName, article) {
    const heading = this.toTitleCase(sectionName.replace(/-/g, ' '));
    return `<RichText
        heading="${heading}"
        content={
          <div>
            <p>[Content for ${heading} section - customize based on your needs]</p>
            {/* TODO: Add specific content for this section */}
          </div>
        }
        className="mb-8"
      />`;
  }

  async updateGuidesFile(articles) {
    this.log('Updating guides.ts file with new articles');
    
    try {
      // Read current guides.ts content
      const guidesContent = fs.readFileSync(this.guidesFile, 'utf8');
      
      // Generate new guide entries
      const newEntries = articles.map(article => {
        const readTime = article.wordCount ? `${Math.ceil(article.wordCount / 200)} min` : '5 min';
        return `  '${article.slug}': {
    title: '${article.title}',
    description: '${article.description}',
    category: '${article.category}',
    readTime: '${readTime}',
    difficulty: 'Beginner',${article.keywords ? `
    keywords: ${JSON.stringify(article.keywords)},` : ''}${article.shopifySlug ? `
    shopifySlug: '${article.shopifySlug}'` : ''}
  }`;
      }).join(',\n');

      // Insert new entries into the guides file
      const updatedContent = guidesContent.replace(
        /\/\/ You'll add your remaining 94\+ articles here following this structure/,
        `${newEntries},
  // Add remaining articles here`
      );

      if (!this.dryRun) {
        fs.writeFileSync(this.guidesFile, updatedContent);
      }
      
      this.log(`📝 ${this.dryRun ? '[DRY RUN] ' : ''}Updated guides.ts with ${articles.length} new entries`);
    } catch (error) {
      this.log(`Failed to update guides.ts: ${error.message}`, 'error');
    }
  }

  extractIntroFromContent(content) {
    // Simple extraction of first paragraph from Shopify content
    const firstParagraph = content.split('\n')[0];
    return firstParagraph.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
  }

  toPascalCase(str) {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  toTitleCase(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

// CLI Interface
const argv = yargs
  .option('input', {
    alias: 'i',
    description: 'JSON file containing articles to migrate',
    type: 'string',
    demandOption: true
  })
  .option('dry-run', {
    alias: 'd',
    description: 'Preview changes without creating files',
    type: 'boolean',
    default: false
  })
  .option('verbose', {
    alias: 'v',
    description: 'Enable verbose logging',
    type: 'boolean',
    default: false
  })
  .help()
  .alias('help', 'h')
  .argv;

async function main() {
  try {
    // Read input file
    const inputFile = path.resolve(argv.input);
    if (!fs.existsSync(inputFile)) {
      console.error(`❌ Input file not found: ${inputFile}`);
      process.exit(1);
    }

    const articles = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    
    if (!Array.isArray(articles)) {
      console.error('❌ Input file must contain an array of articles');
      process.exit(1);
    }

    // Initialize migrator
    const migrator = new ArticleMigrator({
      dryRun: argv.dryRun,
      verbose: argv.verbose
    });

    // Run migration
    const results = await migrator.migrateArticles(articles);

    // Print results
    console.log('\n📊 Migration Results:');
    console.log(`✅ Successful: ${results.success.length}`);
    console.log(`❌ Failed: ${results.failed.length}`);
    console.log(`⏭️  Skipped: ${results.skipped.length}`);

    if (results.failed.length > 0) {
      console.log('\n❌ Failed articles:');
      results.failed.forEach(({ slug, error }) => {
        console.log(`  - ${slug}: ${error}`);
      });
    }

    if (argv.dryRun) {
      console.log('\n🔍 This was a dry run. Use --no-dry-run to create files.');
    }

  } catch (error) {
    console.error(`❌ Migration failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { ArticleMigrator, ARTICLE_TEMPLATES, CATEGORY_MAPPING }; 