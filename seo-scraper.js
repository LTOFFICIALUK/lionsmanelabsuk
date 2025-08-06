import puppeteer from 'puppeteer';
import fs from 'fs';

const SHOPIFY_URLS = [
  'https://www.bluedreamtea.co.uk/products/blue-lotus-flower-pre-rolls',
  'https://www.bluedreamtea.co.uk/products/blue-lotus-flower',
  'https://www.bluedreamtea.co.uk/products/blue-lotus-flower-smoking-blend',
  'https://www.bluedreamtea.co.uk/products/blue-lotus-flower-tea-bags'
];

async function scrapeProductPage(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Extract SEO metadata
    const metadata = await page.evaluate(() => {
      const title = document.querySelector('title')?.textContent || '';
      const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
      const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
      
      return { title, metaDescription, ogTitle, ogDescription, ogImage };
    });
    
    // Extract headings
    const headings = await page.evaluate(() => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(headingElements).map((el, index) => ({
        level: el.tagName.toLowerCase(),
        text: el.textContent.trim(),
        index
      }));
    });
    
    // Extract images with alt text
    const images = await page.evaluate(() => {
      const imgElements = document.querySelectorAll('img');
      return Array.from(imgElements).map((img, index) => ({
        src: img.src,
        alt: img.alt || '',
        title: img.title || '',
        index
      }));
    });
    
    // Extract internal links
    const internalLinks = await page.evaluate(() => {
      const linkElements = document.querySelectorAll('a[href*="bluedreamtea.co.uk"]');
      return Array.from(linkElements).map((link, index) => ({
        href: link.href,
        text: link.textContent.trim(),
        title: link.title || '',
        index
      }));
    });
    
    // Extract product information
    const productInfo = await page.evaluate(() => {
      const productTitle = document.querySelector('h1')?.textContent.trim() || '';
      const productPrice = document.querySelector('[class*="price"]')?.textContent.trim() || '';
      const productDescription = document.querySelector('[class*="description"]')?.textContent.trim() || '';
      
      return { productTitle, productPrice, productDescription };
    });
    
    const slug = url.split('/').pop();
    
    return {
      slug,
      url,
      metadata,
      headings,
      images,
      internalLinks,
      productInfo
    };
    
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function scrapeAllProducts() {
  console.log('Starting SEO scraping...');
  
  const results = [];
  
  for (const url of SHOPIFY_URLS) {
    console.log(`Scraping ${url}...`);
    const result = await scrapeProductPage(url);
    if (result) {
      results.push(result);
    }
    // Add delay to be respectful to the server
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Save results to JSON file
  const outputPath = 'scraped-seo-data.json';
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nScraping complete! Results saved to ${outputPath}`);
  
  // Generate summary
  console.log('\n=== SCRAPING SUMMARY ===');
  results.forEach(result => {
    console.log(`\n${result.slug}:`);
    console.log(`  Title: ${result.metadata.title}`);
    console.log(`  Description: ${result.metadata.metaDescription.substring(0, 100)}...`);
    console.log(`  Headings: ${result.headings.length}`);
    console.log(`  Images: ${result.images.length}`);
    console.log(`  Internal Links: ${result.internalLinks.length}`);
  });
  
  return results;
}

// Run the scraper
scrapeAllProducts().catch(console.error); 