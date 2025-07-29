import React from 'react';
import { HiStar } from 'react-icons/hi';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  productPurchased?: string;
  productSlug?: string;
}

interface CustomerReviewsProps {
  productSlug?: string;
  showTitle?: boolean;
}

const customerReviews: Review[] = [
  // Blue Lotus Pre-Rolls Reviews
  {
    id: 1,
    name: "James Thompson",
    rating: 5,
    comment: "The pre-rolls are exceptional quality. Great value for money and arrived quickly. Will definitely be ordering again!",
    date: "1 month ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Pre Rolls",
    productSlug: "blue-lotus-flower-pre-rolls"
  },
  {
    id: 2,
    name: "Marcus Williams",
    rating: 5,
    comment: "Best blue lotus products I've tried. Customer service was excellent too - answered all my questions promptly.",
    date: "2 months ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Pre Rolls",
    productSlug: "blue-lotus-flower-pre-rolls"
  },
  {
    id: 3,
    name: "Sophie Anderson",
    rating: 4,
    comment: "Really impressed with the quality of these pre-rolls. Perfect size and burn evenly. Just wish they came in larger pack sizes.",
    date: "2 weeks ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Pre Rolls",
    productSlug: "blue-lotus-flower-pre-rolls"
  },

  // Blue Lotus Tea Bags Reviews
  {
    id: 4,
    name: "Sarah Mitchell",
    rating: 5,
    comment: "Absolutely love the Blue Lotus tea bags! They have such a calming effect and the quality is outstanding. Perfect for my evening routine.",
    date: "2 weeks ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Tea Bags",
    productSlug: "blue-lotus-flower-tea-bags"
  },
  {
    id: 5,
    name: "Emily Chen",
    rating: 4,
    comment: "Really impressed with the freshness and potency. The tea has a lovely floral taste and helps me unwind after long days.",
    date: "3 weeks ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Tea Bags",
    productSlug: "blue-lotus-flower-tea-bags"
  },
  {
    id: 6,
    name: "Michael Roberts",
    rating: 5,
    comment: "The chamomile blend is fantastic! Perfect balance of flavors and very soothing. Great for relaxation before bed.",
    date: "1 month ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Tea Bags",
    productSlug: "blue-lotus-flower-tea-bags"
  },

  // Blue Lotus Tea Cut Reviews
  {
    id: 7,
    name: "Lisa Roberts",
    rating: 5,
    comment: "The tea cut is perfect value. Love that it's sourced from Sri Lanka and the packaging is eco-friendly. Highly recommend!",
    date: "1 week ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Tea Cut",
    productSlug: "blue-lotus-flower-tea-cut"
  },
  {
    id: 8,
    name: "Thomas Chen",
    rating: 5,
    comment: "Superior quality tea cut. The loose leaf format allows for perfect customization of strength. Will be ordering again!",
    date: "3 weeks ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Tea Cut",
    productSlug: "blue-lotus-flower-tea-cut"
  },
  {
    id: 9,
    name: "Rachel Thompson",
    rating: 4,
    comment: "Great quality and freshness. I appreciate being able to control the amount used. The resealable packaging keeps it fresh.",
    date: "1 month ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Tea Cut",
    productSlug: "blue-lotus-flower-tea-cut"
  },

  // Blue Lotus Smoking Blend Reviews
  {
    id: 10,
    name: "David Brown",
    rating: 4,
    comment: "Great smoking blend and fast delivery. The effects are just what I was looking for - very relaxing without being overwhelming.",
    date: "3 weeks ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Smoking Blend",
    productSlug: "blue-lotus-flower-smoking-blend"
  },
  {
    id: 11,
    name: "Alex Parker",
    rating: 5,
    comment: "Perfect consistency for rolling. Really appreciate the quality and purity of this blend. Smooth and enjoyable experience.",
    date: "2 weeks ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Smoking Blend",
    productSlug: "blue-lotus-flower-smoking-blend"
  },
  {
    id: 12,
    name: "Emma Wilson",
    rating: 5,
    comment: "The smoking blend is excellent quality. Burns evenly and has a nice, subtle aroma. Very satisfied with my purchase.",
    date: "1 month ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Smoking Blend",
    productSlug: "blue-lotus-flower-smoking-blend"
  },

  // Blue Lotus Flower Packs Reviews
  {
    id: 13,
    name: "Oliver White",
    rating: 5,
    comment: "Excellent quality flower packs. Very versatile - great for both tea and other uses. The 50g pack is perfect for my needs.",
    date: "2 weeks ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Packs",
    productSlug: "blue-lotus-flower-packs"
  },
  {
    id: 14,
    name: "Hannah Lee",
    rating: 4,
    comment: "Really pleased with the quality. The flowers are whole and well-preserved. Great for making my own blends.",
    date: "1 month ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Packs",
    productSlug: "blue-lotus-flower-packs"
  },
  {
    id: 15,
    name: "Daniel Martinez",
    rating: 5,
    comment: "The purity and freshness of these flower packs is outstanding. Excellent packaging keeps everything fresh. Will buy again!",
    date: "3 weeks ago",
    verified: true,
    productPurchased: "Blue Lotus Flower Packs",
    productSlug: "blue-lotus-flower-packs"
  }
];

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ productSlug, showTitle = true }) => {
  const filteredReviews = productSlug 
    ? customerReviews.filter(review => review.productSlug === productSlug)
    : customerReviews;

  const averageRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0) / filteredReviews.length;
  const totalReviews = filteredReviews.length;

  const shouldShowGlobalMetrics = !productSlug || filteredReviews.length === 0;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <HiStar
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            {productSlug ? 'Customer Reviews' : 'What Our Customers Say'}
          </h2>
          
          <div className="mt-4 flex items-center justify-center space-x-3">
            <div className="flex space-x-1">{renderStars(Math.round(averageRating))}</div>
            <span className="text-xl font-semibold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-gray-500">
              ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
            </span>
          </div>

          {!productSlug && (
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Blue Dream Tea UK for premium blue lotus products.
            </p>
          )}
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">{renderStars(review.rating)}</div>
                  {review.verified && (
                    <span className="ml-3 text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-medium">
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  "{review.comment}"
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500 mt-1">{review.date}</p>
                    </div>
                    {review.productPurchased && !productSlug && (
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Purchased:</p>
                        <p className="text-sm font-medium text-gray-700 mt-0.5">
                          {review.productPurchased}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Metrics Section */}
        <div className={`${filteredReviews.length > 0 ? 'border-t border-gray-200 pt-16' : 'mt-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">2000+</div>
              <p className="mt-2 text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">4.8/5</div>
              <p className="mt-2 text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">98%</div>
              <p className="mt-2 text-gray-600">Recommend Us</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews; 