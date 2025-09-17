import React, { useState } from 'react';
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
  // Lion's Mane Capsules Reviews
  {
    id: 1,
    name: "James Thompson",
    rating: 5,
    comment: "The Lion's Mane capsules are exceptional quality. Great value for money and arrived quickly. I've noticed improved focus and mental clarity. Will definitely be ordering again!",
    date: "1 month ago",
    verified: true,
    productPurchased: "Lion's Mane Capsules",
    productSlug: "lions-mane-capsules"
  },
  {
    id: 2,
    name: "Marcus Williams",
    rating: 5,
    comment: "Best Lion's Mane products I've tried. Customer service was excellent too - answered all my questions promptly. The cognitive benefits are noticeable.",
    date: "2 months ago",
    verified: true,
    productPurchased: "Lion's Mane Capsules",
    productSlug: "lions-mane-capsules"
  },
  {
    id: 3,
    name: "Sophie Anderson",
    rating: 4,
    comment: "Really impressed with the quality of these capsules. Easy to take and I've noticed better concentration. Just wish they came in larger pack sizes.",
    date: "2 weeks ago",
    verified: true,
    productPurchased: "Lion's Mane Capsules",
    productSlug: "lions-mane-capsules"
  },

  // Lion's Mane Tea Reviews
  {
    id: 4,
    name: "Sarah Mitchell",
    rating: 5,
    comment: "Absolutely love the Lion's Mane tea! It has such a calming effect and the quality is outstanding. Perfect for my morning routine and mental clarity.",
    date: "2 weeks ago",
    verified: true,
    productPurchased: "Lion's Mane Tea",
    productSlug: "lions-mane-tea"
  },
  {
    id: 5,
    name: "Emily Chen",
    rating: 4,
    comment: "Really impressed with the freshness and potency. The tea has a lovely earthy taste and helps me focus throughout the day.",
    date: "3 weeks ago",
    verified: true,
    productPurchased: "Lion's Mane Tea",
    productSlug: "lions-mane-tea"
  },
  {
    id: 6,
    name: "Michael Roberts",
    rating: 5,
    comment: "The Lion's Mane tea blend is fantastic! Perfect balance of flavors and very soothing. Great for cognitive enhancement and relaxation.",
    date: "1 month ago",
    verified: true,
    productPurchased: "Lion's Mane Tea",
    productSlug: "lions-mane-tea"
  },

  // Lion's Mane Powder Reviews
  {
    id: 7,
    name: "Lisa Roberts",
    rating: 5,
    comment: "The Lion's Mane powder is perfect value. Love that it's high-quality and the packaging is eco-friendly. Great for smoothies and cooking. Highly recommend!",
    date: "1 week ago",
    verified: true,
    productPurchased: "Lion's Mane Powder",
    productSlug: "lions-mane-powder"
  },
  {
    id: 8,
    name: "Thomas Chen",
    rating: 5,
    comment: "Superior quality Lion's Mane powder. The fine powder format allows for perfect customization in drinks and recipes. Will be ordering again!",
    date: "3 weeks ago",
    verified: true,
    productPurchased: "Lion's Mane Powder",
    productSlug: "lions-mane-powder"
  },
  {
    id: 9,
    name: "Rachel Thompson",
    rating: 4,
    comment: "Great quality and freshness. I appreciate being able to control the amount used. The resealable packaging keeps it fresh and potent.",
    date: "1 month ago",
    verified: true,
    productPurchased: "Lion's Mane Powder",
    productSlug: "lions-mane-powder"
  },

  // Lion's Mane Extract Reviews
  {
    id: 10,
    name: "David Brown",
    rating: 4,
    comment: "Great Lion's Mane extract and fast delivery. The effects are just what I was looking for - improved focus without being overwhelming.",
    date: "3 weeks ago",
    verified: true,
    productPurchased: "Lion's Mane Extract",
    productSlug: "lions-mane-extract"
  },
  {
    id: 11,
    name: "Alex Parker",
    rating: 5,
    comment: "Perfect potency for cognitive enhancement. Really appreciate the quality and purity of this extract. Smooth and effective experience.",
    date: "2 weeks ago",
    verified: true,
    productPurchased: "Lion's Mane Extract",
    productSlug: "lions-mane-extract"
  },
  {
    id: 12,
    name: "Emma Wilson",
    rating: 5,
    comment: "The Lion's Mane extract is excellent quality. Easy to take and has a nice, subtle taste. Very satisfied with my purchase and the cognitive benefits.",
    date: "1 month ago",
    verified: true,
    productPurchased: "Lion's Mane Extract",
    productSlug: "lions-mane-extract"
  },

  // Lion's Mane Tincture Reviews
  {
    id: 13,
    name: "Oliver White",
    rating: 5,
    comment: "Excellent quality Lion's Mane tincture. Very versatile - great for quick absorption and easy dosing. The 30ml bottle is perfect for my needs.",
    date: "2 weeks ago",
    verified: true,
    productPurchased: "Lion's Mane Tincture",
    productSlug: "lions-mane-tincture"
  },
  {
    id: 14,
    name: "Hannah Lee",
    rating: 4,
    comment: "Really pleased with the quality. The tincture is potent and well-formulated. Great for making my own blends and quick cognitive support.",
    date: "1 month ago",
    verified: true,
    productPurchased: "Lion's Mane Tincture",
    productSlug: "lions-mane-tincture"
  },
  {
    id: 15,
    name: "Daniel Martinez",
    rating: 5,
    comment: "The purity and potency of this Lion's Mane tincture is outstanding. Excellent packaging keeps everything fresh. Will buy again!",
    date: "3 weeks ago",
    verified: true,
    productPurchased: "Lion's Mane Tincture",
    productSlug: "lions-mane-tincture"
  }
];

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ productSlug, showTitle = true }) => {
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(4); // Show 2 rows initially (4 reviews)
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const filteredReviews = productSlug 
    ? customerReviews.filter(review => review.productSlug === productSlug)
    : customerReviews;

  const averageRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0) / filteredReviews.length;
  const totalReviews = filteredReviews.length;
  const visibleReviews = filteredReviews.slice(0, visibleReviewsCount);
  const hasMoreReviews = visibleReviewsCount < filteredReviews.length;

  const shouldShowGlobalMetrics = !productSlug || filteredReviews.length === 0;

  const handleShowMore = () => {
    setVisibleReviewsCount(prev => Math.min(prev + 10, filteredReviews.length));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
    if (formErrors.rating) {
      setFormErrors(prev => ({
        ...prev,
        rating: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (formData.rating === 0) {
      errors.rating = 'Please select a rating';
    }
    
    if (!formData.comment.trim()) {
      errors.comment = 'Review comment is required';
    } else if (formData.comment.trim().length < 10) {
      errors.comment = 'Review must be at least 10 characters long';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the review to your backend
      console.log('Review submitted:', {
        ...formData,
        productSlug,
        date: new Date().toISOString()
      });
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        rating: 0,
        comment: '',
        email: ''
      });
      setShowReviewForm(false);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error submitting review:', error);
      setFormErrors({ submit: 'Failed to submit review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const renderInteractiveStars = (currentRating: number, onRatingChange: (rating: number) => void) => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onRatingChange(i + 1)}
        className="focus:outline-none transition-colors duration-150"
      >
        <HiStar
          className={`h-8 w-8 ${
            i < currentRating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
          }`}
        />
      </button>
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
              Join thousands of satisfied customers who trust Lion's Mane Labs UK for premium Lion's Mane mushroom supplements.
            </p>
          )}
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {visibleReviews.map((review) => (
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

        {/* Action Buttons */}
        <div className="text-center mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
            
            {hasMoreReviews && (
              <button
                onClick={handleShowMore}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Show More Reviews
                <span className="ml-2 text-sm opacity-75">
                  ({filteredReviews.length - visibleReviewsCount} remaining)
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Thank you! Your review has been submitted and will be published after moderation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Review Form */}
        {showReviewForm && (
          <div className="mb-16 bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {productSlug ? `Write a Review for ${productSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}` : 'Write a Review'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>

              {/* Rating Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex space-x-1">
                  {renderInteractiveStars(formData.rating, handleRatingChange)}
                </div>
                {formErrors.rating && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.rating}</p>
                )}
              </div>

              {/* Comment Field */}
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  value={formData.comment}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.comment ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Share your experience with this product..."
                />
                {formErrors.comment && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.comment}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.comment.length}/500 characters
                </p>
              </div>

              {/* Submit Error */}
              {formErrors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{formErrors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
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