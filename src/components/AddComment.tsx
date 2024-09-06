import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

interface Comment {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: {
    username: string; 
    bio: string;         
    image: string;
    following: boolean;
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
        console.log("Fetched comments:", response.data);
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
        console.log("Sending comment with token:", token);

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
  const DeleteComment = async (slug: string, id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Authentication token doesn't exist!");
        return;
      }
      console.log("Slug: ", slug);
      console.log("ID: ", id);
      console.log("Sending comment with token: ", token);
      await axios.delete(
        `https://api.realworld.io/api/articles/${slug}/comments/${id}`,
        {
          headers: {
            'Authorization': `Token ${token}`,
          },
        }
      );                                                                                       
      setComments((prevComments) => prevComments.filter(comment => comment.id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',  
      p: 2,
      height: '700px', 
      maxHeight: '700px',             
      overflowY: 'auto',
      bgcolor: 'whitesmoke',
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
              <Typography 
                 sx={{
                     display:'flex',
                     alignContent:'flex-end',
                 }}
              >
              <Typography variant="body1" fontWeight="bold">
                {comment.author.username}
                  </Typography>
                  <Button
                   onClick={() => DeleteComment(slug, comment.id)}
                   variant='text'
                   sx={{ marginLeft: 40 }}
                   >
                        Delete
                  </Button>
              <Typography>
                   
                </Typography>

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
      {/* <AttachFileIcon sx={{ marginRight: 1 }} color='success' fontSize='large'/> */}
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
