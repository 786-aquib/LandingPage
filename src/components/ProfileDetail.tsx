import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import ArticleCard from './ArticleCard';
import { RootState, AppDispatch } from '../redux/store';
import { fetchArticles } from '../redux/articleSlice';
import { useLocation } from 'react-router-dom';
import WebsiteName from './WebsiteName';
import AvatarDemo2 from './Avatar2';
import CreateNewArticle from './CreateNewArticle';
import Profile from './Profile';
import AvatarDemo from './Avatar';

const ProfileDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, status, error, hasMore, offset } = useSelector((state: RootState) => state.articles);
  const currentStatus = status as 'idle' | 'loading' | 'failed';

  // Use location hook to get state
  const location = useLocation();
  const username = location.state?.username; // Safe access with optional chaining

  console.log(username);

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

  // Handle case where username is not available
  if (!username) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography>No username provided</Typography>
      </Box>
    );
  }

  // Filter articles by the provided username
  const filteredArticles = articles.filter(article => article.author.username === username);

  console.log(filteredArticles);

  return (          
    <div>
      
      <Box>
      <div style={{ overflow: 'hidden', margin: 0, padding: 0 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 0.5, // Optional: Add padding for spacing
          overflow: 'hidden', // Ensure no overflow
          width: '100%', // Ensure Box takes full width
          bgcolor: 'aliceblue',
        }}
      >
        <WebsiteName />
        <Typography
        sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: 2,       
        }}
        > 
           {username}'s Article
        </Typography>  
        <Box 
        sx={ {
             display: 'flex',
             marginRight: 2,
             
        }}
        >
            <CreateNewArticle />
            
            <AvatarDemo />
            
        </Box>
        </Box>
            </div>
        
      </Box>
      <Box
        sx={{
          bgcolor: 'aliceblue',
          display: 'flex',                                                          
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          paddingBottom: '80px',
          px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        }}
      >
        <Grid
          container
          spacing={4} // Space between grid items
          sx={{
            maxWidth: { xs: '100%', sm: 1200, md: 1400 }, // Max width of the container
          }}
        >
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Grid item xs={12} sm={6} key={article.slug}>
                <ArticleCard
                  slug={article.slug}
                  image={article.author.image}
                  title={article.title}
                  author={article.author.username}
                  description={article.description}
                  favorited={article.favorited}
                  favoritesCount={article.favoritesCount}
                  createdAt={article.createdAt}
                  taglist={article.tagList}
                  follow={article.author.following}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography>No articles available</Typography>
            </Grid>
          )}
        </Grid>

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
              backgroundColor: '#f5f5f5',
            }}
          >
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ProfileDetail;
