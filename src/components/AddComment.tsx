import React, { useState } from 'react';
import { Box, Card, TextField, Button } from '@mui/material';
import axios from 'axios';
import AttachFileIcon from '@mui/icons-material/AttachFile';


const SendButton: React.FC<{ slug: string }> = ({ slug }) => {
  const [commentTxt, setCommentTxt] = useState<string>("");

  const handleSend = async () => {
    if (commentTxt.trim()) {
      try {
        // Retrieve the token from local storage or context
        const token = localStorage.getItem('token'); // Adjust if you're using a different storage method

        // Ensure the token is present
        if (!token) {
          console.error("Authentication token doesn't exists !!");
          return;
        }

        const response = await axios.post(
          `https://api.realworld.io/api/articles/${slug}/comments`,
          {
            comment: {
              body: commentTxt,
            },
          },
          {
            headers: {
              'Authorization': `Token ${token}`, // Include the token in the Authorization header
            },
          }
        );

        console.log("Comment sent:", response.data);
        setCommentTxt(""); // Clear the input field after sending
      } catch (error) {
        console.error("Error sending comment:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '250px', md: '300px' },
        // boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        // border: '1px solid #ddd',
        minWidth: 700,
        minHeight: 250,
        bgcolor: 'whitesmoke',
      }}
    >
      {/* Other content of the card */}
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          p: 1, // Padding at the bottom
        //   borderTop: '1px solid #ddd', // Optional border for separation
          marginTop: 22,
        }}
      > 
      <AttachFileIcon sx = {{
           marginTop: 1,
           marginRight: 1,
      }}color='success' fontSize='large'/>
        <TextField
          id="filled-basic"
          label="Add Comments"
          variant="filled"
          value={commentTxt}
          onChange={(e) => setCommentTxt(e.target.value)}
          sx={{ mb: 0.5, width: 600}} // Margin bottom for spacing
        />
        <Button
          onClick={handleSend}
          variant="text"
          color="primary"
          size="small"
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default SendButton;
