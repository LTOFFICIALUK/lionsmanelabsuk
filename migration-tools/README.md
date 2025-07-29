# Blue Lotus Article Migration Tools

This directory contains tools and templates to efficiently migrate your 100+ Shopify articles to your custom Blue Dream Tea UK website while maintaining SEO value and improving content quality.

## 🎯 Quick Start

### 1. Prepare Your Article Data
Create a JSON file with your article information (see `example-articles.json`):

```bash
# Copy the example and modify with your data
cp example-articles.json my-articles.json
```

### 2. Run the Migration Script
```bash
# Install dependencies (first time only)
npm install yargs

# Preview the migration (recommended first)
node batch-migration-script.js --input my-articles.json --dry-run --verbose

# Run the actual migration
node batch-migration-script.js --input my-articles.json --verbose
```

### 3. Customize Generated Articles
The script creates article templates with placeholders. You'll need to:
- Replace placeholder content with your actual content
- Add specific product recommendations
- Include relevant images
- Customize CTAs for your products

## 📁 Tool Overview

### `content-migration-guide.md`
Comprehensive strategy document covering:
- 4-phase migration approach
- SEO preservation techniques
- Content optimization strategies
- Success metrics and tracking

### `batch-migration-script.js`
Node.js script that:
- Creates article files from templates
- Updates `guides.ts` automatically
- Handles file organization
- Supports dry-run testing
- Provides detailed logging

### `article-template-generator.tsx`
React component templates for different article types:
- **Product Guide**: Product-focused articles with comparisons
- **Educational**: Informational content with historical context
- **Brewing Guide**: Recipe and preparation instructions
- **Wellness**: Health and benefits focused content

### `example-articles.json`
Sample configuration showing:
- Article metadata structure
- Category mapping
- Template type selection
- Priority-based organization

## 🔧 Configuration

### Article Data Structure
Each article in your JSON file should include:

```json
{
  "title": "Article Title (50-60 characters for SEO)",
  "description": "Meta description (150-160 characters)",
  "slug": "url-friendly-slug",
  "category": "category-name",
  "templateType": "template-type",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "shopifySlug": "original/shopify/path",
  "priority": "high|medium|low",
  "wordCount": 1500
}
```

### Available Categories
- `getting-started` - Basic introduction articles
- `brewing-guides` - Tea preparation and recipes
- `wellness` - Health and benefits content
- `recipes` - Specific tea recipes and blends
- `usage-guides` - How-to use different products
- `product-information` - Product-specific guides
- `education` - Scientific and educational content
- `culture-history` - Historical and cultural context
- `comparison-guides` - Product comparisons

### Template Types
- `product-guide` - Product-focused with benefits, usage, and comparisons
- `educational` - Informational with background, explanation, and applications
- `brewing-guide` - Recipe format with ingredients, steps, and variations
- `wellness` - Benefits-focused with research, applications, and safety

## 🚀 Migration Strategy

### Phase 1: High Priority (Week 1)
Migrate your top 20-30 highest-traffic articles:
```bash
# Filter high priority articles
jq '[.[] | select(.priority == "high")]' my-articles.json > high-priority.json
node batch-migration-script.js --input high-priority.json
```

### Phase 2: Medium Priority (Week 2)
Handle your medium-traffic educational content:
```bash
jq '[.[] | select(.priority == "medium")]' my-articles.json > medium-priority.json
node batch-migration-script.js --input medium-priority.json
```

### Phase 3: Low Priority (Ongoing)
Complete remaining articles as time allows:
```bash
jq '[.[] | select(.priority == "low")]' my-articles.json > low-priority.json
node batch-migration-script.js --input low-priority.json
```

## 📈 SEO Optimization

### Automatic SEO Features
The migration tools automatically include:
- ✅ Proper meta tags and descriptions
- ✅ Schema.org structured data (Article, FAQ, HowTo)
- ✅ Open Graph and Twitter Card tags
- ✅ Breadcrumb navigation
- ✅ Table of contents generation
- ✅ Related articles linking
- ✅ Reading time estimation

### Manual SEO Tasks
After migration, optimize each article:
- [ ] Replace placeholder content with high-quality, original text
- [ ] Add internal links to related products and articles
- [ ] Optimize images with proper alt text
- [ ] Include relevant keywords naturally in content
- [ ] Add FAQ sections with common customer questions
- [ ] Create compelling CTAs that link to your products

## 🔄 URL Redirects

Set up 301 redirects to preserve SEO value. Add to your `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/blogs/education/what-is-blue-lotus-flower",
      "destination": "/articles/what-is-blue-lotus-flower",
      "permanent": true
    }
  ]
}
```

## 📊 Content Quality Checklist

For each migrated article, ensure:

### Content Quality
- [ ] 1000+ words for main articles
- [ ] Clear, engaging introduction
- [ ] Proper heading hierarchy (H1 > H2 > H3)
- [ ] Bullet points and lists for readability
- [ ] FAQ section addressing common questions
- [ ] Call-to-action linking to relevant products

### SEO Optimization
- [ ] Title tag optimized (50-60 characters)
- [ ] Meta description compelling (150-160 characters)
- [ ] Keywords included naturally in first paragraph
- [ ] Images optimized with alt text
- [ ] Internal links to related articles/products
- [ ] External links to authoritative sources

### User Experience
- [ ] Mobile-friendly formatting
- [ ] Fast loading images (WebP format)
- [ ] Clear navigation with breadcrumbs
- [ ] Related articles suggestions
- [ ] Easy-to-scan content structure

## 🛠️ Troubleshooting

### Common Issues

**Script fails with "module not found"**
```bash
npm install yargs
```

**Articles not appearing on site**
- Check that routing is set up in your React Router
- Verify article files are in correct directory structure
- Ensure `guides.ts` was updated correctly

**SEO data not showing**
- Verify Helmet is properly installed
- Check that structured data is valid using Google's Rich Results Test
- Ensure meta tags are rendering in HTML source

### Getting Help
1. Check the migration logs for specific error messages
2. Use `--dry-run` to test before making changes
3. Use `--verbose` for detailed logging
4. Verify your JSON file format matches the example

## 📝 Next Steps

1. **Audit existing content** - Export your Shopify articles and categorize them
2. **Create your article data** - Use the example format to define all 100 articles
3. **Start with high priority** - Migrate your most important articles first
4. **Set up redirects** - Preserve SEO value from your Shopify URLs
5. **Customize content** - Replace placeholders with your actual content
6. **Monitor performance** - Track search rankings and traffic after migration

## 🎉 Benefits of This System

- **SEO Optimized**: Better search rankings than Shopify blogs
- **Fast Loading**: Optimized React components load faster
- **Customizable**: Full control over design and functionality
- **Conversion Focused**: Built-in CTAs drive product sales
- **Scalable**: Easy to add more articles over time
- **Professional**: Clean, modern design builds trust

This migration approach will help you efficiently move all 100 articles while improving their SEO performance and conversion potential. 