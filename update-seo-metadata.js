import fs from 'fs';
import path from 'path';

// Read the scraped SEO data
const scrapedData = JSON.parse(fs.readFileSync('scraped-seo-data.json', 'utf8'));

// Create a mapping of scraped data by slug
const seoDataMap = {};
scrapedData.forEach(item => {
  seoDataMap[item.slug] = item;
});

// Function to update product metadata
function updateProductMetadata() {
  const productsPath = 'src/constants/products.ts';
  let productsContent = fs.readFileSync(productsPath, 'utf8');
  
  // Update each product with scraped SEO data
  Object.keys(seoDataMap).forEach(slug => {
    const seoData = seoDataMap[slug];
    
    // Find the product in the file
    const productRegex = new RegExp(`'${slug}':\\s*{[\\s\\S]*?},?\\s*(?='[a-z-]+':|$)`, 'g');
    const match = productsContent.match(productRegex);
    
    if (match) {
      const productBlock = match[0];
      
      // Extract current title and description
      const titleMatch = productBlock.match(/title:\s*['"`]([^'"`]+)['"`]/);
      const descMatch = productBlock.match(/description:\s*['"`]([^'"`]+)['"`]/);
      
      if (titleMatch && descMatch) {
        const currentTitle = titleMatch[1];
        const currentDesc = descMatch[1];
        
        // Update with scraped data
        const newTitle = seoData.metadata.title.replace(' - Lion\'s Mane Labs UK', '');
        const newDesc = seoData.metadata.metaDescription;
        
        // Replace title and description
        let updatedBlock = productBlock
          .replace(/title:\s*['"`][^'"`]+['"`]/, `title: '${newTitle}'`)
          .replace(/description:\s*['"`][^'"`]+['"`]/, `description: '${newDesc}'`);
        
        // Update the content
        productsContent = productsContent.replace(productBlock, updatedBlock);
      }
    }
  });
  
  // Write back to file
  fs.writeFileSync(productsPath, productsContent);
  console.log('✅ Product metadata updated successfully!');
}

// Function to generate alt text mapping
function generateAltTextMapping() {
  const altTextMap = {};
  
  Object.keys(seoDataMap).forEach(slug => {
    const seoData = seoDataMap[slug];
    altTextMap[slug] = seoData.images
      .filter(img => img.alt && img.alt !== '')
      .map(img => ({
        src: img.src,
        alt: img.alt
      }));
  });
  
  fs.writeFileSync('alt-text-mapping.json', JSON.stringify(altTextMap, null, 2));
  console.log('✅ Alt text mapping generated!');
}

// Function to generate headings mapping
function generateHeadingsMapping() {
  const headingsMap = {};
  
  Object.keys(seoDataMap).forEach(slug => {
    const seoData = seoDataMap[slug];
    headingsMap[slug] = seoData.headings
      .filter(heading => heading.text && heading.text.length > 10)
      .map(heading => ({
        level: heading.level,
        text: heading.text
      }));
  });
  
  fs.writeFileSync('headings-mapping.json', JSON.stringify(headingsMap, null, 2));
  console.log('✅ Headings mapping generated!');
}

// Function to generate internal links mapping
function generateInternalLinksMapping() {
  const linksMap = {};
  
  Object.keys(seoDataMap).forEach(slug => {
    const seoData = seoDataMap[slug];
    linksMap[slug] = seoData.internalLinks
      .filter(link => link.text && link.text.length > 0)
      .map(link => ({
        href: link.href,
        text: link.text
      }));
  });
  
  fs.writeFileSync('internal-links-mapping.json', JSON.stringify(linksMap, null, 2));
  console.log('✅ Internal links mapping generated!');
}

// Run all updates
console.log('🔄 Starting SEO metadata updates...\n');

try {
  updateProductMetadata();
  generateAltTextMapping();
  generateHeadingsMapping();
  generateInternalLinksMapping();
  
  console.log('\n🎉 All SEO updates completed successfully!');
  console.log('\n📁 Generated files:');
  console.log('  - alt-text-mapping.json');
  console.log('  - headings-mapping.json');
  console.log('  - internal-links-mapping.json');
  console.log('\n📝 Next steps:');
  console.log('  1. Review the updated product metadata');
  console.log('  2. Add alt text to images using alt-text-mapping.json');
  console.log('  3. Add headings to product pages using headings-mapping.json');
  console.log('  4. Add internal links to product pages using internal-links-mapping.json');
  
} catch (error) {
  console.error('❌ Error updating SEO metadata:', error.message);
} 