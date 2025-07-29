import React from 'react';
import { Link } from 'react-router-dom';
import { GuideCategory } from '../types';
import { ALL_GUIDES } from '../constants/guides';

interface FeaturedGuidesProps {
  category: GuideCategory;
}

const FeaturedGuides: React.FC<FeaturedGuidesProps> = ({ category }) => {
  // Get guides for this category that have actual pages
  const categoryGuides = Object.entries(ALL_GUIDES)
    .filter(([slug, guide]) => {
      // Only show guides that have actual pages
      return guide.category === category && 
      [
        'how-to-start-streaming-on-twitch', 
        'how-to-live-stream', 
        'how-to-live-stream-on-AVIE-Streaming', 
        'best-places-to-live-stream', 
        'how-to-stream-from-mobile', 
        'earn-more-from-live-streaming-with-avie',
        'earn-more-multi-streaming',
        'monetize-your-live-stream-content',
        'monetize-your-clips',
        'strategies-to-make-money-from-live-streaming',
        'what-is-the-best-mic-for-streaming',
        'obs-setup-guide',
        'streaming-equipment-guide',
        'how-much-revenue-can-you-make-from-streaming',
        'using-avie-multistreaming-to-earn-more',
        'content-planning-strategy',
        'content-calendar-creation',
        'growth-hacking-twitch',
        'social-media-for-streamers',
        'twitch-monetization',
        'sponsorship-guide',
        'building-community',
        'discord-server-setup'
      ].includes(slug);
    })
    .slice(0, 3); // Show only first 3 guides

  if (categoryGuides.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Featured Guides</h2>
        <Link
          to="/guides"
          className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
        >
          See all guides
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryGuides.map(([slug, guide]) => (
          <Link
            key={slug}
            to={`/guides/${slug}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                {guide.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {guide.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                {guide.readTime && (
                  <span className="text-gray-500">
                    {guide.readTime}
                  </span>
                )}
                {guide.difficulty && (
                  <span className={`px-3 py-1 rounded-full ${
                    guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    guide.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {guide.difficulty}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGuides; 