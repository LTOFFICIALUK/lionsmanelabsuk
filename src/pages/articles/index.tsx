import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { HiSearch } from 'react-icons/hi';
import { ArticleCategory, ARTICLE_CATEGORIES } from '../../constants/article-categories';
import { ALL_ARTICLES } from '../../constants/articles';

const GuidesIndex: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Group guides by category
  const guidesByCategory = Object.entries(ALL_ARTICLES).reduce((acc, [slug, article]) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push({
      slug,
      title: article.title,
      description: article.description,
      category: article.category
    });
    return acc;
  }, {} as Record<ArticleCategory, Array<{ slug: string; title: string; description: string; category: ArticleCategory }>>);

  // Search functionality
  const searchResults = Object.entries(ALL_ARTICLES)
    .filter(([_, article]) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(searchLower) ||
        article.description.toLowerCase().includes(searchLower) ||
        article.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
      );
    })
    .map(([slug, article]) => ({
      path: `/articles/${slug}`,
      title: article.title,
      description: article.description,
      category: article.category
    }));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
  };

  const handleSearchBlur = () => {
    // Only hide results if there's no query
    if (!searchQuery.trim()) {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>Blue Lotus Flower Articles & Guides | Blue Dream Tea UK</title>
        <meta name="description" content="Explore our comprehensive collection of articles about blue lotus flower, including guides on usage, benefits, history, and more." />
      </Helmet>

      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Blue Lotus Flower Articles
      </h1>
      
      {/* Search Section */}
      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsSearching(true)}
            onBlur={handleSearchBlur}
            placeholder="Search articles..."
            className="w-full px-6 py-4 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            aria-label="Search articles"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
            aria-label="Submit search"
          >
            <HiSearch className="w-6 h-6" />
          </button>

          {/* Search Results Dropdown */}
          {isSearching && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
              {searchResults.length === 0 ? (
                <div className="p-4 text-gray-500 text-center">
                  No results found for "{searchQuery}"
                </div>
              ) : (
                <div className="p-2">
                  {searchResults.map((guide) => (
                    <Link
                      key={guide.path}
                      to={guide.path}
                      className="block px-3 py-2 hover:bg-gray-100 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium text-left">{guide.title}</div>
                          <div className="text-sm text-gray-500 mt-1">{guide.description}</div>
                          <div className="text-xs text-blue-600 mt-1">
                            {ARTICLE_CATEGORIES[guide.category]}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </form>
      </div>
      
      <div className="space-y-12">
        {(Object.keys(ARTICLE_CATEGORIES) as ArticleCategory[])
          .filter(category => guidesByCategory[category]?.length > 0) // Only show categories that have guides
          .map((category) => {
            const guides = guidesByCategory[category] || [];

            return (
              <section key={category}>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {ARTICLE_CATEGORIES[category]}
                </h2>
                <div className="space-y-4">
                  {guides.map(({ slug, title, description }) => {
                    return (
                      <Link
                        key={slug}
                        to={`/articles/${slug}`}
                        className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {title}
                            </h3>
                            <p className="text-gray-600">
                              {description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
      </div>
    </div>
  );
};

export default GuidesIndex; 