import { GuideCategory } from '../types';

export const GUIDE_CATEGORIES: Record<GuideCategory, string> = {
  'getting-started': 'Getting Started',
  'brewing-guides': 'Brewing Guides',
  'wellness': 'Wellness & Benefits',
  'recipes': 'Tea Recipes',
  'general': 'General Information',
  'usage-guides': 'Usage Guides',
  'product-information': 'Product Information',
  'education': 'Educational Content',
  'culture-history': 'Culture & History',
  'comparison-guides': 'Product Comparisons'
};

// Template structure for Lion's Mane articles
export const ALL_GUIDES: Record<string, { 
  title: string; 
  description: string; 
  category: GuideCategory; 
  readTime?: string; 
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  keywords?: string[];
  shopifySlug?: string; // To track original Shopify URLs for redirects
}> = {
  // Lion's Mane articles
  'what-is-lions-mane-mushroom': {
    title: 'What is Lion\'s Mane Mushroom? Complete Guide to Hericium Erinaceus',
    description: 'Discover everything about Lion\'s Mane mushroom (Hericium Erinaceus). Learn about its history, traditional uses, cognitive benefits, and how to incorporate this powerful nootropic into your wellness routine.',
    category: 'getting-started',
    readTime: '14 min',
    difficulty: 'Beginner',
    keywords: ['lions mane mushroom', 'hericium erinaceus', 'nootropic mushroom', 'cognitive enhancement', 'brain health', 'memory improvement', 'focus enhancement', 'mushroom supplements'],
    shopifySlug: 'blogs/education/what-is-lions-mane-mushroom'
  },
  'how-to-use-lions-mane-powder': {
    title: 'How to Use Lion\'s Mane Powder: Complete Usage Guide',
    description: 'Learn the perfect methods to use Lion\'s Mane powder. Discover dosage recommendations, mixing techniques, and tips for optimal cognitive benefits.',
    category: 'usage-guides',
    readTime: '8 min',
    difficulty: 'Beginner',
    keywords: ['lions mane powder', 'usage guide', 'how to use', 'dosage recommendations'],
    shopifySlug: 'blogs/guides/how-to-use-lions-mane-powder'
  },
  'lions-mane-cognitive-benefits': {
    title: 'Lion\'s Mane Cognitive Benefits: What You Need to Know',
    description: 'Explore the cognitive benefits and effects of Lion\'s Mane mushroom. Learn about memory enhancement, focus improvement, and neuroprotective properties.',
    category: 'wellness',
    readTime: '12 min',
    difficulty: 'Intermediate',
    keywords: ['lions mane benefits', 'cognitive enhancement', 'memory improvement', 'focus enhancement'],
    shopifySlug: 'blogs/wellness/lions-mane-cognitive-benefits'
  },
  'lions-mane-dosage-guide': {
    title: 'Lion\'s Mane Dosage Guide: Finding Your Perfect Amount',
    description: 'Everything you need to know about Lion\'s Mane dosage. Learn about optimal amounts, timing, and safety considerations for cognitive enhancement.',
    category: 'usage-guides',
    readTime: '10 min',
    difficulty: 'Intermediate',
    keywords: ['lions mane dosage', 'supplement dosage', 'cognitive enhancement', 'usage guide'],
    shopifySlug: 'blogs/usage/lions-mane-dosage-guide'
  },
  'lions-mane-vs-other-nootropics': {
    title: 'Lion\'s Mane vs Other Nootropics: Complete Comparison',
    description: 'Compare Lion\'s Mane mushroom with other cognitive enhancers like ginkgo, bacopa, and synthetic nootropics. Find the best option for your brain health.',
    category: 'comparison-guides',
    readTime: '15 min',
    difficulty: 'Advanced',
    keywords: ['lions mane comparison', 'nootropics comparison', 'cognitive enhancers', 'brain supplements'],
    shopifySlug: 'blogs/comparisons/lions-mane-vs-other-nootropics'
  },
  'lions-mane-scientific-research': {
    title: 'Lion\'s Mane Scientific Research: What Studies Show',
    description: 'Discover the fascinating scientific research on Lion\'s Mane mushroom, including clinical studies, neuroprotective effects, and cognitive benefits.',
    category: 'education',
    readTime: '12 min',
    difficulty: 'Intermediate',
    keywords: ['lions mane research', 'scientific studies', 'neuroprotection', 'cognitive research'],
    shopifySlug: 'blogs/education/lions-mane-scientific-research'
  }
  // You'll add your remaining 94+ articles here following this structure
}; 