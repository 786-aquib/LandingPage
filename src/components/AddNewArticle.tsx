import React, { useState } from "react";
import { Button, TextField, Box, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

const CreateNewArticle = () => {
  const [title, setTitle] = useState("");                               
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // Correctly use the dispatch hook

  const handleSubmit = async (e: React.FormEvent) => {             
    e.preventDefault();
    const articleData = {
      title,
      description,
      body,
      tagList: tags.split(",").map(tag => tag.trim()), // Convert comma-separated tags to an array
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("https://api.realworld.io/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`, // Use token from localStorage
        },
        body: JSON.stringify({ article: articleData }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      console.log("Article created successfully:", data);

      // Dispatch the action to add the article to Redux
      navigate('/Profile'); // Redirect after successful creation
    } catch (error) {
      console.error("Error creating article:", error);
      // Optionally show an error message
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: 'flex',                                                                   
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem', // Adjust top margin as needed
      }}
    >
      <form 
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
        }}
      >
        <Box mb={2}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField           
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Body"
            fullWidth
            multiline
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Tags (comma-separated)"
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{
            width: '100%',
            marginTop: '1rem',
          }}
        >
          Create Article
        </Button>
      </form>
    </Container>
  );
};

export default CreateNewArticle;
