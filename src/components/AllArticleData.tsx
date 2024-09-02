import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';

function AllArticleData() {
  const location = useLocation();
  const { slug } = location.state as { slug: string }; // Receive slug
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
        height: '100vh',
        bgcolor: 'slategrey',
        padding: 2,
        overflow: 'hidden',
      }}
    >
      <Card
        sx={{
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #ddd',
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
          marginBottom: 10,
          bgcolor: 'silver',
          width: '100%',
          maxWidth: 750,
          padding: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2, // Margin bottom for spacing
          }}
        >
          <img
            src={article.author.image}
            width={120}
            height={120}
            style={{
              borderRadius: '50%',
              marginBottom: 10,
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: 'center', mb: 2 }}
          >
            {article.author.username}
          </Typography>
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            {article.title}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            {article.description}
          </Typography>
          <Typography color="text.secondary">
            {article.slug}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default AllArticleData;
