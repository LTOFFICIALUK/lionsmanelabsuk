import { ArticleCategory } from './article-categories';
import { ArticleTemplateType } from './article-templates';

export interface Article {
  title: string;
  description: string;
  slug: string;
  category: ArticleCategory;
  templateType: ArticleTemplateType;
  keywords: string[];
  shopifySlug?: string;
  priority: 'high' | 'medium' | 'low';
  wordCount: number;
  publishDate?: string;
  lastModified?: string;
  author?: string;
  featuredImage?: string;
}

export const ALL_ARTICLES: Record<string, Article> = {
  'benefits-of-blue-lotus': {
    title: 'Benefits of Blue Lotus: A Comprehensive Guide',
    description: 'Discover the many benefits of blue lotus flower, from relaxation to wellness support. Learn about traditional uses and modern applications.',
    slug: 'benefits-of-blue-lotus',
    category: 'wellness',
    templateType: 'educational',
    keywords: ['blue lotus benefits', 'blue lotus effects', 'natural wellness', 'herbal benefits'],
    priority: 'high',
    wordCount: 2400
  },
  'blue-lotus-a-natural-remedy-for-combating-seasonal-anxiety': {
    title: 'Blue Lotus: A Natural Remedy for Seasonal Anxiety',
    description: 'Learn how blue lotus flower can help manage seasonal anxiety and promote emotional balance naturally.',
    slug: 'blue-lotus-a-natural-remedy-for-combating-seasonal-anxiety',
    category: 'wellness',
    templateType: 'wellness',
    keywords: ['anxiety relief', 'seasonal anxiety', 'natural remedy', 'emotional wellness'],
    priority: 'high',
    wordCount: 2200
  },
  'blue-lotus-aromatherapy-guide': {
    title: 'Blue Lotus Aromatherapy Guide',
    description: 'Explore the aromatic benefits of blue lotus flower in aromatherapy practices.',
    slug: 'blue-lotus-aromatherapy-guide',
    category: 'usage-guides',
    templateType: 'how-to',
    keywords: ['aromatherapy', 'essential oils', 'natural fragrance', 'relaxation'],
    priority: 'medium',
    wordCount: 2000
  },
  'blue-lotus-detoxifying-effects': {
    title: 'The Detoxifying Effects of Blue Lotus',
    description: 'Understanding the cleansing and detoxifying properties of blue lotus flower.',
    slug: 'blue-lotus-detoxifying-effects',
    category: 'wellness',
    templateType: 'educational',
    keywords: ['detox', 'cleansing', 'natural detox', 'body cleanse'],
    priority: 'medium',
    wordCount: 2100
  },
  'blue-lotus-flower-effects': {
    title: 'Blue Lotus Effects: What to Expect',
    description: 'A detailed guide to the effects and experiences of using blue lotus flower.',
    slug: 'blue-lotus-flower-effects',
    category: 'education',
    templateType: 'educational',
    keywords: ['effects', 'experience', 'what to expect', 'blue lotus use'],
    priority: 'high',
    wordCount: 2800
  },
  'blue-lotus-flower-history': {
    title: 'The Rich History of Blue Lotus Flower',
    description: 'Explore the fascinating history and cultural significance of blue lotus flower.',
    slug: 'blue-lotus-flower-history',
    category: 'culture-history',
    templateType: 'educational',
    keywords: ['history', 'ancient egypt', 'cultural significance', 'traditions'],
    priority: 'medium',
    wordCount: 2500
  },
  'blue-lotus-flower-side-effects': {
    title: 'Blue Lotus Side Effects: What You Need to Know',
    description: 'Understanding potential side effects and safety considerations when using blue lotus flower.',
    slug: 'blue-lotus-flower-side-effects',
    category: 'education',
    templateType: 'educational',
    keywords: ['side effects', 'safety', 'precautions', 'health considerations'],
    priority: 'high',
    wordCount: 2200
  },
  'blue-lotus-flower-vs-weed': {
    title: 'Blue Lotus vs Cannabis: A Detailed Comparison',
    description: 'Compare and contrast the effects, benefits, and considerations of blue lotus flower and cannabis.',
    slug: 'blue-lotus-flower-vs-weed',
    category: 'comparison-guides',
    templateType: 'educational',
    keywords: ['comparison', 'alternatives', 'natural herbs', 'effects comparison'],
    priority: 'medium',
    wordCount: 2400
  },
  'blue-lotus-lucid-dreaming-deep-sleep': {
    title: 'Blue Lotus for Lucid Dreaming and Deep Sleep',
    description: 'Explore how blue lotus flower can enhance dream experiences and promote deeper sleep.',
    slug: 'blue-lotus-lucid-dreaming-deep-sleep',
    category: 'wellness',
    templateType: 'educational',
    keywords: ['lucid dreaming', 'deep sleep', 'dream enhancement', 'sleep quality'],
    priority: 'medium',
    wordCount: 2300
  },
  'can-you-grow-blue-lotus-flower-in-the-uk': {
    title: 'Growing Blue Lotus in the UK: Complete Guide',
    description: 'Learn how to successfully grow blue lotus flower in the UK climate, including care tips and requirements.',
    slug: 'can-you-grow-blue-lotus-flower-in-the-uk',
    category: 'usage-guides',
    templateType: 'how-to',
    keywords: ['growing guide', 'UK cultivation', 'gardening', 'plant care'],
    priority: 'medium',
    wordCount: 2600
  },
  'can-you-grow-blue-lotus-flower-in-the-us': {
    title: 'Growing Blue Lotus in the US: Complete Guide',
    description: 'Learn how to successfully grow blue lotus flower in various US climate zones.',
    slug: 'can-you-grow-blue-lotus-flower-in-the-us',
    category: 'usage-guides',
    templateType: 'how-to',
    keywords: ['growing guide', 'US cultivation', 'gardening', 'plant care'],
    priority: 'medium',
    wordCount: 2600
  },
  'can-you-vape-blue-lotus': {
    title: 'Can You Vape Blue Lotus? A Complete Guide',
    description: 'Everything you need to know about vaping blue lotus flower, including methods and considerations.',
    slug: 'can-you-vape-blue-lotus',
    category: 'usage-guides',
    templateType: 'how-to',
    keywords: ['vaping', 'consumption methods', 'vaporizing', 'usage guide'],
    priority: 'high',
    wordCount: 2400
  },
  'does-blue-lotus-flower-make-you-sleepy': {
    title: 'Does Blue Lotus Make You Sleepy?',
    description: 'Understanding the sedative effects and sleep-promoting properties of blue lotus flower.',
    slug: 'does-blue-lotus-flower-make-you-sleepy',
    category: 'wellness',
    templateType: 'educational',
    keywords: ['sleep effects', 'sedation', 'relaxation', 'sleep aid'],
    priority: 'high',
    wordCount: 2200
  },
  'does-blue-lotus-flower-show-up-on-drug-tests': {
    title: 'Does Blue Lotus Show Up on Drug Tests?',
    description: 'Information about blue lotus flower and drug testing considerations.',
    slug: 'does-blue-lotus-flower-show-up-on-drug-tests',
    category: 'education',
    templateType: 'educational',
    keywords: ['drug testing', 'legal considerations', 'workplace testing', 'detection'],
    priority: 'high',
    wordCount: 2000
  },
  'growing-blue-lotus-at-home': {
    title: 'Growing Blue Lotus at Home: Beginner\'s Guide',
    description: 'Step-by-step guide to growing blue lotus flower in home gardens and water features.',
    slug: 'growing-blue-lotus-at-home',
    category: 'usage-guides',
    templateType: 'how-to',
    keywords: ['home growing', 'cultivation', 'gardening guide', 'plant care'],
    priority: 'medium',
    wordCount: 2500
  },
  'how-does-blue-lotus-flower-help-those-seeking-concentration': {
    title: 'Blue Lotus for Focus and Concentration',
    description: 'How blue lotus flower can support mental clarity and improved concentration.',
    slug: 'how-does-blue-lotus-flower-help-those-seeking-concentration',
    category: 'wellness',
    templateType: 'educational',
    keywords: ['focus', 'concentration', 'mental clarity', 'cognitive support'],
    priority: 'medium',
    wordCount: 2300
  },
  'how-to-use-blue-lotus-flower': {
    title: 'How to Use Blue Lotus Flower: Complete Guide',
    description: 'Comprehensive guide to different methods of using blue lotus flower.',
    slug: 'how-to-use-blue-lotus-flower',
    category: 'usage-guides',
    templateType: 'how-to',
    keywords: ['usage guide', 'preparation methods', 'consumption', 'applications'],
    priority: 'high',
    wordCount: 2700
  },
  'is-blue-lotus-flower-a-laxative': {
    title: 'Is Blue Lotus a Laxative?',
    description: 'Understanding the digestive effects of blue lotus flower.',
    slug: 'is-blue-lotus-flower-a-laxative',
    category: 'education',
    templateType: 'educational',
    keywords: ['digestive effects', 'bodily effects', 'health effects', 'side effects'],
    priority: 'medium',
    wordCount: 2000
  },
  'is-blue-lotus-flower-a-narcotic': {
    title: 'Is Blue Lotus a Narcotic? Facts and Misconceptions',
    description: 'Clarifying the legal status and effects of blue lotus flower.',
    slug: 'is-blue-lotus-flower-a-narcotic',
    category: 'education',
    templateType: 'educational',
    keywords: ['legal status', 'effects', 'classification', 'regulations'],
    priority: 'high',
    wordCount: 2400
  },
  'is-blue-lotus-flower-legal-in-the-us': {
    title: 'Is Blue Lotus Legal in the US?',
    description: 'Comprehensive guide to the legal status of blue lotus flower in the United States.',
    slug: 'is-blue-lotus-flower-legal-in-the-us',
    category: 'education',
    templateType: 'educational',
    keywords: ['legal status', 'US law', 'regulations', 'compliance'],
    priority: 'high',
    wordCount: 2500
  },
  'is-it-safe-to-smoke-blue-lotus-flower': {
    title: 'Is It Safe to Smoke Blue Lotus?',
    description: 'Safety considerations and best practices for smoking blue lotus flower.',
    slug: 'is-it-safe-to-smoke-blue-lotus-flower',
    category: 'education',
    templateType: 'educational',
    keywords: ['smoking safety', 'health considerations', 'risks', 'precautions'],
    priority: 'high',
    wordCount: 2400
  },
  'natural-remedies-for-sleep-aid': {
    title: 'Natural Sleep Remedies: Blue Lotus and Other Herbs',
    description: 'Guide to natural sleep aids including blue lotus flower and complementary herbs.',
    slug: 'natural-remedies-for-sleep-aid',
    category: 'wellness',
    templateType: 'educational',
    keywords: ['sleep aids', 'natural remedies', 'herbal medicine', 'sleep support'],
    priority: 'high',
    wordCount: 2600
  },
  'smoking-blue-lotus-flower-a-users-guide': {
    title: 'Smoking Blue Lotus: A User\'s Guide',
    description: 'Complete guide to smoking blue lotus flower safely and effectively.',
    slug: 'smoking-blue-lotus-flower-a-users-guide',
    category: 'usage-guides',
    templateType: 'how-to',
    keywords: ['smoking guide', 'consumption methods', 'usage tips', 'preparation'],
    priority: 'high',
    wordCount: 2800
  },
  'smoking-blue-lotus-flower-effects': {
    title: 'Effects of Smoking Blue Lotus',
    description: 'Detailed information about the effects of smoking blue lotus flower.',
    slug: 'smoking-blue-lotus-flower-effects',
    category: 'education',
    templateType: 'educational',
    keywords: ['smoking effects', 'experience', 'what to expect', 'benefits'],
    priority: 'high',
    wordCount: 2600
  },
  'smoking-blue-lotus-flower-everything-you-should-know': {
    title: 'Smoking Blue Lotus: Everything You Should Know',
    description: 'Comprehensive guide covering all aspects of smoking blue lotus flower.',
    slug: 'smoking-blue-lotus-flower-everything-you-should-know',
    category: 'usage-guides',
    templateType: 'educational',
    keywords: ['complete guide', 'smoking information', 'comprehensive guide', 'usage'],
    priority: 'high',
    wordCount: 3000
  },
  'what-does-blue-lotus-smell-like': {
    title: 'What Does Blue Lotus Smell Like?',
    description: 'Exploring the unique fragrance profile of blue lotus flower.',
    slug: 'what-does-blue-lotus-smell-like',
    category: 'education',
    templateType: 'educational',
    keywords: ['fragrance', 'aroma', 'scent profile', 'smell'],
    priority: 'medium',
    wordCount: 2000
  },
  'what-is-blue-lotus-flower': {
    title: 'What is Blue Lotus Flower? Complete Guide to Nymphaea Caerulea',
    description: 'Discover everything about blue lotus flower (Nymphaea Caerulea). Learn about its history, traditional uses, benefits, and how to incorporate this sacred Egyptian flower into your wellness routine.',
    slug: 'what-is-blue-lotus-flower',
    category: 'getting-started',
    templateType: 'educational',
    keywords: [
      'blue lotus flower',
      'nymphaea caerulea',
      'sacred blue lily',
      'egyptian lotus',
      'blue lotus tea',
      'blue lotus benefits',
      'blue lotus history',
      'lotus flower wellness'
    ],
    priority: 'high',
    wordCount: 2800
  },
  'where-to-buy-blue-lotus-flower': {
    title: 'Where to Buy Blue Lotus Flower',
    description: 'Guide to finding and purchasing high-quality blue lotus flower products.',
    slug: 'where-to-buy-blue-lotus-flower',
    category: 'product-information',
    templateType: 'educational',
    keywords: ['buying guide', 'purchasing', 'vendors', 'quality'],
    priority: 'high',
    wordCount: 2200
  },
  'why-is-blue-lotus-flower-expensive': {
    title: 'Why is Blue Lotus Flower Expensive?',
    description: 'Understanding the factors that influence blue lotus flower pricing.',
    slug: 'why-is-blue-lotus-flower-expensive',
    category: 'product-information',
    templateType: 'educational',
    keywords: ['pricing', 'cost factors', 'quality', 'market value'],
    priority: 'medium',
    wordCount: 2100
  }
}; 