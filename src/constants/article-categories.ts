export type ArticleCategory = 
  | 'getting-started'
  | 'brewing-guides'
  | 'wellness'
  | 'recipes'
  | 'general'
  | 'usage-guides'
  | 'product-information'
  | 'education'
  | 'culture-history'
  | 'comparison-guides';

export const ARTICLE_CATEGORIES: Record<ArticleCategory, string> = {
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