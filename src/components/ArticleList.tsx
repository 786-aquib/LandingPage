import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';
import ArticleCard from './ArticleCard';
import { RootState, AppDispatch } from '../redux/store';
import { fetchArticles } from '../redux/articleSlice';

const ArticleList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, status, error, hasMore, offset } = useSelector((state: RootState) => state.articles);
  const currentStatus = status as 'idle' | 'loading' | 'failed';

  const fetchMoreArticles = useCallback(() => {
    if (currentStatus === 'idle' && hasMore) {
      dispatch(fetchArticles(offset));
    }
  }, [dispatch, currentStatus, hasMore, offset]);

  useEffect(() => {
    fetchMoreArticles();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
        fetchMoreArticles();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchMoreArticles]);

  if (currentStatus === 'loading' && articles.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (currentStatus === 'failed') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
        padding: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      {articles.length > 0 ? (
        articles.map((article) => (
          <ArticleCard
            key={article.slug}
            image={article.author.image}
            title={article.title}
            author={article.author.username}
            description={article.description}
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
          />
        ))
      ) : (
        <Typography>No articles available</Typography>
      )}
      {currentStatus === 'loading' && hasMore && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: 2,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ArticleList;
