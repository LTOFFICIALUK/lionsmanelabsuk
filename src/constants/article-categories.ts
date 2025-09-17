export type ArticleCategory = 
  | 'getting-started'
  | 'health-benefits'
  | 'wellness'
  | 'usage-guides'
  | 'product-information'
  | 'education'
  | 'culture-history'
  | 'comparisons'
  | 'science-research';

export const ARTICLE_CATEGORIES: Record<ArticleCategory, string> = {
  'getting-started': 'Getting Started',
  'health-benefits': 'Health Benefits',
  'wellness': 'Wellness & Lifestyle',
  'usage-guides': 'Usage Guides',
  'product-information': 'Product Information',
  'education': 'Educational Content',
  'culture-history': 'Culture & History',
  'comparisons': 'Product Comparisons',
  'science-research': 'Science & Research'
}; 