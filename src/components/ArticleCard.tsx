import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button, Box, Avatar, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { formatDistanceToNow } from 'date-fns';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';

interface ArticleCardProps {
  slug : string;
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
  taglist
}) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleClick = () => {
    setIsFavorited(prev => !prev);
  };

  const handleViewDetails = () => {
    navigate('/AllArticleData', { state: { 
      slug,
      image, 
      title, 
      author, 
      description, 
      favorited: isFavorited, 
      favoritesCount, 
      createdAt, 
      taglist 
    } });
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
        bgcolor: 'whitesmoke'
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
          <Avatar
            alt="Author"
            src={image}
            sx={{ width: 56, height: 56 }}
          />
        </Stack>
        <Box>
          <div onClick={handleViewDetails} style={{ cursor: 'pointer' }}>
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                marginRight: 16,
                marginTop: 0.5,
                fontVariant: 'contextual',
                textDecorationStyle: 'solid',
              }}
            >
              {author}
            </Typography>
          </div>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: 'subtitle1',
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
        <Box>
          <div onClick={handleViewDetails} style={{ cursor: 'pointer' }}>
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
          </div>
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
            marginBottom: 1,
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
          maxWidth: '500px',
        }}
      >
        <Stack direction="row" spacing={1}>
          {taglist.map((tag, index) => (
            <Chip key={index} label={tag} variant={index % 2 === 0 ? 'filled' : 'outlined'} />
          ))}
        </Stack>

        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
          {isFavorited ? (
            <FavoriteIcon color='warning' fontSize='medium' />
          ) : (
            <FavoriteBorderIcon color='disabled' fontSize='medium' />
          )}
        </div>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
