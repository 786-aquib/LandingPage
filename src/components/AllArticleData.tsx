import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useLocation } from 'react-router-dom';
import { Typography, Avatar, Stack, Chip, CardActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddComment from './AddComment';
import { grey } from '@mui/material/colors';
                                                                 
function AllArticleData() {          
  const location = useLocation();

  const { slug, FollowArticle } = location.state as { slug: string, FollowArticle: boolean }; // Receive slug and FollowArticle
  const [isFollowed, setIsFollowed] = useState(FollowArticle);
  console.log(isFollowed);

  const articles = useSelector((state: RootState) => state.articles.articles);
  const article = articles.find(a => a.slug === slug);

                             
  if (!article) {
    return <div>No article data available</div>;
  }
  return (
    <Box
      sx={{                              
        display: 'flex',                                      
        justifyContent: 'center',                           
        minWidth: 700,
        height: '100vh',           
        bgcolor: 'aliceblue',
        padding: 2,                 
        overflowY: 'hidden',                       
      }}
    >
      <Card   
        sx={{
          display: 'flex',         
          flexDirection: 'column',
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,  
          marginBottom: 10,                               
          bgcolor: 'aliceblue',
          width: '100%',
          minWidth: 550,
          padding: 3,
          overflowY: 'hidden',

        }}           
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 1, // Margin bottom for spacing
          }}
        >
          <Avatar
            src={article.author.image}
            sx={{ width: 120, height: 120, marginBottom: 2 }}
          />                                  
          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: 'center', mb: 1 }}
          >                                            
            {article.author.username}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', mb: 3 }}>
          {(article.author.following) ? (
            <Typography sx={{ fontSize: '1.2rem', color: '#670a8e' }}>Following</Typography>
          ) : (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AddIcon color='success' fontSize="small" />
              <Typography sx={{ fontSize: '1.2rem', color: 'green' }}>Follow</Typography>
            </Stack>
          )}
        </Box>                    
                      
        <Box                                  
          sx={{           
            display: 'flex',                                                                                                                                        
            flexDirection: 'column',                  
            alignItems: 'flex-start',
            textAlign: 'left',
          }}            
        >
          <Typography variant="h6" sx={{ mb: 2 }} color={grey}>
            {article.title}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {article.description}
          </Typography>
          <Typography color="text.secondary">        
            {article.slug}
          </Typography>         
        </Box>
                                              
        <CardActions                
          sx={{
            display: 'flex',                
            justifyContent: 'space-between',                                 
            padding: 1.5,                      
            marginTop: 4,
          }}   
        >
          <Stack direction="row" spacing={2} fontSize={4}>    
            {article.tagList.map((tag, index) => (
              <Chip key={index} label={tag} variant={index % 1 === 0 ? 'filled' : 'outlined'} size="medium" />
            ))}
          </Stack>
         
          <Box>
            {article.favorited ? (
              <FavoriteIcon color="warning" fontSize='large' />
            ) : (
              <FavoriteBorderIcon color="disabled" fontSize='large' />
            )}
          </Box>
        </CardActions>    
      </Card>   
      <Box sx={{ marginTop: 3,  minWidth: 200}}>
          <AddComment slug={article.slug} />
        </Box>
    </Box>
  );
}     

export default AllArticleData;
                                      