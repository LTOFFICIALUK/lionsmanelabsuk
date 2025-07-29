# Blue Lotus Article Migration Strategy

## Overview
This guide provides a systematic approach to migrate 100+ articles from Shopify to your custom Blue Dream Tea UK website while maintaining SEO value and improving performance.

## Phase 1: Content Audit & Planning (Week 1)

### 1. Export Your Shopify Content
```bash
# Use Shopify's export tools or the Admin API to get:
# - Article titles, descriptions, content
# - URLs, publication dates, tags
# - Images and media assets
# - SEO metadata (meta descriptions, titles)
```

### 2. Content Categorization
Map your existing Shopify articles to the new category structure:

- **Getting Started** → Basic blue lotus introduction articles
- **Brewing Guides** → Tea preparation, steeping guides
- **Wellness & Benefits** → Health, relaxation, benefits articles
- **Tea Recipes** → Recipe articles, blends, combinations
- **Usage Guides** → Smoking, aromatherapy, various uses
- **Product Information** → Product-specific guides and reviews
- **Educational Content** → Science, research, detailed explanations
- **Culture & History** → Ancient uses, cultural significance
- **Product Comparisons** → Product vs product articles

### 3. URL Mapping for SEO Preservation
Create a spreadsheet with:
- Old Shopify URL
- New custom site URL
- 301 redirect mapping
- Priority (high/medium/low traffic)

Example:
```
/blogs/education/what-is-blue-lotus → /articles/what-is-blue-lotus-flower
/blogs/recipes/lotus-tea-recipe → /articles/how-to-make-blue-lotus-tea
/blogs/wellness/blue-lotus-benefits → /articles/blue-lotus-benefits-effects
```

## Phase 2: Content Migration Tools (Week 2)

### 1. Batch Article Generator
Use the template system to create multiple articles efficiently:

```typescript
// Use the article template structure:
const articleTemplate = {
  title: "Article Title",
  description: "Meta description",
  category: "category-slug",
  keywords: ["keyword1", "keyword2"],
  shopifySlug: "original-shopify-path",
  content: {
    sections: [
      { type: "intro", heading: "Introduction", content: "..." },
      { type: "main", heading: "Main Content", content: "..." },
      { type: "faq", faqs: [...] },
      { type: "cta", title: "...", buttons: [...] }
    ]
  }
};
```

### 2. Image Migration
- Download all images from Shopify
- Optimize for web (WebP format)
- Organize in `/src/assets/images/articles/` structure
- Update image references in content

### 3. SEO Optimization Checklist
For each article, ensure:
- [ ] Title tag optimized (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] H1, H2, H3 hierarchy
- [ ] Internal linking to products/other articles
- [ ] Alt text for all images
- [ ] Schema.org structured data
- [ ] Keywords in first paragraph
- [ ] Reading time estimation

## Phase 3: Implementation Strategy (Weeks 3-4)

### 1. Priority-Based Migration
**High Priority (Week 3):**
- Top 20 highest-traffic articles
- Product-focused content
- Money-making articles

**Medium Priority (Week 4):**
- Educational content
- Wellness articles
- Recipe guides

**Low Priority (Ongoing):**
- General information
- Historical content

### 2. Quality Improvements During Migration
As you migrate each article:
- **Expand content** where thin (aim for 1000+ words for main articles)
- **Add FAQ sections** for common questions
- **Include product recommendations** with affiliate links
- **Add internal linking** to related products/articles
- **Optimize images** with proper alt text and captions
- **Add structured data** for better search visibility

### 3. Template-Based Creation
For efficiency, create article templates for common types:

**Product Guide Template:**
- Product overview
- Benefits and uses
- How to use/prepare
- Comparison with alternatives
- FAQ section
- Related products CTA

**Educational Article Template:**
- Introduction/what is it
- Historical background
- Scientific explanation
- Practical applications
- Common questions
- Further reading

## Phase 4: SEO & Performance Optimization

### 1. 301 Redirects Setup
Configure redirects in your hosting/CDN:
```javascript
// In vercel.json or similar
{
  "redirects": [
    {
      "source": "/blogs/education/what-is-blue-lotus",
      "destination": "/articles/what-is-blue-lotus-flower",
      "permanent": true
    }
  ]
}
```

### 2. Internal Linking Strategy
- Link related articles to each other
- Link articles to relevant products
- Create topic clusters around main themes
- Use descriptive anchor text

### 3. Performance Optimization
- Lazy load images
- Optimize image sizes
- Use CDN for assets
- Implement article caching

## Migration Tools & Scripts

### 1. Content Converter Script
```javascript
// Helper script to convert Shopify export to your format
const convertShopifyToCustom = (shopifyArticle) => {
  return {
    title: shopifyArticle.title,
    description: shopifyArticle.summary || generateMetaDescription(shopifyArticle.content),
    category: mapToNewCategory(shopifyArticle.tags),
    keywords: extractKeywords(shopifyArticle.tags, shopifyArticle.content),
    shopifySlug: shopifyArticle.handle,
    content: convertContent(shopifyArticle.content),
    publishDate: shopifyArticle.published_at,
    images: extractImages(shopifyArticle.content)
  };
};
```

### 2. SEO Optimization Script
```javascript
const optimizeForSEO = (article) => {
  return {
    ...article,
    title: optimizeTitle(article.title),
    description: optimizeMetaDescription(article.description),
    keywords: researchKeywords(article.title, article.content),
    readingTime: calculateReadingTime(article.content),
    wordCount: countWords(article.content)
  };
};
```

## Success Metrics

Track these metrics during and after migration:
- **Search Rankings** - Monitor position changes for target keywords
- **Organic Traffic** - Compare before/after traffic levels
- **Page Load Speed** - Ensure new articles load faster than Shopify
- **User Engagement** - Time on page, bounce rate improvements
- **Conversion Rate** - Articles to product conversions

## Timeline Summary

- **Week 1:** Content audit, categorization, URL mapping
- **Week 2:** Set up migration tools, create templates
- **Week 3:** Migrate high-priority articles (20-30)
- **Week 4:** Migrate medium-priority articles (40-50)
- **Ongoing:** Complete remaining articles, optimize

## Next Steps

1. **Start with content audit** - Export and categorize your existing articles
2. **Set up URL redirects** - Preserve SEO value from day one
3. **Create article templates** - Standardize the migration process
4. **Begin with top performers** - Migrate highest-traffic articles first
5. **Monitor and optimize** - Track performance and make improvements

This systematic approach will ensure you maintain SEO value while improving content quality and site performance. 