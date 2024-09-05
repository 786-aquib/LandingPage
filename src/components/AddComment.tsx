import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import AttachFileIcon from '@mui/icons-material/AttachFile';

interface Comment {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: {
    username: string;
    image: string;
  };
}

const CommentsSection: React.FC<{ slug: string }> = ({ slug }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentTxt, setCommentTxt] = useState<string>("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://api.realworld.io/api/articles/${slug}/comments`
        );
        console.log("Fetched comments:", response.data); // Log the response data
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }                
    };

    fetchComments();
  }, [slug]);

  const handleSend = async () => {
    if (commentTxt.trim()) {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error("Authentication token doesn't exist!");
          return;
        }

        console.log("Sending comment with token:", token); // Log the token

        const response = await axios.post(
          `https://api.realworld.io/api/articles/${slug}/comments`,  
          {     
            comment: {
              body: commentTxt,
            },    
          },
          {
            headers: {
              'Authorization': `Token ${token}`,
            },
          }
        );

        console.log("Comment sent:", response.data);
        setComments((prevComments) => [ ...prevComments, response.data.comment]);
        setCommentTxt("");
      } catch (error) {
        console.error("Error sending comment:", error);
      }
    }   
  };

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      p: 2,
      height: '700px', // Set the fixed height for the comments section
      maxHeight: '700px',
      overflowY: 'auto', // Enable vertical scrolling
      bgcolor: 'whitesmoke',
      // borderRadius: 2,
      // boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      marginTop: 10,
    }}
  >
    <Typography
       sx={{
           display: 'flex',
           justifyContent: 'center',

       }}
     variant="h6" gutterBottom>
      Comments
    </Typography>
    {comments.length > 0 ? (
      <Box sx={{ mb: 2 }}>
        {comments.map((comment) => (
          <Box key={comment.id} sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={comment.author.image}
                alt={comment.author.username}
                style={{ borderRadius: '50%', width: 40, height: 40, marginRight: 8 }}
              />
              <Typography variant="body1" fontWeight="bold">
                {comment.author.username}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {comment.body}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {new Date(comment.createdAt).toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Box>
    ) : (
      <Typography>No comments yet.</Typography>
    )}
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        mt: 2,
        bgcolor: 'white',
        borderTop: '1px solid #ddd',
        p: 1,
      }}
    >
      <AttachFileIcon sx={{ marginRight: 1 }} color='success' fontSize='large'/>
      <TextField
        label="Add Comment"
        variant="filled"
        value={commentTxt}
        onChange={(e) => setCommentTxt(e.target.value)}
        sx={{ flexGrow: 1, marginRight: 1 }}
      />
      <Button onClick={handleSend} variant="contained" color="primary">
        Send
      </Button>
    </Box>
  </Box>
  );
};

export default CommentsSection;
