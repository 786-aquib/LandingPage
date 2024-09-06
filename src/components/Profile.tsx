import { Avatar, Box } from '@mui/material';
import WebsiteName from './WebsiteName';
import AvatarDemo from './Avatar';
import ArticleList from './ArticleList';
import { request } from 'http';

function Profile() {

  const token2 =  localStorage.getItem('token');
   console.log("token : 2" + token2);
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
          bgcolor: 'aliceblue',                                       
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
