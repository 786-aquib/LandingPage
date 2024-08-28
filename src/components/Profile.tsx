import { Avatar, Box } from '@mui/material';
import React from 'react';
import WebsiteName from './WebsiteName';
import AvatarDemo from './Avatar';

function Profile() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0.5 // Optional: Add padding for spacing
      }}
    >
      <WebsiteName />
      <AvatarDemo />
    </Box>
  );
}

export default Profile;
