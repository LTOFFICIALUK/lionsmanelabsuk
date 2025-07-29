import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ALL_ARTICLES } from '../../constants/articles';
import { GuideCategory } from '../../types';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Convert slug to proper category format
  const categoryKey = slug?.toUpperCase() as GuideCategory;
  
  // Get articles for this category
  const categoryArticles = Object.entries(ALL_ARTICLES).filter(
    ([_, article]) => article.category === categoryKey
  );

  // If no articles found for this category, redirect to categories page
  if (!categoryArticles.length) {
    return <Navigate to="/categories" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{categoryKey} Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryArticles.map(([slug, article]) => (
          <div key={slug} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">{article.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {article.description}
            </p>
            <Link
              to={`/articles/${slug}`}
              className="text-blue-600 hover:text-blue-800"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage; 