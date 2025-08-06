import React, { Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import GuideLayout from './GuideLayout';
import { ALL_ARTICLES } from '../../constants/articles';
import { GuideCategory } from '../../types';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // If no slug is provided or article doesn't exist, redirect to articles page
  if (!slug || !ALL_ARTICLES[slug]) {
    return <Navigate to="/articles" replace />;
  }

  const article = ALL_ARTICLES[slug];
  const ArticleContent = React.lazy(() => import(`./${slug}/page.tsx`));

  return (
    <GuideLayout
      title={article.title}
      description={article.description}
      category={article.category as GuideCategory}
      publishDate={article.publishDate}
      lastModified={article.lastModified}
      author={article.author}
      featuredImage={article.featuredImage}
      keywords={article.keywords}
      wordCount={article.wordCount}
    >
      <Suspense fallback={<div>Loading article...</div>}>
        <ArticleContent />
      </Suspense>
    </GuideLayout>
  );
};

export default ArticlePage; 