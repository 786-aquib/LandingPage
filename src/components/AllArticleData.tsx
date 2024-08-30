import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import {store} from '../redux/store';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useLocation } from 'react-router-dom';



function AllArticleData() {

    // ***********************  Important Concept to Render Particular data in an Article(Stored in Redux) using Unique Key(SLUG)  *********************** 4

    // **************************   START   *********************************
           const location = useLocation();
           const { slug } = location.state as { slug: string }; // Receive slug
           const articles = useSelector((state: RootState) => state.articles.articles);
           const article = articles.find(a => a.slug === slug);
    // **************************   END   *********************************


  if (!article) {
    return <div>No article data available</div>;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh', // Ensure it takes the full height of the viewport
        bgcolor: 'slategrey', // Set your background color here
        padding: 2, // Optional: padding for spacing
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
      <Card
        sx={{
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          borderRadius: 2,
          display: 'flex',
          border: '1px solid #ddd',
          marginLeft: 10,
          marginRight: 10, 
          marginTop: 5,
          marginBottom: 10, 
          bgcolor: 'whitesmoke',
          minWidth: 750,
          justifyContent: 'center',
        }}
      >
        
        {article.title}
        
        
      </Card>
    </Box>
  );
}

export default AllArticleData;
