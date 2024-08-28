// src/components/ArticleCardWrapper.tsx
import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleCardWrapper: React.FC = () => {
  // Sample data - replace with actual data or logic
  const sampleArticle = {
    image: 'https://via.placeholder.com/150',
    title: 'Sample Article',
    author: 'Author Name',
    description: 'This is a sample article description.',
    favorited: false,
    favoritesCount: 42,
  };

  return <ArticleCard {...sampleArticle} />;
};

export default ArticleCardWrapper;
