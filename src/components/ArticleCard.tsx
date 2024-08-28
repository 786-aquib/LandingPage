import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button, Box, Avatar, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { formatDistanceToNow } from 'date-fns';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import AllArticleData from './AllArticleData';

interface ArticleCardProps {
  image: string;
  title: string;
  author: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  createdAt: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  image,
  title,
  author,
  description,
  favorited,
  favoritesCount,
  createdAt,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isFavorited, setIsFavorited] = useState(false);

  // Handler to toggle the favorited state
  const handleClick = () => {
    setIsFavorited(prev => !prev);
  };

  const showingDetails = () => {
      <AllArticleData/>
  }


  return (
  <div onClick={showingDetails} style={{ cursor: 'pointer'}}>
    <Card
      sx={{
        width: { xs: '100%', sm: '250px', md: '300px' },
        height: 'auto',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'snow',
        border: '1px solid #ddd',
        minWidth: 380,
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
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              marginRight: 16,
              marginTop: 2,
              fontVariant: 'contextual',
              textDecorationStyle: 'solid',
            }}
          >
            {author}
          </Typography>
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
            textDecorationColor: 'ThreeDDarkShadow',
            textDecorationStyle: 'dashed',
          }}
        >
          {title}
        </Typography>
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <FormatListNumberedOutlinedIcon color='action' fontSize='medium'/>
         

<div onClick={handleClick} style={{ cursor: 'pointer' }}>
      {isFavorited ? (
        <FavoriteIcon
          sx={{
            padding: 1,
          }}
          color='success'
          fontSize='medium'
        />
      ) : (
        <FavoriteBorderIcon
          color='disabled'
          fontSize='medium'
        />
      )}
    </div>
          
        </Box>
      </CardActions>

      {isOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              backgroundColor: '#FFEBCD',
              padding: 4,
              borderRadius: 3,
              boxShadow: 3,
              width: '90%',
              maxWidth: '500px',
            }}
          >
            <Typography variant="h6" gutterBottom>Details</Typography>
            {/* Add more details or content here */}
            <Button onClick={() => setIsOpen(false)} variant="contained" color="primary">Close</Button>
          </Box>
        </Box>
      )}
    </Card>
    </div>
  );
};

export default ArticleCard;
