import React, { useState } from 'react';
import { Card, CardActions, CardContent, Box, Avatar, Stack, Typography, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { favoriteArticle } from '../redux/articleSlice';
import { AppDispatch } from '../redux/store';
import  followUser  from '../redux/articleSlice';
import { error } from 'console';

                        
      
interface ArticleCardProps {      
  slug: string;
  image: string;
  title: string;           
  author: string;
  description: string;
  favorited: boolean;   
  favoritesCount: number;
  createdAt: string;     
  taglist: string[];
  follow : boolean;
}    

const ArticleCard: React.FC<ArticleCardProps> = ({
  slug,
  image,
  title,
  author,
  description,
  favorited,
  favoritesCount,
  createdAt,
  taglist,      
  follow,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [isfollow, setIsfollow] = useState(false);

  const handleClick = () => {
    dispatch(favoriteArticle(slug));
    setIsFavorited(!isFavorited);     
  };

  const handleFollow = () => {
    const username = author;           
    console.log("username ==> ",username)
    // dispatch(followUser(username));     
    setIsfollow(!isfollow);
  };

  const handleViewDetails = () => {
    navigate('/AllArticleData', {
      state: {
        slug,
        image,
        title,
        author,
        description,
        favorited: isFavorited,
        favoritesCount,
        createdAt,
        taglist,
        follow,
      },
    });
  };

  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '250px', md: '300px' },
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid #ddd',
        minWidth: 700,
        minHeight: 200,
        bgcolor: 'whitesmoke',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 1.5,
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ flex: 1 }}>
          <Avatar alt="Author" src={image} sx={{ width: 50, height: 50 }} />
          <Box>
            <Typography
              onClick={handleViewDetails}
              sx={{
                cursor: 'pointer',
                fontSize: '1rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.2,
                marginTop: 0.5,
                marginLeft: 1,
              }}
            >
              {author}
            </Typography>
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: '0.75rem',
                marginLeft: 1,
              }}
            >
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={()=>handleFollow()}>
          {isfollow ? (
            <Typography sx={{ fontSize: '1rem', color: '#670a8e' }}>Following</Typography>
          ) : (
            <Stack direction="row" spacing={0.2} alignItems="center">
              <AddIcon color='success' fontSize="small" />
              <Typography sx={{ fontSize: '1rem', color: 'green' }}>Follow</Typography>
            </Stack>
          )}
        </Box>
      </Box>
      <CardContent
  sx={{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 1,
  }}
>
  <Box onClick={handleViewDetails} sx={{ cursor: 'pointer' }}>
    <Typography
      variant="body2"
      color="ActiveCaption"
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',

        fontSize: '0.875rem',
        marginBottom: 2, // Reduced margin-bottom to bring title closer to description
      }}
    >
      {title}
    </Typography>
  </Box>

  <Typography
    variant="body2"
    color="text.secondary"
    sx={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      fontSize: '0.75rem',
      marginBottom: 0.5, // Small margin-bottom to ensure consistent spacing
    }}
  >
    {description}
  </Typography>
</CardContent>

      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 1,
        }}
      >
        <Stack direction="row" spacing={0.5}>
          {taglist.map((tag, index) => (
            <Chip key={index} label={tag} variant={index % 1 === 0 ? 'filled' : 'outlined'} />
          ))}
        </Stack>

        <Box onClick={handleClick} sx={{ cursor: 'pointer' }}>
          {isFavorited ? (
            <FavoriteIcon color="warning" fontSize="small" />
          ) : (
            <FavoriteBorderIcon color="disabled" fontSize="small" />
          )}
        </Box>
      </CardActions>
    </Card> 
  );
};

export default ArticleCard;
