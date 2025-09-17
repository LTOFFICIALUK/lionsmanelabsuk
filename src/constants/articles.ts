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
  'what-is-lions-mane-mushroom': {
    title: 'What is Lion\'s Mane Mushroom? Complete Guide to Hericium Erinaceus',
    description: 'Discover everything about Lion\'s Mane mushroom (Hericium Erinaceus). Learn about its cognitive benefits, nerve regeneration properties, and how to incorporate this powerful nootropic into your wellness routine.',
    slug: 'what-is-lions-mane-mushroom',
    category: 'getting-started',
    templateType: 'educational',
    keywords: [
      'lions mane mushroom',
      'hericium erinaceus',
      'cognitive enhancement',
      'brain health',
      'nootropics',
      'nerve regeneration',
      'memory improvement'
    ],
    priority: 'high',
    wordCount: 2800
  },
  'lions-mane-cognitive-benefits': {
    title: 'Lion\'s Mane: The Ultimate Brain Booster for Cognitive Enhancement',
    description: 'Discover how Lion\'s Mane mushroom can enhance your cognitive function, improve memory, and support brain health naturally.',
    slug: 'lions-mane-cognitive-benefits',
    category: 'health-benefits',
    templateType: 'educational',
    keywords: ['lions mane benefits', 'cognitive enhancement', 'brain health', 'memory improvement', 'nootropics'],
    priority: 'high',
    wordCount: 2000
  },
  'how-to-use-lions-mane-powder': {
    title: 'How to Use Lion\'s Mane Powder: Complete Guide for Maximum Benefits',
    description: 'Learn the best ways to incorporate Lion\'s Mane powder into your daily routine for optimal cognitive enhancement and health benefits.',
    slug: 'how-to-use-lions-mane-powder',
    category: 'usage-guides',
    templateType: 'product-guide',
    keywords: ['lions mane powder', 'how to use lions mane', 'lions mane recipes', 'cognitive supplements', 'brain health'],
    priority: 'high',
    wordCount: 1800
  },
  'lions-mane-vs-other-nootropics': {
    title: 'Lion\'s Mane vs Other Nootropics: Which is Best for Brain Health?',
    description: 'Compare Lion\'s Mane with other popular nootropics and cognitive enhancers to find the best option for your brain health goals.',
    slug: 'lions-mane-vs-other-nootropics',
    category: 'comparisons',
    templateType: 'educational',
    keywords: ['lions mane vs nootropics', 'brain supplements comparison', 'cognitive enhancers', 'nootropic comparison', 'brain health supplements'],
    priority: 'medium',
    wordCount: 2200
  },
  'lions-mane-dosage-guide': {
    title: 'Lion\'s Mane Dosage Guide: Finding Your Perfect Amount',
    description: 'Learn the optimal Lion\'s Mane dosage for different goals, from cognitive enhancement to nerve regeneration support.',
    slug: 'lions-mane-dosage-guide',
    category: 'usage-guides',
    templateType: 'product-guide',
    keywords: ['lions mane dosage', 'how much lions mane', 'lions mane serving size', 'cognitive enhancement dosage', 'brain supplement dosage'],
    priority: 'high',
    wordCount: 1600
  },
  'lions-mane-scientific-research': {
    title: 'The Science Behind Lion\'s Mane: Research and Studies',
    description: 'Explore the scientific research behind Lion\'s Mane mushroom and its proven benefits for brain health and cognitive function.',
    slug: 'lions-mane-scientific-research',
    category: 'science-research',
    templateType: 'educational',
    keywords: ['lions mane research', 'lions mane studies', 'scientific evidence', 'brain health research', 'cognitive enhancement studies'],
    priority: 'medium',
    wordCount: 2500
  },
  'lions-mane-memory-enhancement': {
    title: 'Lion\'s Mane for Memory: Can It Really Improve Your Recall?',
    description: 'Discover how Lion\'s Mane mushroom can enhance memory formation, retention, and recall through its unique neuroprotective properties.',
    slug: 'lions-mane-memory-enhancement',
    category: 'health-benefits',
    templateType: 'educational',
    keywords: ['lions mane memory', 'memory improvement', 'cognitive enhancement', 'brain health', 'memory supplements'],
    priority: 'high',
    wordCount: 1900
  },
  'lions-mane-tea-benefits': {
    title: 'Lion\'s Mane Tea: A Delicious Way to Boost Your Brain',
    description: 'Learn how to brew the perfect cup of Lion\'s Mane tea and discover the cognitive benefits of this ancient brain-boosting beverage.',
    slug: 'lions-mane-tea-benefits',
    category: 'usage-guides',
    templateType: 'product-guide',
    keywords: ['lions mane tea', 'brain boosting tea', 'cognitive enhancement tea', 'lions mane brewing', 'brain health tea'],
    priority: 'medium',
    wordCount: 1700
  },
  'lions-mane-focus-concentration': {
    title: 'Lion\'s Mane for Focus and Concentration: Natural ADHD Support',
    description: 'Explore how Lion\'s Mane mushroom can help improve focus, concentration, and attention span naturally without stimulants.',
    slug: 'lions-mane-focus-concentration',
    category: 'health-benefits',
    templateType: 'educational',
    keywords: ['lions mane focus', 'concentration improvement', 'ADHD natural support', 'attention enhancement', 'focus supplements'],
    priority: 'high',
    wordCount: 2000
  },
  'lions-mane-extract-vs-powder': {
    title: 'Lion\'s Mane Extract vs Powder: Which Form is Best?',
    description: 'Compare Lion\'s Mane extract and powder to determine which form offers the best bioavailability and cognitive benefits.',
    slug: 'lions-mane-extract-vs-powder',
    category: 'comparisons',
    templateType: 'educational',
    keywords: ['lions mane extract', 'lions mane powder', 'extract vs powder', 'bioavailability', 'cognitive supplements'],
    priority: 'medium',
    wordCount: 1800
  },
  'lions-mane-nerve-regeneration': {
    title: 'Lion\'s Mane for Nerve Regeneration: Healing from Within',
    description: 'Discover how Lion\'s Mane mushroom supports nerve regeneration and may help with nerve damage and neurological conditions.',
    slug: 'lions-mane-nerve-regeneration',
    category: 'health-benefits',
    templateType: 'educational',
    keywords: ['lions mane nerve regeneration', 'nerve healing', 'neurological support', 'nerve damage', 'brain repair'],
    priority: 'medium',
    wordCount: 2100
  },
  'lions-mane-side-effects': {
    title: 'Lion\'s Mane Side Effects: What You Need to Know',
    description: 'Understanding potential side effects and safety considerations when using Lion\'s Mane mushroom supplements.',
    slug: 'lions-mane-side-effects',
    category: 'education',
    templateType: 'educational',
    keywords: ['lions mane side effects', 'safety', 'precautions', 'health considerations', 'supplement safety'],
    priority: 'high',
    wordCount: 2200
  },
  'lions-mane-effects': {
    title: 'Lion\'s Mane Effects: What to Expect',
    description: 'A detailed guide to the effects and experiences of using Lion\'s Mane mushroom for cognitive enhancement.',
    slug: 'lions-mane-effects',
    category: 'education',
    templateType: 'educational',
    keywords: ['lions mane effects', 'experience', 'what to expect', 'lions mane use', 'cognitive effects'],
    priority: 'high',
    wordCount: 2800
  },
  'lions-mane-for-anxiety': {
    title: 'Lion\'s Mane for Anxiety: Natural Stress Relief',
    description: 'Learn how Lion\'s Mane mushroom can help manage anxiety and promote emotional balance naturally.',
    slug: 'lions-mane-for-anxiety',
    category: 'wellness',
    templateType: 'wellness',
    keywords: ['anxiety relief', 'stress management', 'natural remedy', 'emotional wellness', 'lions mane anxiety'],
    priority: 'high',
    wordCount: 2200
  },
  'lions-mane-for-sleep': {
    title: 'Lion\'s Mane for Better Sleep: Natural Sleep Support',
    description: 'Discover how Lion\'s Mane mushroom can improve sleep quality and support healthy sleep patterns.',
    slug: 'lions-mane-for-sleep',
    category: 'wellness',
    templateType: 'educational',
    keywords: ['sleep improvement', 'natural sleep aid', 'sleep quality', 'lions mane sleep', 'restorative sleep'],
    priority: 'medium',
    wordCount: 2000
  },
  'lions-mane-capsules-guide': {
    title: 'Lion\'s Mane Capsules: Complete Usage Guide',
    description: 'Everything you need to know about Lion\'s Mane capsules, including dosage, timing, and benefits.',
    slug: 'lions-mane-capsules-guide',
    category: 'usage-guides',
    templateType: 'how-to',
    keywords: ['lions mane capsules', 'supplement guide', 'capsule dosage', 'convenient supplements', 'brain health capsules'],
    priority: 'high',
    wordCount: 2400
  },
  'lions-mane-tincture-benefits': {
    title: 'Lion\'s Mane Tincture: Benefits and Usage Guide',
    description: 'Explore the benefits of Lion\'s Mane tincture and learn how to use it effectively for cognitive enhancement.',
    slug: 'lions-mane-tincture-benefits',
    category: 'usage-guides',
    templateType: 'how-to',
    keywords: ['lions mane tincture', 'liquid extract', 'tincture benefits', 'fast absorption', 'lions mane liquid'],
    priority: 'medium',
    wordCount: 2000
  },
  'lions-mane-for-students': {
    title: 'Lion\'s Mane for Students: Boost Your Academic Performance',
    description: 'How students can use Lion\'s Mane mushroom to improve focus, memory, and academic performance naturally.',
    slug: 'lions-mane-for-students',
    category: 'wellness',
    templateType: 'educational',
    keywords: ['student supplements', 'academic performance', 'study aids', 'focus for students', 'memory for learning'],
    priority: 'high',
    wordCount: 2100
  },
  'lions-mane-for-seniors': {
    title: 'Lion\'s Mane for Seniors: Supporting Brain Health as You Age',
    description: 'Learn how Lion\'s Mane mushroom can support cognitive health and memory in older adults.',
    slug: 'lions-mane-for-seniors',
    category: 'wellness',
    templateType: 'educational',
    keywords: ['senior brain health', 'aging and cognition', 'memory support', 'elderly supplements', 'cognitive aging'],
    priority: 'high',
    wordCount: 2300
  },
  'lions-mane-growing-guide': {
    title: 'Growing Lion\'s Mane Mushroom: Complete Cultivation Guide',
    description: 'Learn how to grow Lion\'s Mane mushroom at home with this comprehensive cultivation guide.',
    slug: 'lions-mane-growing-guide',
    category: 'usage-guides',
    templateType: 'how-to',
    keywords: ['growing lions mane', 'mushroom cultivation', 'home growing', 'lions mane farming', 'mushroom growing guide'],
    priority: 'medium',
    wordCount: 2600
  },
  'lions-mane-nutritional-profile': {
    title: 'Lion\'s Mane Nutritional Profile: What\'s Inside This Super Mushroom',
    description: 'Explore the nutritional composition and active compounds found in Lion\'s Mane mushroom.',
    slug: 'lions-mane-nutritional-profile',
    category: 'product-information',
    templateType: 'educational',
    keywords: ['lions mane nutrition', 'mushroom nutrients', 'active compounds', 'hericenones', 'erinacines'],
    priority: 'medium',
    wordCount: 2000
  },
  'lions-mane-and-meditation': {
    title: 'Lion\'s Mane and Meditation: Enhancing Mindfulness Practice',
    description: 'Discover how Lion\'s Mane mushroom can enhance meditation and mindfulness practices for deeper focus and clarity.',
    slug: 'lions-mane-and-meditation',
    category: 'wellness',
    templateType: 'educational',
    keywords: ['meditation enhancement', 'mindfulness support', 'spiritual practice', 'lions mane meditation', 'focused awareness'],
    priority: 'medium',
    wordCount: 1900
  },
  'lions-mane-for-creativity': {
    title: 'Lion\'s Mane for Creativity: Unlock Your Creative Potential',
    description: 'Learn how Lion\'s Mane mushroom can enhance creativity, artistic expression, and innovative thinking.',
    slug: 'lions-mane-for-creativity',
    category: 'wellness',
    templateType: 'educational',
    keywords: ['creativity enhancement', 'artistic expression', 'innovative thinking', 'creative flow', 'lions mane creativity'],
    priority: 'medium',
    wordCount: 2000
  },
  'lions-mane-quality-guide': {
    title: 'How to Choose High-Quality Lion\'s Mane Supplements',
    description: 'A comprehensive guide to selecting the best Lion\'s Mane supplements for maximum benefits and safety.',
    slug: 'lions-mane-quality-guide',
    category: 'product-information',
    templateType: 'educational',
    keywords: ['quality supplements', 'choosing lions mane', 'supplement quality', 'lions mane brands', 'best lions mane'],
    priority: 'high',
    wordCount: 2200
  },
  'lions-mane-timing': {
    title: 'When to Take Lion\'s Mane: Optimal Timing for Maximum Benefits',
    description: 'Learn the best times to take Lion\'s Mane mushroom for optimal cognitive enhancement and absorption.',
    slug: 'lions-mane-timing',
    category: 'usage-guides',
    templateType: 'how-to',
    keywords: ['when to take lions mane', 'supplement timing', 'optimal dosing', 'lions mane schedule', 'timing benefits'],
    priority: 'high',
    wordCount: 1800
  },
  'lions-mane-long-term-benefits': {
    title: 'Long-Term Benefits of Lion\'s Mane: What to Expect Over Time',
    description: 'Explore the cumulative benefits of long-term Lion\'s Mane use for sustained cognitive enhancement and brain health.',
    slug: 'lions-mane-long-term-benefits',
    category: 'health-benefits',
    templateType: 'educational',
    keywords: ['long term benefits', 'sustained effects', 'chronic use', 'lions mane longevity', 'brain health maintenance'],
    priority: 'medium',
    wordCount: 2100
  },
  'lions-mane-and-exercise': {
    title: 'Lion\'s Mane and Exercise: Enhancing Physical and Mental Performance',
    description: 'Discover how Lion\'s Mane mushroom can support both physical and mental performance during exercise and recovery.',
    slug: 'lions-mane-and-exercise',
    category: 'wellness',
    templateType: 'educational',
    keywords: ['exercise performance', 'mental focus', 'recovery support', 'lions mane fitness', 'athletic performance'],
    priority: 'medium',
    wordCount: 2000
  },
  'lions-mane-for-work': {
    title: 'Lion\'s Mane for Work: Boost Your Professional Performance',
    description: 'Learn how Lion\'s Mane mushroom can enhance productivity, focus, and cognitive performance in the workplace.',
    slug: 'lions-mane-for-work',
    category: 'wellness',
    templateType: 'educational',
    keywords: ['work performance', 'productivity enhancement', 'professional focus', 'lions mane work', 'cognitive workplace'],
    priority: 'high',
    wordCount: 1900
  },
  'lions-mane-history': {
    title: 'The History of Lion\'s Mane: From Ancient Medicine to Modern Nootropics',
    description: 'Explore the fascinating history and traditional uses of Lion\'s Mane mushroom across different cultures.',
    slug: 'lions-mane-history',
    category: 'culture-history',
    templateType: 'educational',
    keywords: ['lions mane history', 'traditional medicine', 'ancient uses', 'cultural significance', 'mushroom traditions'],
    priority: 'medium',
    wordCount: 2500
  },
  'lions-mane-myths': {
    title: 'Lion\'s Mane Myths vs Facts: Separating Truth from Fiction',
    description: 'Debunk common myths about Lion\'s Mane mushroom and learn the scientific facts about its benefits and effects.',
    slug: 'lions-mane-myths',
    category: 'education',
    templateType: 'educational',
    keywords: ['lions mane myths', 'fact vs fiction', 'scientific truth', 'myth debunking', 'accurate information'],
    priority: 'medium',
    wordCount: 2000
  }
};