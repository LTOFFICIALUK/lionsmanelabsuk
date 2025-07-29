import React from 'react';
import { Link } from 'react-router-dom';
import { GuideCategory } from '../../types';
import { ALL_ARTICLES } from '../../constants/articles';

const CategoriesPage: React.FC = () => {
  // Get unique categories from articles
  const categories = [...new Set(Object.values(ALL_ARTICLES).map(article => article.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Article Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const categoryArticles = Object.values(ALL_ARTICLES).filter(
            article => article.category === category
          );

          return (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">{category}</h2>
              <p className="text-gray-600 mb-4">
                {categoryArticles.length} articles
              </p>
              <Link
                to={`/categories/${category.toLowerCase()}`}
                className="text-blue-600 hover:text-blue-800"
              >
                View Articles →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesPage;
