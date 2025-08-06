import React from 'react';
import { Link } from 'react-router-dom';
import { RelatedArticle } from '../../types';
import { HiBookOpen, HiChevronRight } from 'react-icons/hi';

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  title?: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ 
  articles,
  title = "Related Articles"
}) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h2 className="text-base sm:text-lg lg:text-xl font-medium sm:font-semibold text-gray-900 flex items-center">
          <HiBookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600 flex-shrink-0" />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </span>
        </h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {articles.slice(0, 3).map((article, index) => (
          <Link
            key={article.slug}
            to={`/articles/${article.slug}`}
            className="block hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-start justify-between space-x-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 mb-1 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                    {article.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <HiChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles; 