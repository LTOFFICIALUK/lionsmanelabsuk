import { Products } from '../types';

// Import product images
import blueLotusPre1 from '../assets/images/products/blue-lotus-flower-pre-rolls/blue-lotus-flower-pre-rolls-1.jpg';
import blueLotusPre2 from '../assets/images/products/blue-lotus-flower-pre-rolls/blue-lotus-flower-pre-rolls-2.jpg';
import blueLotusPre3 from '../assets/images/products/blue-lotus-flower-pre-rolls/blue-lotus-flower-pre-rolls-3.jpg';

// Import blue lotus flower pack images
import blueLotusPack1 from '../assets/images/products/blue-lotus-flower-packs/blue-lotus-flower-packs-1.jpg';
import blueLotusPack2 from '../assets/images/products/blue-lotus-flower-packs/blue-lotus-flower-pack.jpg';
import blueLotusPack3 from '../assets/images/products/blue-lotus-flower-packs/blue-lotus-flower.jpg';

// Import blue lotus flower tea bags images
import blueLotusTeaBags1 from '../assets/images/products/blue-lotus-flower-tea-bags/blue-lotus-flower-tea-bags.jpg';
import blueLotusTeaBags2 from '../assets/images/products/blue-lotus-flower-tea-bags/blue-lotus-flower-tea.jpg';

// Import blue lotus flower smoking blend images
import blueLotusSmokingBlend1 from '../assets/images/products/blue-lotus-flower-smoking-blend/blue-lotus-flower-smoking-blend-1.jpg';
import blueLotusSmokingBlend2 from '../assets/images/products/blue-lotus-flower-smoking-blend/blue-lotus-flower-smoking-blend-2.jpg';
import blueLotusSmokingBlend3 from '../assets/images/products/blue-lotus-flower-smoking-blend/blue-lotus-flower-smoking-blend-3.jpg';

// Import blue lotus flower tea cut images
import blueLotusTeaCut1 from '../assets/images/products/blue-lotus-flower-tea-cut/blue-lotus-flower-tea-cut-1.jpg';
import blueLotusTeaCut2 from '../assets/images/products/blue-lotus-flower-tea-cut/blue-lotus-flower-tea-cut-2.jpg';
import blueLotusTeaCut3 from '../assets/images/products/blue-lotus-flower-tea-cut/blue-lotus-flower-tea-cut.jpg';

// list of products
//- blue lotus flower pre rolls 
//- blue lotus flower smoking blend
//- blue lotus flower packs 
//- blue lotus flower tea bags 
//- blue lotus flower tea cut 

