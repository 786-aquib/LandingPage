import React, { useState } from 'react';
import { Card, CardActions, CardContent, Box, Avatar, Stack, Typography, Chip, ListItemButton, ListItemText } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { favoriteArticle } from '../redux/articleSlice'; // Correct import
import { AppDispatch } from '../redux/store'; // Import AppDispatch type
import CheckBoxIcon from '@mui/icons-material/CheckBox';


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
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // Correctly type dispatch
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [followArticle, setFollowArticle] = useState(false);

  const handleClick = () => {
    dispatch(favoriteArticle(slug)); // Pass only slug, not an object
    setIsFavorited(!isFavorited); // Toggle favorite state locally
  };

  const handleFollow = () => {
    setFollowArticle(!followArticle);
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
        minWidth: 500,
        minHeight: 450,
        bgcolor: 'whitesmoke',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <Stack direction="row" spacing={2}>
          <Avatar alt="Author" src={image} sx={{ width: 60, height: 60 }} />
        </Stack>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                marginRight: 20,
                lineHeight: 1.2,
              }}
            >
              {author}
            </Typography>
            <div onClick={handleFollow}>
              { followArticle ? (
                <CheckBoxIcon color='success' fontSize='medium'/>
              ) : (
                <div style={{display:'flex', flexDirection: 'row'}}>
              <AddIcon  style = {{ marginTop: 2.5}}color="action" fontSize="medium"/>
              <ListItemText primary="Follow" />
              </div>
        )}     
            </div>  
          </Box>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
              marginTop: 0.5,
            }}
          >
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </Typography>
        </Box>
      </Box>

      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 1,
        }}
      >
        <Box onClick={handleViewDetails} sx={{ cursor: 'pointer' }}>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              fontSize: '1rem',
              marginBottom: 0.5,
              marginLeft: 2,
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
            fontSize: '0.875rem',
            marginBottom: 22,
            marginLeft: 2,
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
        <Stack direction="row" spacing={1}>
          {taglist.map((tag, index) => (
            <Chip key={index} label={tag} variant={index % 1 === 0 ? 'filled' : 'outlined'} />
          ))}
        </Stack>

        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
          {isFavorited ? (
            <FavoriteIcon color="warning" fontSize="medium" />
          ) : (
            <FavoriteBorderIcon color="disabled" fontSize="medium" />
          )}
        </div>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
