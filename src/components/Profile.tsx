import { Avatar, Box } from '@mui/material';
import React from 'react';
import WebsiteName from './WebsiteName';
import AvatarDemo from './Avatar';
import ArticleList from './ArticleList';

function Profile() {
  return (
    <div style={{ overflow: 'hidden', margin: 0, padding: 0 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 0.5, // Optional: Add padding for spacing                   
          overflow: 'hidden', // Ensure no overflow
          width: '100%', // Ensure Box takes full width     
          bgcolor: 'aliceblue'                            
        }}
      >
        <WebsiteName />
        <AvatarDemo />
      </Box>
      <ArticleList />
    </div>
  );
}

export default Profile;