export const PRODUCTS: Products = {
  'blue-lotus-flower-pre-rolls': {
    title: 'Blue Lotus Flower King Size Pre-Rolls (100% Blue Lotus Flower ONLY)',
    description: 'Buy Blue Lotus Flower Pre Rolls from the leading supplier in the UK. At Blue Dream Tea UK, we pride ourselves on top quality Blue Lotus Flower Pre Rolls.',
    price: 15.99,
    salePrice: 12.99,
    images: {
      main: blueLotusPre1,
      thumbnail: blueLotusPre2,
      additional: [blueLotusPre3],
    },
    variants: [
      { value: '6', label: '6 Pack', price: 22.99, salePrice: 18.99 },
      { value: '12', label: '12 Pack', price: 40.99, salePrice: 32.99 },
      { value: '24', label: '24 Pack', price: 72.99, salePrice: 58.99 },
      { value: '48', label: '48 Pack', price: 132.99, salePrice: 108.99 },
    ],
    reviews: [
      { user: 'Alice', rating: 5, comment: 'Amazing product!' },
      { user: 'Bob', rating: 4, comment: 'Very relaxing.' },
    ],
    details: {
      description: {
        content: [
          "Step into a world of refined relaxation with our signature Blue Lotus Pre-Rolls. Each pre-roll is a masterpiece of craftsmanship, featuring 100% pure Blue Lotus Flower (Nymphaea Caerulea) meticulously prepared to offer an experience that transcends the ordinary.",
          
          "What makes our pre-rolls extraordinary? It's the perfect marriage of convenience and authenticity. We've mastered the art of rolling to deliver a consistent, smooth experience every time. Unlike mass-produced alternatives, our pre-rolls contain absolutely no fillers or additives - just pure, premium Blue Lotus Flower in its most elegant form. <a href='/articles/what-is-blue-lotus-flower' class='text-blue-600 hover:text-blue-800'>Discover the mystique of Blue Lotus</a>.",
          
          "Sourced from our pristine gardens in Sri Lanka, each flower is organically cultivated and harvested at its peak. Our artisans carefully preserve the flower's natural essence through gentle processing, ensuring every pre-roll delivers the authentic character that Blue Lotus is cherished for. Interested in its traditional benefits? Explore our guide about <a href='/articles/blue-lotus-detoxifying-effects' class='text-blue-600 hover:text-blue-800'>Blue Lotus's calming properties</a>.",
          
          "Connoisseurs choose our pre-rolls for:",
          "• Perfectly balanced draw and burn",
          "• Pure, unadulterated Blue Lotus Flower",
          "• Consistent quality in every roll",
          "• Subtle, enchanting aroma",
          "• Convenient, ready-to-use format",
          
          "Each pre-roll is crafted to exacting standards, designed to be enjoyed slowly and mindfully. For the best experience, take gentle draws with 30-45 seconds between puffs, allowing the natural floral notes to unfold gradually. This measured approach ensures an even burn and helps preserve the delicate properties of the Blue Lotus Flower.",
          
          "🌿 Important Notes & Legal Information:",
          "• Intended for aromatherapy and decorative purposes only",
          "• This product is restricted in: Russia, Poland, Latvia, Lithuania, or Louisiana (USA)",
          "• Orders from restricted regions will be cancelled and refunded",
          "• Our products are not intended to diagnose, treat, cure, or prevent any disease",
          "• These statements have not been evaluated by the Food and Drug Administration",
          
          "At Blue Dream Tea UK, we take pride in offering premium Blue Lotus products while maintaining complete transparency about their uses and legal status. Your trust in our quality and authenticity drives everything we do."
        ],
        schema: {
          "@type": "Product",
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "composition",
              "value": "100% Pure Blue Lotus Flower"
            },
            {
              "@type": "PropertyValue",
              "name": "origin",
              "value": "Sri Lanka"
            },
            {
              "@type": "PropertyValue",
              "name": "processing",
              "value": "Hand-crafted pre-rolls"
            },
            {
              "@type": "PropertyValue",
              "name": "intended_use",
              "value": "Aromatherapy and Decoration"
            }
          ]
        }
      },
      productInformation: {
        content: [
          {
            heading: "What's so special about our Blue Lotus Pre Rolls?",
            content: "Discover a new level of serenity with our premium Blue Lotus Pre-Rolls. Expertly crafted to offer a unique smoking experience that stands apart from traditional cigarettes and weed. Embrace the calming allure of Blue Lotus Flower as you smoke your worries away, exploring the soothing effects that set it apart."
          },
          {
            heading: "What Is Blue Lotus Flower?",
            content: "Organically grown and dried in Sri Lanka, our Blue Lotus Flowers are shipped to the UK where they are crafted into the perfect product for our customer. Blue Lotus Flower is a captivating herb with a rich history and cultural significance. It's delicate celestial blue petals and subtle fragrance evoke tranquility and wonder."
          },
          {
            heading: "What Are The Effects?",
            content: "Our herbal smokes are traditionally enjoyed for its calming and soothing properties. It may offer the following benefits: Promotes relaxation and a sense of calm, Supports restful sleep, Helps to ease everyday stress and tension, Enhances feelings of well-being, Traditionally used for its aromatic qualities, Supports healthy skin and hair."
          },
          {
            heading: "What Will I Receive?",
            content: "When ordering your Blue Lotus Pre Rolls from us, you'll receive your discrete package through the mail, containing the quantity requested packed inside a grip-lock bag to maintain freshness. We offer fast shipping all over the world to places like: UK, Canada, USA, Asia, Europe and Oceania."
          }
        ]
      },
      specifications: {
        content: [
          {
            icon: "weight",
            label: "Weight per Pre-roll",
            value: "0.8g"
          },
          {
            icon: "packSize",
            label: "Pack Sizes",
            value: "Available in 6, 12, 24, or 48 pre-rolls"
          },
          {
            icon: "origin",
            label: "Origin",
            value: "Premium grade blue lotus flowers from Sri Lanka"
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
          "Remove pre-roll from packaging and inspect for quality",
          "Light the pre-roll evenly at the tip, rotating while lighting",
          "Take slow, gentle draws with 30-45 seconds between puffs",
          "Avoid smoking too quickly as this can cause uneven burning",
          "If needed, gently tap off ash to maintain even burning",
          "Extinguish completely when finished",
          "Store unused pre-rolls in the original packaging in a cool, dry place"
        ],
        schema: {
          "@type": "HowTo",
          "name": "How to Use Blue Lotus Pre-Rolls",
          "steps": [
            {
              "@type": "HowToStep",
              "text": "Remove pre-roll from packaging and inspect for quality"
            },
            {
              "@type": "HowToStep",
              "text": "Light the pre-roll evenly at the tip, rotating while lighting"
            },
            {
              "@type": "HowToStep",
              "text": "Take slow, gentle draws with 30-45 seconds between puffs"
            },
            {
              "@type": "HowToStep",
              "text": "Avoid smoking too quickly as this can cause uneven burning"
            },
            {
              "@type": "HowToStep",
              "text": "If needed, gently tap off ash to maintain even burning"
            },
            {
              "@type": "HowToStep",
              "text": "Extinguish completely when finished"
            }
          ]
        }
      },
      relatedArticles: [
        {
          slug: 'smoking-blue-lotus-flower-a-users-guide',
          title: 'Complete Guide to Using Blue Lotus Pre-Rolls',
          description: 'Learn the proper techniques and best practices for using Blue Lotus pre-rolls.'
        },
        {
          slug: 'blue-lotus-flower-effects',
          title: 'Understanding Blue Lotus Effects',
          description: 'Discover the traditional effects and properties of Blue Lotus Flower.'
        },
        {
          slug: 'is-it-safe-to-smoke-blue-lotus-flower',
          title: 'Safety Guide: Blue Lotus Pre-Rolls',
          description: 'Everything you need to know about safely using Blue Lotus pre-rolls.'
        }
      ]
    }
  },
  'blue-lotus-flower-smoking-blend': {
    title: 'Blue Lotus Flower Smoking Blend',
    description: 'Buy Blue Lotus Smoking Blend from the top supplier in the UK. At Blue Dream Worldwide, we pride ourselves on supplying top quality dried Blue Lotus Blends.',
    price: 15.99,
    salePrice: 12.99,
    images: {
      main: blueLotusSmokingBlend1,
      thumbnail: blueLotusSmokingBlend2,
      additional: [blueLotusSmokingBlend3],
    },
    variants: [
      { value: '10g', label: '10g Pack', price: 22.99, salePrice: 18.99 },
      { value: '25g', label: '25g Pack', price: 40.99, salePrice: 32.99 },
      { value: '50g', label: '50g Pack', price: 72.99, salePrice: 58.99 },
      { value: '100g', label: '100g Pack', price: 132.99, salePrice: 108.99 },
    ],
    reviews: [
      { user: 'Alice', rating: 5, comment: 'Amazing product!' },
      { user: 'Bob', rating: 4, comment: 'Very relaxing.' },
    ],
    details: {
      description: {
        content: [
          "Discover our meticulously crafted Blue Lotus Smoking Blend, where tradition meets purity. Each blend is thoughtfully prepared using only the finest parts of the flower - the delicate petals, precious stamen, and pistils, creating a natural alternative that's worlds apart from conventional options.",
          
          "What sets our blend apart? It's the purity. While others might add fillers or additives, our blend is 100% pure Blue Lotus Flower, nothing more, nothing less. Each batch is carefully ground to the perfect consistency, making it ideal for those seeking a natural alternative to tobacco. <a href='/articles/what-is-blue-lotus-flower' class='text-blue-600 hover:text-blue-800'>Learn more about Blue Lotus's rich history</a>.",
          
          "Sourced from our sustainable gardens in Sri Lanka, every flower is organically grown and harvested at peak maturity. Our artisanal processing methods preserve the flower's natural properties, ensuring you experience Blue Lotus in its most authentic form. Curious about the traditional benefits? Explore our guide on <a href='/articles/blue-lotus-detoxifying-effects' class='text-blue-600 hover:text-blue-800'>Blue Lotus's natural properties</a>.",
          
          "Traditional enthusiasts appreciate our blend for its:",
          "• Smooth, natural character",
          "• Perfect consistency for rolling",
          "• Subtle, aromatic qualities",
          "• Calming botanical properties",
          "• Pure, additive-free composition",
          
          "Each batch is expertly ground to achieve the perfect balance between texture and usability. The natural floral notes create a uniquely smooth experience, while our careful processing preserves the flower's delicate properties. Unlike harsh alternatives, our blend offers a gentle, refined character that true enthusiasts have come to prefer.",

          "🌿 Important Notes & Legal Information:",
          "• Intended for aromatherapy and decorative purposes only",
          "• This product is restricted in: Russia, Poland, Latvia, Lithuania, or Louisiana (USA)",
          "• Orders from restricted regions will be cancelled and refunded",
          "• Our products are not intended to diagnose, treat, cure, or prevent any disease",
          "• These statements have not been evaluated by the Food and Drug Administration",
          
          "At Blue Dream Tea UK, we're dedicated to providing premium quality Blue Lotus products while maintaining complete transparency about their uses and legal status. Your satisfaction and trust are paramount to us."
        ],
        schema: {
          "@type": "Product",
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "composition",
              "value": "100% Pure Blue Lotus Flower (petals, stamen, and pistils)"
            },
            {
              "@type": "PropertyValue",
              "name": "origin",
              "value": "Sri Lanka"
            },
            {
              "@type": "PropertyValue",
              "name": "processing",
              "value": "Artisanal ground blend"
            },
            {
              "@type": "PropertyValue",
              "name": "intended_use",
              "value": "Aromatherapy and Decoration"
            }
          ]
        }
      },
      specifications: {
      productInformation: {
        content: [
          {
            heading: "What's so special about our Blue Lotus Smoking Blend?",
            content: "Discover the perfect harmony of tradition and convenience with our premium Blue Lotus Smoking Blend. Expertly crafted to offer a unique smoking experience that stands apart from traditional alternatives, this blend combines the finest Blue Lotus Flower with complementary herbs for an enhanced experience."
          },
          {
            heading: "What Is Blue Lotus Flower?",
            content: "Blue Lotus Flower (Nymphaea Caerulea) is a revered herb with a rich history dating back to ancient Egypt. Known for its beautiful blue petals and traditional uses, it has been cherished for centuries for its calming and soothing properties."
          },
          {
            heading: "What Are The Effects?",
            content: "Our Blue Lotus products are traditionally enjoyed for their calming and soothing properties. They may help promote relaxation, support restful sleep, ease everyday stress and tension, and enhance feelings of well-being."
          },
          {
            heading: "What Will I Receive?",
            content: "When you order from us, you'll receive your discrete package through the mail, containing the quantity requested packed inside a grip-lock bag to maintain freshness. We offer fast shipping all over the world."
          }
        ]
      },
        content: [
          {
            icon: "weight",
            label: "Available Weights",
            value: "10g, 25g, 50g, 100g"
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
          "Use your preferred rolling papers or smoking device",
          "Take a small amount (0.25-0.5g) of the blend",
          "Roll evenly, ensuring not to pack too tightly",
          "Light evenly and take gentle draws",
          "Allow 15-20 minutes between uses to assess effects",
          "Store unused blend in the airtight container provided"
        ],
        schema: {
          "@type": "HowTo",
          "name": "How to Use Blue Lotus Smoking Blend",
          "steps": [
            {
              "@type": "HowToStep",
              "text": "Use your preferred rolling papers or smoking device"
            },
            {
              "@type": "HowToStep",
              "text": "Take a small amount (0.25-0.5g) of the blend"
            },
            {
              "@type": "HowToStep",
              "text": "Roll evenly, ensuring not to pack too tightly"
            },
            {
              "@type": "HowToStep",
              "text": "Light evenly and take gentle draws"
            },
            {
              "@type": "HowToStep",
              "text": "Store unused blend in the airtight container provided"
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
          slug: 'smoking-blue-lotus-flower-everything-you-should-know',
          title: 'Complete Guide to Blue Lotus Smoking Blend',
          description: 'Master the art of using Blue Lotus smoking blend with our comprehensive guide.'
        },
        {
          slug: 'smoking-blue-lotus-flower-effects',
          title: 'Effects of Blue Lotus Smoking Blend',
          description: 'Learn about the traditional effects and properties of Blue Lotus smoking blend.'
        },
        {
          slug: 'is-it-safe-to-smoke-blue-lotus-flower',
          title: 'Safety Guide: Blue Lotus Smoking',
          description: 'Essential safety information for using Blue Lotus smoking blend.'
        }
      ]
    }
  },

  'blue-lotus-flower': {
    title: 'Blue Lotus Flower',
    description: 'Buy Blue Lotus Flower from the top supplier in the UK. At Blue Dream Tea UK, we pride ourselves on supplying top quality dried Blue Lotus Flower.',
    price: 15.99,
    salePrice: 12.99,
    images: {
      main: blueLotusPack1,
      thumbnail: blueLotusPack2,
      additional: [blueLotusPack3],
    },
    variants: [
      { value: '10g', label: '10g Pack', price: 22.99, salePrice: 18.99 },
      { value: '25g', label: '25g Pack', price: 40.99, salePrice: 32.99 },
      { value: '50g', label: '50g Pack', price: 72.99, salePrice: 58.99 },
      { value: '100g', label: '100g Pack', price: 132.99, salePrice: 108.99 },
    ],
    reviews: [
      { user: 'Alice', rating: 5, comment: 'Amazing product!' },
      { user: 'Bob', rating: 4, comment: 'Very relaxing.' },
    ],
    details: {
      description: {
        content: [
          "Step into the world of ancient wisdom with our premium Blue Lotus Flower, thoughtfully cultivated in the pristine fields of Sri Lanka. As the UK's leading supplier, we take pride in bringing you this remarkable botanical treasure in its purest form.",
          
          "Each petal tells a story of careful cultivation and meticulous harvesting, preserving the flower's natural essence and delicate properties. Perfect for creating serene moments through various traditional practices, our Blue Lotus Flower offers versatility in every pack. Whether you're drawn to the art of tea crafting (discover our complete <a href='/articles/how-to-make-blue-lotus-tea' class='text-blue-600 hover:text-blue-800'>tea preparation guide</a>) or exploring other traditional uses, you'll find our premium grade flowers exceed expectations.",
          
          "Curious about the rich history and traditional significance of this mystical flower? Dive deeper into our <a href='/articles/what-is-blue-lotus-flower' class='text-blue-600 hover:text-blue-800'>comprehensive Blue Lotus guide</a>. From its ancient origins to modern appreciation, understand why this flower has captivated cultures for millennia.",
          
          "Our Blue Lotus Flower is perfect for various traditional uses, including aromatherapy, herbal tea preparation, and botanical collections. Many of our customers appreciate its natural cleansing properties, which you can explore in our article about its <a href='/articles/blue-lotus-detoxifying-effects' class='text-blue-600 hover:text-blue-800'>traditional cleansing benefits</a>.",
          
          "🌿 Important Notes & Legal Information:",
          "• Intended for aromatherapy, tea preparation, and decorative purposes only",
          "• This product is restricted in: Russia, Poland, Latvia, Lithuania, or Louisiana (USA)",
          "• Orders from restricted regions will be cancelled and refunded",
          "• Our products are not intended to diagnose, treat, cure, or prevent any disease",
          "• These statements have not been evaluated by the Food and Drug Administration",
          
          "At Blue Dream Tea UK, we're committed to providing you with the highest quality Blue Lotus Flower while maintaining full transparency about its uses and legal status. Your trust and satisfaction are our top priorities."
        ],
        schema: {
          "@type": "Product",
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "origin",
              "value": "Sri Lanka"
            },
            {
              "@type": "PropertyValue",
              "name": "quality",
              "value": "Premium Grade"
            },
            {
              "@type": "PropertyValue",
              "name": "intended_use",
              "value": "Aromatherapy, Tea Preparation, Decoration"
            }
          ]
        }
      },
      productInformation: {
        content: [
          {
            heading: "What's so special about our Blue Lotus Flower?",
            content: "Step into the world of ancient wisdom with our premium Blue Lotus Flower, thoughtfully cultivated in the pristine fields of Sri Lanka. As the UK's leading supplier, we take pride in bringing you this remarkable botanical treasure in its purest form."
          },
          {
            heading: "What Is Blue Lotus Flower?",
            content: "Blue Lotus Flower (Nymphaea Caerulea) is a revered herb with a rich history dating back to ancient Egypt. Known for its beautiful blue petals and traditional uses, it has been cherished for centuries for its calming and soothing properties."
          },
          {
            heading: "What Are The Effects?",
            content: "Our Blue Lotus products are traditionally enjoyed for their calming and soothing properties. They may help promote relaxation, support restful sleep, ease everyday stress and tension, and enhance feelings of well-being."
          },
          {
            heading: "What Will I Receive?",
            content: "When you order from us, you'll receive your discrete package through the mail, containing the quantity requested packed inside a grip-lock bag to maintain freshness. We offer fast shipping all over the world."
          }
        ]
      },
      specifications: {
        content: [
          {
            icon: "weight",
            label: "Available Weights",
            value: "10g, 25g, 50g, 100g"
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
          },
          {
            icon: "origin",
            label: "Origin",
            value: "Premium grade blue lotus flowers from Sri Lanka"
          }
        ]
      },
      instructions: {
        content: [
          "For Tea Preparation:",
          "Use 1-2 grams of blue lotus flower per cup",
          "Heat water to just below boiling (95°C/203°F)",
          "Steep for 5-10 minutes",
          "Strain and enjoy",
          "For Smoking Blend:",
          "Use 0.25-0.5g per roll",
          "Mix gently with other herbs if desired",
          "Store unused portion in the airtight container provided"
        ],
        schema: {
          "@type": "HowTo",
          "name": "How to Use Blue Lotus Flower Packs",
          "steps": [
            {
              "@type": "HowToStep",
              "text": "For tea, use 1-2 grams of blue lotus flower per cup"
            },
            {
              "@type": "HowToStep",
              "text": "Heat water to just below boiling (95°C/203°F)"
            },
            {
              "@type": "HowToStep",
              "text": "Steep for 5-10 minutes"
            },
            {
              "@type": "HowToStep",
              "text": "For smoking, use 0.25-0.5g per roll"
            },
            {
              "@type": "HowToStep",
              "text": "Store unused portion in the airtight container"
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
        freeShippingThreshold: 30,
        schema: [
          {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": 3.99,
              "currency": "GBP"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "businessDays": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
              }
            }
          }
        ]
      },
      relatedArticles: [
        {
          slug: 'what-is-blue-lotus-flower',
          title: 'Understanding Blue Lotus Flower',
          description: 'A comprehensive guide to Blue Lotus Flower and its traditional uses.'
        },
        {
          slug: 'how-to-make-blue-lotus-tea',
          title: 'How to Make Blue Lotus Tea',
          description: 'Learn to brew the perfect cup of Blue Lotus tea with our step-by-step guide.'
        },
        {
          slug: 'blue-lotus-detoxifying-effects',
          title: 'Blue Lotus Benefits Guide',
          description: 'Discover the traditional benefits and properties of Blue Lotus Flower.'
        }
      ]
    }
  },
  'blue-lotus-flower-tea-bags': {
    title: 'Blue Lotus Flower Tea Bags (Ready To Use)',
    description: 'Introducing our Blue Lotus Flower Tea Bags – the perfect blend of elegance and wellness in every sip. Get free shipping this month only...',
    price: 10.99,
    salePrice: 8.99,
    images: {
      main: blueLotusTeaBags1,
      thumbnail: blueLotusTeaBags2,
      additional: [blueLotusTeaBags1],
    },
    variants: [
      {
        name: 'type',
        label: 'Tea Type',
        options: [
          { value: 'blue-lotus', label: 'Blue Lotus', price: 0, salePrice: 0 },
          { value: 'chamomile-blue-lotus', label: '& Chamomile', price: 0, salePrice: 2.00 },
        ]
      },
      {
        name: 'size',
        label: 'Pack Size',
        options: [
          { value: '6', label: '6 Pack', price: 10.99, salePrice: 8.99 },
          { value: '12', label: '12 Pack', price: 19.99, salePrice: 16.99 },
          { value: '24', label: '24 Pack', price: 29.99, salePrice: 24.99 },
          { value: '48', label: '48 Pack', price: 39.99, salePrice: 31.99 },
        ]
      }
    ],
    reviews: [
      { user: 'Charlie', rating: 5, comment: 'Best tea ever!' },
      { user: 'Diana', rating: 4, comment: 'Great flavor.' },
    ],
    details: {
      description: {
        content: [
          "Transform your daily tea ritual with our exquisite Blue Lotus Flower Tea Bags. Each sachet is a gateway to tranquility, carefully crafted to bring you the pure essence of this ancient botanical treasure. Available in both pure Blue Lotus and our harmonious Blue Lotus & Chamomile blend, these tea bags offer convenience without compromising on the authentic experience.",
          
          "What sets our tea bags apart? It's the meticulous attention to quality. Each bag contains premium Blue Lotus Flower, harvested at its peak from our sustainable gardens in Sri Lanka. We've perfected the art of preservation, ensuring every cup delivers the flower's full character and natural properties. <a href='/articles/what-is-blue-lotus-flower' class='text-blue-600 hover:text-blue-800'>Explore the rich heritage of Blue Lotus</a>.",
          
          "Our signature blends are cherished for their:",
          "• Pure, unadulterated Blue Lotus Flower",
          "• Delicate, aromatic bouquet",
          "• Soothing botanical properties",
          "• Perfect portion control",
          "• Convenient, ready-to-brew format",
          
          "The magic lies in the details - we've carefully calibrated each tea bag to deliver the perfect strength. The gentle floral notes create a serene experience, while our optional chamomile blend adds a subtle layer of complementary calm. Want to learn more about preparation? Check out our <a href='/articles/how-to-make-blue-lotus-tea' class='text-blue-600 hover:text-blue-800'>complete brewing guide</a>.",
          
          "Discover why tea enthusiasts are embracing Blue Lotus as their new daily ritual. Our blend offers a moment of tranquility in your busy day, inviting you to pause, reflect, and rejuvenate. Curious about the traditional benefits? Read about its <a href='/articles/blue-lotus-detoxifying-effects' class='text-blue-600 hover:text-blue-800'>natural properties</a>.",
          
          "🌿 Important Notes & Legal Information:",
          "• Intended for tea preparation only",
          "• This product is restricted in: Russia, Poland, Latvia, Lithuania, or Louisiana (USA)",
          "• Orders from restricted regions will be cancelled and refunded",
          "• Our products are not intended to diagnose, treat, cure, or prevent any disease",
          "• These statements have not been evaluated by the Food and Drug Administration",
          
          "At Blue Dream Tea UK, we're passionate about bringing you the finest Blue Lotus tea experience while maintaining complete transparency about its uses and legal status. Your satisfaction and well-being are our highest priorities."
        ],
        schema: {
          "@type": "Product",
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "composition",
              "value": "100% Pure Blue Lotus Flower or Blue Lotus & Chamomile Blend"
            },
            {
              "@type": "PropertyValue",
              "name": "origin",
              "value": "Sri Lanka"
            },
            {
              "@type": "PropertyValue",
              "name": "format",
              "value": "Individual Tea Bags"
            },
            {
              "@type": "PropertyValue",
              "name": "intended_use",
              "value": "Herbal Tea Preparation"
            }
          ]
        }
      },
      specifications: {
      productInformation: {
        content: [
          {
            heading: "What's so special about our Blue Lotus Tea Bags?",
            content: "Experience the convenience and elegance of our premium Blue Lotus Tea Bags. Each bag is carefully crafted to deliver the authentic Blue Lotus experience in a convenient, ready-to-use format that makes enjoying this ancient herb effortless and enjoyable."
          },
          {
            heading: "What Is Blue Lotus Flower?",
            content: "Blue Lotus Flower (Nymphaea Caerulea) is a revered herb with a rich history dating back to ancient Egypt. Known for its beautiful blue petals and traditional uses, it has been cherished for centuries for its calming and soothing properties."
          },
          {
            heading: "What Are The Effects?",
            content: "Our Blue Lotus products are traditionally enjoyed for their calming and soothing properties. They may help promote relaxation, support restful sleep, ease everyday stress and tension, and enhance feelings of well-being."
          },
          {
            heading: "What Will I Receive?",
            content: "When you order from us, you'll receive your discrete package through the mail, containing the quantity requested packed inside a grip-lock bag to maintain freshness. We offer fast shipping all over the world."
          }
        ]
      },
        content: [
          {
            icon: "weight",
            label: "Net Weight per Tea Bag",
            value: "1.5g"
          },
          {
            icon: "packSize",
            label: "Tea Bags per Pack",
            value: "Available in 6, 12, 24, or 48 bags"
          },
          {
            icon: "storage",
            label: "Storage Instructions",
            value: "Store in a cool, dry place away from direct sunlight"
          },
          {
            icon: "origin",
            label: "Origin",
            value: "Premium grade blue lotus flowers from Sri Lanka"
          }
        ],
        schema: [
          {
            "@type": "PropertyValue",
            "name": "Tea Bag Weight",
            "value": "1.5g"
          },
          {
            "@type": "PropertyValue",
            "name": "Product Origin",
            "value": "Sri Lanka"
          }
        ]
      },
      instructions: {
        content: [
          "Bring fresh water to just below boiling (95°C/203°F)",
          "Place one tea bag in your cup or mug",
          "Pour hot water over the tea bag",
          "Steep for 5-7 minutes for optimal flavor",
          "Remove tea bag and enjoy",
          "Can be enjoyed hot or cold - for iced tea, steep longer and pour over ice",
          "Store unused tea bags in their original packaging"
        ],
        schema: {
          "@type": "HowTo",
          "name": "How to Prepare Blue Lotus Tea",
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
              "text": "Steep for 5-7 minutes for optimal flavor"
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
        freeShippingThreshold: 30,
        schema: [
          {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": 3.99,
              "currency": "GBP"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "businessDays": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
              }
            }
          }
        ]
      },
      relatedArticles: [
        {
          slug: 'how-to-make-blue-lotus-tea',
          title: 'Perfect Blue Lotus Tea Guide',
          description: 'Master the art of brewing Blue Lotus tea with our comprehensive guide.'
        },
        {
          slug: 'blue-lotus-lucid-dreaming-deep-sleep',
          title: 'Blue Lotus for Better Sleep',
          description: 'Learn how Blue Lotus tea can support relaxation and better sleep.'
        },
        {
          slug: 'blue-lotus-detoxifying-effects',
          title: 'Benefits of Blue Lotus Tea',
          description: 'Explore the traditional benefits of Blue Lotus tea.'
        }
      ]
    }
  },
  'blue-lotus-flower-tea-cut': {
    title: 'Blue Lotus Flower Tea Cut',
    description: 'Brew your own blue lotus flower tea. 100% pure and natural.',
    price: 15.99,
    salePrice: 12.99,
    images: {
      main: blueLotusTeaCut1,
      thumbnail: blueLotusTeaCut2,
      additional: [blueLotusTeaCut3],
    },
    variants: [
      { value: '10g', label: '10g Pack', price: 15.99, salePrice: 12.99 },
      { value: '25g', label: '25g Pack', price: 28.99, salePrice: 22.99 },
      { value: '50g', label: '50g Pack', price: 39.99, salePrice: 31.99 },
      { value: '100g', label: '100g Pack', price: 49.99, salePrice: 39.99 },
    ],
    reviews: [
      { user: 'Emily', rating: 5, comment: 'Perfect for brewing tea!' },
      { user: 'Frank', rating: 4, comment: 'Great quality cut.' },
    ],
    details: {
      description: {
        content: [
          "Experience the purest form of Blue Lotus tea with our premium Tea Cut blend. Each package contains perfectly sized Blue Lotus Flower pieces, meticulously processed to release their full potential in every brew. For tea enthusiasts who appreciate the art of loose-leaf preparation, this is your gateway to crafting the perfect cup.",
          
          "What makes our Tea Cut special? It's the perfect balance of tradition and convenience. We've carefully calibrated the cut size to ensure optimal extraction, while preserving the flower's complete profile. Unlike pre-packaged tea bags, our loose-leaf cut gives you complete control over your brew's strength and character. <a href='/articles/what-is-blue-lotus-flower' class='text-blue-600 hover:text-blue-800'>Discover Blue Lotus's rich heritage</a>.",
          
          "Sourced from our sustainable gardens in Sri Lanka, each flower is organically cultivated and harvested at its peak. Our artisanal processing preserves the delicate properties while creating the ideal cut size for brewing. Want to perfect your technique? Explore our <a href='/articles/how-to-make-blue-lotus-tea' class='text-blue-600 hover:text-blue-800'>complete brewing guide</a>.",
          
          "Tea connoisseurs choose our Tea Cut for:",
          "• Optimal cut size for perfect extraction",
          "• Pure, unadulterated Blue Lotus Flower",
          "• Superior aroma release",
          "• Complete brewing control",
          "• Ability to blend with other herbs",
          
          "Each batch is expertly processed to achieve the perfect balance between surface area and flavor retention. The natural floral notes unfold beautifully during steeping, while our precise cutting technique ensures consistent quality in every brew. Interested in its traditional benefits? Learn about <a href='/articles/blue-lotus-detoxifying-effects' class='text-blue-600 hover:text-blue-800'>Blue Lotus's calming properties</a>.",
          
          "🌿 Important Notes & Legal Information:",
          "• Intended for tea preparation only",
          "• This product is restricted in: Russia, Poland, Latvia, Lithuania, or Louisiana (USA)",
          "• Orders from restricted regions will be cancelled and refunded",
          "• Our products are not intended to diagnose, treat, cure, or prevent any disease",
          "• These statements have not been evaluated by the Food and Drug Administration",
          
          "At Blue Dream Tea UK, we're committed to providing the finest loose-leaf Blue Lotus experience while maintaining complete transparency about its uses and legal status. Your journey into traditional tea crafting begins here."
        ],
        schema: {
          "@type": "Product",
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "composition",
              "value": "100% Pure Blue Lotus Flower - Loose Leaf Cut"
            },
            {
              "@type": "PropertyValue",
              "name": "origin",
              "value": "Sri Lanka"
            },
            {
              "@type": "PropertyValue",
              "name": "processing",
              "value": "Artisanal tea cut"
            },
            {
              "@type": "PropertyValue",
              "name": "intended_use",
              "value": "Loose Leaf Tea Preparation"
            }
          ]
        }
      },
      productInformation: {
        content: [
          {
            heading: "What's so special about our Blue Lotus Tea Cut?",
            content: "Discover the perfect balance of tradition and convenience with our premium Blue Lotus Tea Cut. Expertly processed to the ideal size for tea preparation, this cut preserves all the natural properties while making it easy to brew the perfect cup."
          },
          {
            heading: "What Is Blue Lotus Flower?",
            content: "Blue Lotus Flower (Nymphaea Caerulea) is a revered herb with a rich history dating back to ancient Egypt. Known for its beautiful blue petals and traditional uses, it has been cherished for centuries for its calming and soothing properties."
          },
          {
            heading: "What Are The Effects?",
            content: "Our Blue Lotus products are traditionally enjoyed for their calming and soothing properties. They may help promote relaxation, support restful sleep, ease everyday stress and tension, and enhance feelings of well-being."
          },
          {
            heading: "What Will I Receive?",
            content: "When you order from us, you'll receive your discrete package through the mail, containing the quantity requested packed inside a grip-lock bag to maintain freshness. We offer fast shipping all over the world."
          }
        ]
      },
      specifications: {
        content: [
          {
            icon: "weight",
            label: "Available Weights",
            value: "10g, 25g, 50g, 100g"
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
          "Use 1-2 teaspoons of tea cut per cup",
          "Heat water to just below boiling (95°C/203°F)",
          "Place tea cut in a tea infuser or filter",
          "Pour hot water over the tea cut",
          "Steep for 5-7 minutes",
          "Remove infuser and enjoy",
          "Can be re-steeped 1-2 times",
          "Store unused tea cut in the airtight container provided"
        ],
        schema: {
          "@type": "HowTo",
          "name": "How to Prepare Blue Lotus Tea Cut",
          "steps": [
            {
              "@type": "HowToStep",
              "text": "Use 1-2 teaspoons of tea cut per cup"
            },
            {
              "@type": "HowToStep",
              "text": "Heat water to just below boiling (95°C/203°F)"
            },
            {
              "@type": "HowToStep",
              "text": "Place tea cut in a tea infuser or filter"
            },
            {
              "@type": "HowToStep",
              "text": "Pour hot water over the tea cut"
            },
            {
              "@type": "HowToStep",
              "text": "Steep for 5-7 minutes"
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
          slug: 'how-to-make-blue-lotus-tea',
          title: 'Mastering Blue Lotus Tea',
          description: 'Expert guide to brewing loose-leaf Blue Lotus tea.'
        },
        {
          slug: 'what-is-blue-lotus-flower',
          title: 'Blue Lotus: A Complete Guide',
          description: 'Everything you need to know about Blue Lotus Flower.'
        },
        {
          slug: 'blue-lotus-detoxifying-effects',
          title: 'Blue Lotus Tea Benefits',
          description: 'Discover the traditional benefits of Blue Lotus tea.'
        }
      ]
    }
  },
};