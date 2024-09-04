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
        bgcolor: 'aliceblue',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 2400,
        minHeight: '100vh', // Ensure the container takes up the full height of the viewport
        paddingBottom: '80px', // Space for the loader at the bottom
      }}
    >
      <Box
        sx={{
          marginLeft:50,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          padding: 2,
          flexDirection: 'row',
          width: '100%',
          bgcolor: 'aliceblue',
          maxWidth: 2400, // Constrain width to a max value
          '@media (max-width: 800px)': {
            flexDirection: 'row',
           alignItems: 'center', // Center items in column layout
          },
        }}
      >
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard
              slug={article.slug}
              image={article.author.image}
              title={article.title}
              author={article.author.username}
              description={article.description}
              favorited={article.favorited}
              favoritesCount={article.favoritesCount}
              createdAt = {article.createdAt}
              taglist = {article.tagList}
              follow = {article.author.following}
            />
          ))
        ) : (
          <Typography>No articles available</Typography>
        )}
      </Box>
      

      
      {/* Loader positioned at the bottom */}
      {currentStatus === 'loading' && hasMore && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            padding: 2,
            backgroundColor: '#f5f5f5', // Match the background color to avoid visual breaks
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ArticleList;
           