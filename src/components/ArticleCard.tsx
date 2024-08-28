import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

interface ArticleCardProps {
  image: string;
  title: string;
  author: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  image,
  title,
  author,
  description,
  favorited,
  favoritesCount,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
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
        marginLeft:'12'
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />
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
            textDecorationColor:'ThreeDDarkShadow',
            textDecorationStyle:'dashed'
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            fontSize: '0.875rem',
            marginBottom: 0.5,
          }}
        >
          {author}
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
        sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}
      >
        <Button size="small" onClick={() => setIsOpen(true)}>Show Details</Button>
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
  );
};

export default ArticleCard;
