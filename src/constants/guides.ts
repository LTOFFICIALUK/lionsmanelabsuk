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

// Template structure for your blue lotus articles
export const ALL_GUIDES: Record<string, { 
  title: string; 
  description: string; 
  category: GuideCategory; 
  readTime?: string; 
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  keywords?: string[];
  shopifySlug?: string; // To track original Shopify URLs for redirects
}> = {
  // Example blue lotus articles - you'll expand this with your 100 pages
  'what-is-blue-lotus-flower': {
    title: 'What is Blue Lotus Flower? Complete Guide to Nymphaea Caerulea',
    description: 'Discover everything about blue lotus flower (Nymphaea Caerulea). Learn about its history, traditional uses, benefits, and how to incorporate this sacred Egyptian flower into your wellness routine.',
    category: 'getting-started',
    readTime: '14 min',
    difficulty: 'Beginner',
    keywords: ['blue lotus flower', 'nymphaea caerulea', 'sacred blue lily', 'egyptian lotus', 'blue lotus tea', 'blue lotus benefits', 'blue lotus history', 'lotus flower wellness'],
    shopifySlug: 'blogs/education/what-is-blue-lotus-flower'
  },
  'how-to-make-blue-lotus-tea': {
    title: 'How to Make Blue Lotus Tea: Complete Brewing Guide',
    description: 'Learn the perfect method to brew blue lotus tea. Discover steeping times, water temperatures, and tips for the best-tasting blue lotus flower tea.',
    category: 'brewing-guides',
    readTime: '6 min',
    difficulty: 'Beginner',
    keywords: ['blue lotus tea', 'brewing guide', 'how to make', 'steeping time'],
    shopifySlug: 'blogs/recipes/how-to-make-blue-lotus-tea'
  },
  'blue-lotus-benefits-effects': {
    title: 'Blue Lotus Benefits and Effects: What You Need to Know',
    description: 'Explore the potential benefits and effects of blue lotus flower. Learn about traditional uses, modern research, and what to expect.',
    category: 'wellness',
    readTime: '12 min',
    difficulty: 'Intermediate',
    keywords: ['blue lotus benefits', 'blue lotus effects', 'wellness', 'relaxation'],
    shopifySlug: 'blogs/wellness/blue-lotus-benefits-effects'
  },
  'blue-lotus-smoking-blend-guide': {
    title: 'Blue Lotus Smoking Blend: Complete Guide to Safe Usage',
    description: 'Everything you need to know about blue lotus smoking blends. Learn about preparation, effects, and safety considerations.',
    category: 'usage-guides',
    readTime: '10 min',
    difficulty: 'Intermediate',
    keywords: ['blue lotus smoking', 'smoking blend', 'herbal smoking', 'usage guide'],
    shopifySlug: 'blogs/usage/blue-lotus-smoking-blend-guide'
  },
  'blue-lotus-vs-other-herbs': {
    title: 'Blue Lotus vs Other Relaxing Herbs: Complete Comparison',
    description: 'Compare blue lotus flower with chamomile, lavender, and other relaxing herbs. Find the best option for your wellness routine.',
    category: 'comparison-guides',
    readTime: '15 min',
    difficulty: 'Advanced',
    keywords: ['blue lotus comparison', 'relaxing herbs', 'herbal comparison', 'wellness comparison'],
    shopifySlug: 'blogs/comparisons/blue-lotus-vs-other-herbs'
  },
  'history-of-blue-lotus-ancient-egypt': {
    title: 'The Sacred History of Blue Lotus in Ancient Egypt',
    description: 'Discover the fascinating history of blue lotus flower in ancient Egyptian culture, religious ceremonies, and daily life.',
    category: 'culture-history',
    readTime: '10 min',
    difficulty: 'Beginner',
    keywords: ['blue lotus history', 'ancient egypt', 'sacred flower', 'egyptian culture'],
    shopifySlug: 'blogs/history/blue-lotus-ancient-egypt'
  }
  // You'll add your remaining 94+ articles here following this structure
}; 