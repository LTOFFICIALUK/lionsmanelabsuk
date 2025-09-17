import { Products } from '../types';

// Import product images - Lion's Mane products
import lionsManeCapsules1 from '../assets/images/products/lions-mane-capsules/blue-lotus-flower-packs-1.jpg';
import lionsManeCapsules2 from '../assets/images/products/lions-mane-capsules/blue-lotus-flower-pack.jpg';
import lionsManeCapsules3 from '../assets/images/products/lions-mane-capsules/blue-lotus-flower.jpg';

// Import lions mane powder images
import lionsManePowder1 from '../assets/images/products/lions-mane-powder/blue-lotus-flower-tea-cut-1.jpg';
import lionsManePowder2 from '../assets/images/products/lions-mane-powder/blue-lotus-flower-tea-cut-2.jpg';
import lionsManePowder3 from '../assets/images/products/lions-mane-powder/blue-lotus-flower-tea-cut.jpg';

// Import lions mane extract images
import lionsManeExtract1 from '../assets/images/products/lions-mane-extract/blue-lotus-flower-smoking-blend-1.jpg';
import lionsManeExtract2 from '../assets/images/products/lions-mane-extract/blue-lotus-flower-smoking-blend-2.jpg';
import lionsManeExtract3 from '../assets/images/products/lions-mane-extract/blue-lotus-flower-smoking-blend-3.jpg';

// Import lions mane tea images
import lionsManeTea1 from '../assets/images/products/lions-mane-tea/blue-lotus-flower-tea-bags.jpg';
import lionsManeTea2 from '../assets/images/products/lions-mane-tea/blue-lotus-flower-tea.jpg';
import lionsManeTea3 from '../assets/images/products/lions-mane-tea/chamomile-blue-lotus-flower-tea-bags.jpg';

// Import lions mane tincture images
import lionsManeTincture1 from '../assets/images/products/lions-mane-tincture/blue-lotus-flower-pre-rolls-1.jpg';
import lionsManeTincture2 from '../assets/images/products/lions-mane-tincture/blue-lotus-flower-pre-rolls-2.jpg';
import lionsManeTincture3 from '../assets/images/products/lions-mane-tincture/blue-lotus-flower-pre-rolls-3.jpg';

// list of products
//- lions mane capsules
//- lions mane powder
//- lions mane extract
//- lions mane tea
//- lions mane tincture

