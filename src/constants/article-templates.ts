export type ArticleTemplateType = 
  | 'educational'
  | 'product-guide'
  | 'how-to'
  | 'wellness'
  | 'lifestyle'
  | 'review'
  | 'listicle';

export const ARTICLE_TEMPLATES: Record<ArticleTemplateType, {
  name: string;
  description: string;
  sections: string[];
}> = {
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
  'how-to': {
    name: 'How-To Guide Template',
    description: 'For step-by-step instructions and tutorials',
    sections: [
      'introduction',
      'materials-needed',
      'step-by-step',
      'tips-tricks',
      'troubleshooting',
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
  },
  'lifestyle': {
    name: 'Lifestyle Guide Template',
    description: 'For incorporating products into daily life',
    sections: [
      'introduction',
      'daily-routines',
      'practical-tips',
      'lifestyle-benefits',
      'user-experiences',
      'faq',
      'product-recommendations'
    ]
  },
  'review': {
    name: 'Product Review Template',
    description: 'For detailed product reviews and comparisons',
    sections: [
      'introduction',
      'product-overview',
      'key-features',
      'pros-cons',
      'comparison',
      'faq',
      'where-to-buy'
    ]
  },
  'listicle': {
    name: 'List Article Template',
    description: 'For top 10 lists and roundups',
    sections: [
      'introduction',
      'why-important',
      'list-items',
      'comparison-table',
      'buying-guide',
      'faq',
      'recommendations'
    ]
  }
}; 