export const PRODUCTS: Products = {
  'lions-mane-capsules': {
    title: 'Lions Mane Mushroom Capsules (Premium Quality)',
    description: 'Buy Lions Mane Capsules from the leading supplier in the UK. At Lions Mane Labs UK, we pride ourselves on top quality Lions Mane Mushroom Capsules.',
    price: 24.99,
    salePrice: 19.99,
    images: {
      main: lionsManeCapsules1,
      thumbnail: lionsManeCapsules2,
      additional: [lionsManeCapsules3],
    },
    variants: [
      { value: '30', label: '30 Capsules', price: 24.99, salePrice: 19.99 },
      { value: '60', label: '60 Capsules', price: 44.99, salePrice: 35.99 },
      { value: '120', label: '120 Capsules', price: 79.99, salePrice: 64.99 },
      { value: '240', label: '240 Capsules', price: 139.99, salePrice: 114.99 },
    ],
    reviews: [
      { user: 'Sarah', rating: 5, comment: 'Amazing cognitive enhancement!' },
      { user: 'Mike', rating: 4, comment: 'Great for focus and memory.' },
    ],
    details: {
      description: {
        content: [
          "Experience the power of premium Lions Mane Mushroom with our expertly crafted capsules. Each capsule contains 100% pure Lions Mane extract, carefully processed to preserve the mushroom's natural cognitive-enhancing properties.",
          
          "What makes our capsules extraordinary? It's the perfect combination of potency and convenience. We've sourced the finest Lions Mane mushrooms and processed them using advanced extraction methods to ensure maximum bioavailability. Unlike inferior products, our capsules contain standardized extracts with guaranteed active compounds. <a href='/articles/what-is-lions-mane-mushroom' class='text-blue-600 hover:text-blue-800'>Discover the science behind Lions Mane</a>.",
          
          "Sourced from our certified organic farms, each mushroom is cultivated under optimal conditions and harvested at peak potency. Our state-of-the-art processing facility ensures every capsule delivers consistent quality and maximum benefits. Interested in its cognitive benefits? Explore our guide about <a href='/articles/lions-mane-cognitive-benefits' class='text-blue-600 hover:text-blue-800'>Lions Mane's brain-boosting properties</a>.",
          
          "Cognitive enhancement enthusiasts choose our capsules for:",
          "• Standardized extract for consistent results",
          "• High bioavailability for maximum absorption",
          "• Convenient daily supplementation",
          "• Third-party tested for purity and potency",
          "• No fillers, binders, or artificial additives",
          
          "Each capsule is designed for optimal absorption, allowing you to experience the full benefits of Lions Mane without the earthy taste. For best results, take 1-2 capsules daily with food, allowing your body to gradually build up the beneficial compounds. This measured approach ensures optimal cognitive enhancement and supports long-term brain health.",
          
          "🌿 Important Notes & Legal Information:",
          "• Dietary supplement - not intended to diagnose, treat, cure, or prevent any disease",
          "• Consult with a healthcare professional before use if pregnant, nursing, or taking medications",
          "• Keep out of reach of children",
          "• Store in a cool, dry place away from direct sunlight",
          "• These statements have not been evaluated by the Food and Drug Administration",
          
          "At Lions Mane Labs UK, we take pride in offering premium Lions Mane supplements while maintaining complete transparency about their benefits and proper usage. Your cognitive enhancement journey starts here."
        ],
        schema: {
          "@type": "Product",
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "composition",
              "value": "100% Pure Lions Mane Mushroom Extract"
            },
            {
              "@type": "PropertyValue",
              "name": "extraction_method",
              "value": "Dual Extraction (Water + Alcohol)"
            },
            {
              "@type": "PropertyValue",
              "name": "standardization",
              "value": "Standardized for Active Compounds"
            },
            {
              "@type": "PropertyValue",
              "name": "intended_use",
              "value": "Cognitive Enhancement Supplement"
            }
          ]
        }
      },
      productInformation: {
        content: [
          {
            heading: "What's so special about our Lions Mane Capsules?",
            content: "Discover a new level of cognitive enhancement with our premium Lions Mane Capsules. Expertly formulated to support memory, focus, and overall brain health, these capsules offer a convenient way to harness the power of this remarkable mushroom."
          },
          {
            heading: "What Is Lions Mane Mushroom?",
            content: "Lions Mane (Hericium erinaceus) is a unique mushroom known for its distinctive appearance and remarkable cognitive benefits. Traditionally used in Asian medicine, modern research has confirmed its potential to support brain health and cognitive function."
          },
          {
            heading: "What Are The Benefits?",
            content: "Our Lions Mane supplements are designed to support cognitive function and may offer the following benefits: Enhanced memory and learning, Improved focus and concentration, Support for nerve regeneration, Natural mood support, Antioxidant protection for brain cells, Support for healthy aging."
          },
          {
            heading: "What Will I Receive?",
            content: "When ordering your Lions Mane Capsules from us, you'll receive your discrete package through the mail, containing the quantity requested in a secure, airtight container to maintain freshness and potency. We offer fast shipping across the UK and worldwide."
          }
        ]
      },
      specifications: {
        content: [
          {
            icon: "weight",
            label: "Capsule Count",
            value: "30, 60, 120, or 240 capsules per bottle"
          },
          {
            icon: "packSize",
            label: "Extract Strength",
            value: "500mg per capsule (10:1 extract ratio)"
          },
          {
            icon: "origin",
            label: "Origin",
            value: "Premium grade Lions Mane mushrooms from certified organic farms"
          }
        ]
      },
      shipping: {
        content: [
          {
            name: "Standard UK Delivery",
            price: 3.99,
            estimatedDays: "3-5 working days"
          },
          {
            name: "Express UK Delivery",
            price: 6.99,
            estimatedDays: "Next working day if ordered before 2pm"
          },
          {
            name: "Free UK Delivery",
            price: 0,
            estimatedDays: "3-5 working days on orders over £30"
          }
        ],
        freeShippingThreshold: 30
      },
      instructions: {
        content: [
          "Take 1-2 capsules daily with food",
          "Best taken in the morning or early afternoon",
          "Allow 2-4 weeks to experience full benefits",
          "Maintain consistent daily use for optimal results",
          "Store in a cool, dry place away from direct sunlight",
          "Keep out of reach of children",
          "Consult healthcare professional if taking medications"
        ],
        schema: {
          "@type": "HowTo",
          "name": "How to Use Lions Mane Capsules",
          "steps": [
            {
              "@type": "HowToStep",
              "text": "Take 1-2 capsules daily with food"
            },
            {
              "@type": "HowToStep",
              "text": "Best taken in the morning or early afternoon"
            },
            {
              "@type": "HowToStep",
              "text": "Allow 2-4 weeks to experience full benefits"
            },
            {
              "@type": "HowToStep",
              "text": "Maintain consistent daily use for optimal results"
            },
            {
              "@type": "HowToStep",
              "text": "Store in a cool, dry place away from direct sunlight"
            }
          ]
        }
      },
      relatedArticles: [
        {
          slug: 'lions-mane-cognitive-benefits',
          title: 'Complete Guide to Lions Mane Benefits',
          description: 'Learn about the cognitive and health benefits of Lions Mane mushroom.'
        },
        {
          slug: 'lions-mane-dosage-guide',
          title: 'Lions Mane Dosage Guide',
          description: 'Find the optimal dosage for your Lions Mane supplementation.'
        },
        {
          slug: 'lions-mane-vs-other-nootropics',
          title: 'Lions Mane vs Other Nootropics',
          description: 'Compare Lions Mane with other cognitive enhancement supplements.'
        }
      ]
    }
  },
  'lions-mane-powder': {
    title: 'Lions Mane Mushroom Powder (Premium Grade)',
    description: 'Buy Lions Mane Powder from the top supplier in the UK. At Lions Mane Labs UK, we pride ourselves on supplying top quality dried Lions Mane Powder.',
    price: 19.99,
    salePrice: 15.99,
    images: {
      main: lionsManePowder1,
      thumbnail: lionsManePowder2,
      additional: [lionsManePowder3],
    },
    variants: [
      { value: '50g', label: '50g Pack', price: 19.99, salePrice: 15.99 },
      { value: '100g', label: '100g Pack', price: 34.99, salePrice: 27.99 },
      { value: '250g', label: '250g Pack', price: 69.99, salePrice: 55.99 },
      { value: '500g', label: '500g Pack', price: 119.99, salePrice: 95.99 },
    ],
    reviews: [
      { user: 'Emma', rating: 5, comment: 'Perfect for smoothies!' },
      { user: 'James', rating: 4, comment: 'Great quality powder.' },
    ],
    details: {
      description: {
        content: [
          "Discover the versatility of our premium Lions Mane Powder, carefully ground from whole fruiting bodies to preserve maximum nutritional value. This fine powder offers endless possibilities for incorporating Lions Mane into your daily routine.",
          
          "What sets our powder apart? It's the purity and potency. We use only the finest Lions Mane mushrooms, carefully dried and ground to a fine consistency that dissolves easily in liquids. Unlike extracts, our powder contains the complete mushroom profile, including beneficial fibers and compounds. <a href='/articles/what-is-lions-mane-mushroom' class='text-blue-600 hover:text-blue-800'>Learn more about Lions Mane's complete benefits</a>.",
          
          "Sourced from our certified organic farms, each mushroom is harvested at peak maturity and processed using gentle methods to preserve its natural properties. Our fine grinding process ensures optimal absorption while maintaining the mushroom's complete nutritional profile. Curious about preparation methods? Explore our guide on <a href='/articles/how-to-use-lions-mane-powder' class='text-blue-600 hover:text-blue-800'>creative ways to use Lions Mane powder</a>.",
          
          "Health enthusiasts appreciate our powder for its:",
          "• Complete mushroom profile with all natural compounds",
          "• Fine grind for easy mixing and absorption",
          "• Versatile use in drinks, foods, and recipes",
          "• No fillers or additives",
          "• Rich in beneficial fibers and nutrients",
          
          "Each batch is carefully processed to achieve the perfect consistency for optimal absorption. The fine powder dissolves easily in water, smoothies, or can be added to your favorite recipes. Unlike capsules, powder form allows for flexible dosing and creative culinary applications.",
          
          "🌿 Important Notes & Legal Information:",
          "• Dietary supplement - not intended to diagnose, treat, cure, or prevent any disease",
          "• Consult with a healthcare professional before use if pregnant, nursing, or taking medications",
          "• Keep out of reach of children",
          "• Store in a cool, dry place away from direct sunlight",
          "• These statements have not been evaluated by the Food and Drug Administration",
          
          "At Lions Mane Labs UK, we're dedicated to providing premium quality Lions Mane powder while maintaining complete transparency about its benefits and proper usage. Your journey to enhanced cognitive function starts here."
        ],
        schema: {
          "@type": "Product",
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "composition",
              "value": "100% Pure Lions Mane Mushroom Powder"
            },
            {
              "@type": "PropertyValue",
              "name": "processing",
              "value": "Whole fruiting body, fine ground"
            },
            {
              "@type": "PropertyValue",
              "name": "origin",
              "value": "Certified Organic Farms"
            },
            {
              "@type": "PropertyValue",
              "name": "intended_use",
              "value": "Dietary Supplement and Culinary Use"
            }
          ]
        }
      },
      productInformation: {
        content: [
          {
            heading: "What's so special about our Lions Mane Powder?",
            content: "Discover the versatility and potency of our premium Lions Mane Powder. Made from whole fruiting bodies and ground to perfection, this powder offers maximum flexibility in how you incorporate Lions Mane into your daily routine."
          },
          {
            heading: "What Is Lions Mane Mushroom?",
            content: "Lions Mane (Hericium erinaceus) is a unique mushroom known for its distinctive appearance and remarkable cognitive benefits. Our powder is made from whole fruiting bodies, preserving all the natural compounds and beneficial fibers."
          },
          {
            heading: "What Are The Benefits?",
            "content": "Our Lions Mane powder is designed to support cognitive function and may offer the following benefits: Enhanced memory and learning, Improved focus and concentration, Support for nerve regeneration, Natural mood support, Antioxidant protection, Digestive health support from natural fibers."
          },
          {
            heading: "What Will I Receive?",
            content: "When you order from us, you'll receive your discrete package through the mail, containing the quantity requested in a resealable, airtight pouch to maintain freshness and potency. We offer fast shipping across the UK and worldwide."
          }
        ]
      },
      specifications: {
        content: [
          {
            icon: "weight",
            label: "Available Weights",
            value: "50g, 100g, 250g, 500g"
          },
          {
            icon: "packSize",
            label: "Packaging",
            value: "Resealable, airtight pouch"
          },
          {
            icon: "storage",
            label: "Storage",
            value: "Store in a cool, dry place away from direct sunlight"
          }
        ]
      },
      instructions: {
        content: [
          "Mix 1-2 teaspoons into smoothies, coffee, or tea",
          "Can be added to soups, sauces, or baked goods",
          "Start with smaller amounts and adjust to taste",
          "Best taken with food for optimal absorption",
          "Store in a cool, dry place away from direct sunlight",
          "Keep out of reach of children"
        ],
        schema: {
          "@type": "HowTo",
          "name": "How to Use Lions Mane Powder",
          "steps": [
            {
              "@type": "HowToStep",
              "text": "Mix 1-2 teaspoons into smoothies, coffee, or tea"
            },
            {
              "@type": "HowToStep",
              "text": "Can be added to soups, sauces, or baked goods"
            },
            {
              "@type": "HowToStep",
              "text": "Start with smaller amounts and adjust to taste"
            },
            {
              "@type": "HowToStep",
              "text": "Best taken with food for optimal absorption"
            },
            {
              "@type": "HowToStep",
              "text": "Store in a cool, dry place away from direct sunlight"
            }
          ]
        }
      },
      shipping: {
        content: [
          {
            name: "Standard UK Delivery",
            price: 3.99,
            estimatedDays: "3-5 working days"
          },
          {
            name: "Express UK Delivery",
            price: 6.99,
            estimatedDays: "Next working day if ordered before 2pm"
          },
          {
            name: "Free UK Delivery",
            price: 0,
            estimatedDays: "3-5 working days on orders over £30"
          }
        ],
        freeShippingThreshold: 30
      },
      relatedArticles: [
        {
          slug: 'how-to-use-lions-mane-powder',
          title: 'Creative Ways to Use Lions Mane Powder',
          description: 'Discover delicious recipes and methods for incorporating Lions Mane powder into your diet.'
        },
        {
          slug: 'lions-mane-smoothie-recipes',
          title: 'Lions Mane Smoothie Recipes',
          description: 'Try these delicious smoothie recipes featuring Lions Mane powder.'
        },
        {
          slug: 'lions-mane-cooking-guide',
          title: 'Cooking with Lions Mane',
          description: 'Learn how to cook with Lions Mane powder in various dishes.'
        }
      ]
    }
  },

  'lions-mane-extract': {
    title: 'Lions Mane Mushroom Extract (High Potency)',
    description: 'Buy Lions Mane Extract from the top supplier in the UK. At Lions Mane Labs UK, we pride ourselves on supplying top quality concentrated Lions Mane Extract.',
    price: 29.99,
    salePrice: 23.99,
    images: {
      main: lionsManeExtract1,
      thumbnail: lionsManeExtract2,
      additional: [lionsManeExtract3],
    },
    variants: [
      { value: '30ml', label: '30ml Bottle', price: 29.99, salePrice: 23.99 },
      { value: '60ml', label: '60ml Bottle', price: 49.99, salePrice: 39.99 },
      { value: '120ml', label: '120ml Bottle', price: 79.99, salePrice: 64.99 },
      { value: '240ml', label: '240ml Bottle', price: 139.99, salePrice: 114.99 },
    ],
    reviews: [
      { user: 'Alex', rating: 5, comment: 'Most potent Lions Mane I\'ve tried!' },
      { user: 'Lisa', rating: 4, comment: 'Great for cognitive enhancement.' },
    ],
    details: {
      description: {
        content: [
          "Experience the ultimate in Lions Mane potency with our premium extract. This concentrated liquid extract delivers maximum active compounds in every drop, making it the most efficient way to experience Lions Mane's cognitive benefits.",
          
          "What makes our extract extraordinary? It's the dual extraction process that captures both water-soluble and alcohol-soluble compounds. This advanced method ensures you get the complete spectrum of Lions Mane's beneficial compounds, including hericenones and erinacines. <a href='/articles/what-is-lions-mane-mushroom' class='text-blue-600 hover:text-blue-800'>Learn about Lions Mane's active compounds</a>.",
          
          "Sourced from premium Lions Mane mushrooms and processed in our state-of-the-art facility, each batch is tested for potency and purity. Our liquid extract offers superior bioavailability compared to capsules or powder, allowing for faster absorption and more immediate effects. Interested in the science? Explore our guide on <a href='/articles/lions-mane-extraction-methods' class='text-blue-600 hover:text-blue-800'>extraction methods and potency</a>.",
          
          "Serious cognitive enhancement enthusiasts choose our extract for:",
          "• Maximum potency with dual extraction",
          "• Superior bioavailability and absorption",
          "• Precise dosing with included dropper",
          "• Fast-acting liquid format",
          "• Third-party tested for purity and potency",
          
          "Each bottle comes with a precision dropper for accurate dosing. The liquid format allows for sublingual administration, bypassing the digestive system for faster absorption. This makes our extract ideal for those seeking immediate cognitive enhancement or those who prefer liquid supplements.",
          
          "🌿 Important Notes & Legal Information:",
          "• Dietary supplement - not intended to diagnose, treat, cure, or prevent any disease",
          "• Consult with a healthcare professional before use if pregnant, nursing, or taking medications",
          "• Keep out of reach of children",
          "• Store in a cool, dry place away from direct sunlight",
          "• These statements have not been evaluated by the Food and Drug Administration",
          
          "At Lions Mane Labs UK, we're committed to providing the most potent Lions Mane extract while maintaining complete transparency about its benefits and proper usage. Your cognitive enhancement journey reaches new heights here."
        ],
        schema: {
          "@type": "Product",
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "composition",
              "value": "Dual Extracted Lions Mane Mushroom Extract"
            },
            {
              "@type": "PropertyValue",
              "name": "extraction_ratio",
              "value": "10:1 Concentrated Extract"
            },
            {
              "@type": "PropertyValue",
              "name": "extraction_method",
              "value": "Dual Extraction (Water + Alcohol)"
            },
            {
              "@type": "PropertyValue",
              "name": "intended_use",
              "value": "High Potency Cognitive Enhancement"
            }
          ]
        }
      },
      productInformation: {
        content: [
          {
            heading: "What's so special about our Lions Mane Extract?",
            content: "Discover the ultimate in Lions Mane potency with our premium dual-extracted liquid. This concentrated extract delivers maximum active compounds for superior cognitive enhancement and faster absorption."
          },
          {
            heading: "What Is Lions Mane Mushroom?",
            content: "Lions Mane (Hericium erinaceus) is a unique mushroom known for its cognitive benefits. Our extract uses dual extraction to capture both water-soluble and alcohol-soluble compounds for maximum potency."
          },
          {
            heading: "What Are The Benefits?",
            content: "Our Lions Mane extract is designed for maximum cognitive enhancement and may offer the following benefits: Enhanced memory and learning, Improved focus and concentration, Support for nerve regeneration, Natural mood support, Antioxidant protection, Fast-acting liquid absorption."
          },
          {
            heading: "What Will I Receive?",
            content: "When you order from us, you'll receive your discrete package through the mail, containing the quantity requested in a dark glass bottle with precision dropper to maintain potency and ensure accurate dosing."
          }
        ]
      },
      specifications: {
        content: [
          {
            icon: "weight",
            label: "Bottle Sizes",
            value: "30ml, 60ml, 120ml, 240ml"
          },
          {
            icon: "packSize",
            label: "Extract Ratio",
            value: "10:1 Concentrated Extract"
          },
          {
            icon: "storage",
            label: "Storage",
            value: "Store in a cool, dry place away from direct sunlight"
          }
        ]
      },
      instructions: {
        content: [
          "Take 1-2 droppers full (1-2ml) daily",
          "Can be taken directly or mixed with water/juice",
          "For faster absorption, hold under tongue for 30 seconds",
          "Best taken in the morning or early afternoon",
          "Store in a cool, dry place away from direct sunlight",
          "Keep out of reach of children"
        ],
        schema: {
          "@type": "HowTo",
          "name": "How to Use Lions Mane Extract",
          "steps": [
            {
              "@type": "HowToStep",
              "text": "Take 1-2 droppers full (1-2ml) daily"
            },
            {
              "@type": "HowToStep",
              "text": "Can be taken directly or mixed with water/juice"
            },
            {
              "@type": "HowToStep",
              "text": "For faster absorption, hold under tongue for 30 seconds"
            },
            {
              "@type": "HowToStep",
              "text": "Best taken in the morning or early afternoon"
            },
            {
              "@type": "HowToStep",
              "text": "Store in a cool, dry place away from direct sunlight"
            }
          ]
        }
      },
      shipping: {
        content: [
          {
            name: "Standard UK Delivery",
            price: 3.99,
            estimatedDays: "3-5 working days"
          },
          {
            name: "Express UK Delivery",
            price: 6.99,
            estimatedDays: "Next working day if ordered before 2pm"
          },
          {
            name: "Free UK Delivery",
            price: 0,
            estimatedDays: "3-5 working days on orders over £30"
          }
        ],
        freeShippingThreshold: 30
      },
      relatedArticles: [
        {
          slug: 'lions-mane-extraction-methods',
          title: 'Understanding Lions Mane Extraction',
          description: 'Learn about different extraction methods and their benefits.'
        },
        {
          slug: 'lions-mane-dosage-guide',
          title: 'Lions Mane Dosage Guide',
          description: 'Find the optimal dosage for your Lions Mane supplementation.'
        },
        {
          slug: 'lions-mane-vs-other-nootropics',
          title: 'Lions Mane vs Other Nootropics',
          description: 'Compare Lions Mane with other cognitive enhancement supplements.'
        }
      ]
    }
  },
  'lions-mane-tea': {
    title: 'Lions Mane Mushroom Tea (Organic Blend)',
    description: 'Buy Lions Mane Tea from the top supplier in the UK. At Lions Mane Labs UK, we pride ourselves on supplying top quality organic Lions Mane Tea.',
    price: 14.99,
    salePrice: 11.99,
    images: {
      main: lionsManeTea1,
      thumbnail: lionsManeTea2,
      additional: [lionsManeTea3],
    },
    variants: [
      { value: '20', label: '20 Tea Bags', price: 14.99, salePrice: 11.99 },
      { value: '40', label: '40 Tea Bags', price: 24.99, salePrice: 19.99 },
      { value: '80', label: '80 Tea Bags', price: 39.99, salePrice: 31.99 },
      { value: '160', label: '160 Tea Bags', price: 69.99, salePrice: 55.99 },
    ],
    reviews: [
      { user: 'Tom', rating: 5, comment: 'Perfect morning tea!' },
      { user: 'Rachel', rating: 4, comment: 'Great taste and benefits.' },
    ],
    details: {
      description: {
        content: [
          "Transform your daily tea ritual with our premium Lions Mane Tea. Each tea bag contains a perfect blend of Lions Mane mushroom and complementary herbs, creating a delicious and beneficial beverage that supports cognitive health.",
          
          "What makes our tea special? It's the perfect balance of taste and benefits. We've carefully selected premium Lions Mane mushrooms and blended them with complementary herbs to create a smooth, earthy flavor that's both enjoyable and beneficial. <a href='/articles/what-is-lions-mane-mushroom' class='text-blue-600 hover:text-blue-800'>Discover the benefits of Lions Mane tea</a>.",
          
          "Sourced from our certified organic farms, each tea bag contains carefully measured amounts of Lions Mane and complementary herbs. Our gentle processing preserves the beneficial compounds while creating a pleasant drinking experience. Want to learn more about preparation? Check out our <a href='/articles/how-to-brew-lions-mane-tea' class='text-blue-600 hover:text-blue-800'>complete brewing guide</a>.",
          
          "Tea enthusiasts appreciate our blend for its:",
          "• Smooth, earthy flavor profile",
          "• Convenient tea bag format",
          "• Cognitive enhancement benefits",
          "• Organic and natural ingredients",
          "• Perfect for daily consumption",
          
          "Each tea bag is individually wrapped to maintain freshness and potency. The blend is designed to be enjoyed daily as part of your wellness routine, providing gentle cognitive support while you enjoy a delicious cup of tea.",
          
          "🌿 Important Notes & Legal Information:",
          "• Dietary supplement - not intended to diagnose, treat, cure, or prevent any disease",
          "• Consult with a healthcare professional before use if pregnant, nursing, or taking medications",
          "• Keep out of reach of children",
          "• Store in a cool, dry place away from direct sunlight",
          "• These statements have not been evaluated by the Food and Drug Administration",
          
          "At Lions Mane Labs UK, we're passionate about bringing you the finest Lions Mane tea experience while maintaining complete transparency about its benefits and proper usage. Your daily cognitive enhancement ritual starts here."
        ],
        schema: {
          "@type": "Product",
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "composition",
              "value": "Lions Mane Mushroom and Complementary Herbs"
            },
            {
              "@type": "PropertyValue",
              "name": "origin",
              "value": "Certified Organic Farms"
            },
            {
              "@type": "PropertyValue",
              "name": "format",
              "value": "Individual Tea Bags"
            },
            {
              "@type": "PropertyValue",
              "name": "intended_use",
              "value": "Daily Cognitive Enhancement Tea"
            }
          ]
        }
      },
      productInformation: {
        content: [
          {
            heading: "What's so special about our Lions Mane Tea?",
            content: "Experience the perfect blend of taste and cognitive benefits with our premium Lions Mane Tea. Each tea bag contains carefully selected Lions Mane mushrooms and complementary herbs for a delicious daily wellness ritual."
          },
          {
            heading: "What Is Lions Mane Mushroom?",
            content: "Lions Mane (Hericium erinaceus) is a unique mushroom known for its cognitive benefits. Our tea blend combines Lions Mane with complementary herbs to create a smooth, enjoyable drinking experience."
          },
          {
            heading: "What Are The Benefits?",
            content: "Our Lions Mane tea is designed to support cognitive function and may offer the following benefits: Enhanced memory and learning, Improved focus and concentration, Natural mood support, Antioxidant protection, Gentle daily cognitive support, Relaxing tea ritual."
          },
          {
            heading: "What Will I Receive?",
            content: "When you order from us, you'll receive your discrete package through the mail, containing the quantity requested in individually wrapped tea bags to maintain freshness and potency."
          }
        ]
      },
      specifications: {
        content: [
          {
            icon: "weight",
            label: "Tea Bags per Pack",
            value: "20, 40, 80, or 160 tea bags"
          },
          {
            icon: "packSize",
            label: "Packaging",
            value: "Individually wrapped tea bags"
          },
          {
            icon: "storage",
            label: "Storage",
            value: "Store in a cool, dry place away from direct sunlight"
          }
        ]
      },
      instructions: {
        content: [
          "Bring fresh water to just below boiling (95°C/203°F)",
          "Place one tea bag in your cup or mug",
          "Pour hot water over the tea bag",
          "Steep for 5-7 minutes for optimal flavor and benefits",
          "Remove tea bag and enjoy",
          "Can be enjoyed hot or cold",
          "Store unused tea bags in their original packaging"
        ],
        schema: {
          "@type": "HowTo",
          "name": "How to Brew Lions Mane Tea",
          "steps": [
            {
              "@type": "HowToStep",
              "text": "Bring fresh water to just below boiling (95°C/203°F)"
            },
            {
              "@type": "HowToStep",
              "text": "Place one tea bag in your cup or mug"
            },
            {
              "@type": "HowToStep",
              "text": "Pour hot water over the tea bag"
            },
            {
              "@type": "HowToStep",
              "text": "Steep for 5-7 minutes for optimal flavor and benefits"
            },
            {
              "@type": "HowToStep",
              "text": "Remove tea bag and enjoy"
            }
          ]
        }
      },
      shipping: {
        content: [
          {
            name: "Standard UK Delivery",
            price: 3.99,
            estimatedDays: "3-5 working days"
          },
          {
            name: "Express UK Delivery",
            price: 6.99,
            estimatedDays: "Next working day if ordered before 2pm"
          },
          {
            name: "Free UK Delivery",
            price: 0,
            estimatedDays: "3-5 working days on orders over £30"
          }
        ],
        freeShippingThreshold: 30
      },
      relatedArticles: [
        {
          slug: 'how-to-brew-lions-mane-tea',
          title: 'Perfect Lions Mane Tea Guide',
          description: 'Master the art of brewing Lions Mane tea for maximum benefits.'
        },
        {
          slug: 'lions-mane-tea-benefits',
          title: 'Benefits of Lions Mane Tea',
          description: 'Learn about the cognitive and health benefits of Lions Mane tea.'
        },
        {
          slug: 'lions-mane-tea-recipes',
          title: 'Lions Mane Tea Recipes',
          description: 'Try these delicious variations of Lions Mane tea.'
        }
      ]
    }
  },
  'lions-mane-tincture': {
    title: 'Lions Mane Mushroom Tincture (Alcohol-Free)',
    description: 'Buy Lions Mane Tincture from the top supplier in the UK. At Lions Mane Labs UK, we pride ourselves on supplying top quality alcohol-free Lions Mane Tincture.',
    price: 22.99,
    salePrice: 18.99,
    images: {
      main: lionsManeTincture1,
      thumbnail: lionsManeTincture2,
      additional: [lionsManeTincture3],
    },
    variants: [
      { value: '30ml', label: '30ml Bottle', price: 22.99, salePrice: 18.99 },
      { value: '60ml', label: '60ml Bottle', price: 39.99, salePrice: 31.99 },
      { value: '120ml', label: '120ml Bottle', price: 69.99, salePrice: 55.99 },
      { value: '240ml', label: '240ml Bottle', price: 119.99, salePrice: 95.99 },
    ],
    reviews: [
      { user: 'Mark', rating: 5, comment: 'Great for those avoiding alcohol!' },
      { user: 'Sophie', rating: 4, comment: 'Effective and convenient.' },
    ],
    details: {
      description: {
        content: [
          "Experience the benefits of Lions Mane with our premium alcohol-free tincture. This gentle yet effective formula is perfect for those who prefer to avoid alcohol-based extracts while still enjoying the cognitive benefits of Lions Mane.",
          
          "What makes our tincture special? It's the alcohol-free extraction process that preserves Lions Mane's beneficial compounds using glycerin and water. This gentle method creates a mild, slightly sweet tincture that's suitable for everyone, including children and those avoiding alcohol. <a href='/articles/what-is-lions-mane-mushroom' class='text-blue-600 hover:text-blue-800'>Learn about alcohol-free extraction methods</a>.",
          
          "Sourced from premium Lions Mane mushrooms and processed using gentle extraction methods, each batch is tested for potency and purity. Our alcohol-free tincture offers excellent bioavailability while being gentle on the stomach and suitable for daily use. Interested in the benefits? Explore our guide on <a href='/articles/lions-mane-alcohol-free-benefits' class='text-blue-600 hover:text-blue-800'>alcohol-free Lions Mane benefits</a>.",
          
          "Health-conscious individuals choose our tincture for its:",
          "• Alcohol-free, gentle extraction",
          "• Mild, slightly sweet taste",
          "• Suitable for all ages",
          "• Easy to take and absorb",
          "• Convenient dropper bottle",
          
          "Each bottle comes with a precision dropper for accurate dosing. The alcohol-free formula makes it perfect for those who prefer to avoid alcohol-based extracts, while still providing the cognitive benefits of Lions Mane in an easy-to-take format.",
          
          "🌿 Important Notes & Legal Information:",
          "• Dietary supplement - not intended to diagnose, treat, cure, or prevent any disease",
          "• Consult with a healthcare professional before use if pregnant, nursing, or taking medications",
          "• Keep out of reach of children",
          "• Store in a cool, dry place away from direct sunlight",
          "• These statements have not been evaluated by the Food and Drug Administration",
          
          "At Lions Mane Labs UK, we're committed to providing premium Lions Mane tinctures while maintaining complete transparency about their benefits and proper usage. Your gentle cognitive enhancement journey starts here."
        ],
        schema: {
          "@type": "Product",
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "composition",
              "value": "Alcohol-Free Lions Mane Mushroom Tincture"
            },
            {
              "@type": "PropertyValue",
              "name": "extraction_method",
              "value": "Glycerin and Water Extraction"
            },
            {
              "@type": "PropertyValue",
              "name": "alcohol_content",
              "value": "0% Alcohol"
            },
            {
              "@type": "PropertyValue",
              "name": "intended_use",
              "value": "Gentle Cognitive Enhancement"
            }
          ]
        }
      },
      productInformation: {
        content: [
          {
            heading: "What's so special about our Lions Mane Tincture?",
            content: "Discover the gentle power of our alcohol-free Lions Mane tincture. Perfect for those who prefer to avoid alcohol-based extracts, this tincture provides the cognitive benefits of Lions Mane in a mild, easy-to-take format."
          },
          {
            heading: "What Is Lions Mane Mushroom?",
            content: "Lions Mane (Hericium erinaceus) is a unique mushroom known for its cognitive benefits. Our alcohol-free tincture uses glycerin and water extraction to preserve the beneficial compounds while being gentle on the body."
          },
          {
            heading: "What Are The Benefits?",
            content: "Our Lions Mane tincture is designed for gentle cognitive enhancement and may offer the following benefits: Enhanced memory and learning, Improved focus and concentration, Natural mood support, Antioxidant protection, Gentle daily cognitive support, Suitable for all ages."
          },
          {
            heading: "What Will I Receive?",
            content: "When you order from us, you'll receive your discrete package through the mail, containing the quantity requested in a dark glass bottle with precision dropper to maintain potency and ensure accurate dosing."
          }
        ]
      },
      specifications: {
        content: [
          {
            icon: "weight",
            label: "Bottle Sizes",
            value: "30ml, 60ml, 120ml, 240ml"
          },
          {
            icon: "packSize",
            label: "Extraction Method",
            value: "Glycerin and Water Extraction"
          },
          {
            icon: "storage",
            label: "Storage",
            value: "Store in a cool, dry place away from direct sunlight"
          }
        ]
      },
      instructions: {
        content: [
          "Take 1-2 droppers full (1-2ml) daily",
          "Can be taken directly or mixed with water/juice",
          "Best taken in the morning or early afternoon",
          "Suitable for all ages (adjust dosage for children)",
          "Store in a cool, dry place away from direct sunlight",
          "Keep out of reach of children"
        ],
        schema: {
          "@type": "HowTo",
          "name": "How to Use Lions Mane Tincture",
          "steps": [
            {
              "@type": "HowToStep",
              "text": "Take 1-2 droppers full (1-2ml) daily"
            },
            {
              "@type": "HowToStep",
              "text": "Can be taken directly or mixed with water/juice"
            },
            {
              "@type": "HowToStep",
              "text": "Best taken in the morning or early afternoon"
            },
            {
              "@type": "HowToStep",
              "text": "Suitable for all ages (adjust dosage for children)"
            },
            {
              "@type": "HowToStep",
              "text": "Store in a cool, dry place away from direct sunlight"
            }
          ]
        }
      },
      shipping: {
        content: [
          {
            name: "Standard UK Delivery",
            price: 3.99,
            estimatedDays: "3-5 working days"
          },
          {
            name: "Express UK Delivery",
            price: 6.99,
            estimatedDays: "Next working day if ordered before 2pm"
          },
          {
            name: "Free UK Delivery",
            price: 0,
            estimatedDays: "3-5 working days on orders over £30"
          }
        ],
        freeShippingThreshold: 30
      },
      relatedArticles: [
        {
          slug: 'lions-mane-alcohol-free-benefits',
          title: 'Benefits of Alcohol-Free Lions Mane',
          description: 'Learn about the advantages of alcohol-free Lions Mane tinctures.'
        },
        {
          slug: 'lions-mane-dosage-guide',
          title: 'Lions Mane Dosage Guide',
          description: 'Find the optimal dosage for your Lions Mane supplementation.'
        },
        {
          slug: 'lions-mane-for-children',
          title: 'Lions Mane for Children',
          description: 'Learn about safe Lions Mane supplementation for children.'
        }
      ]
    }
  },
};