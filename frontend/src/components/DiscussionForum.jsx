import React from 'react';
import { Box, Button, TextField, Typography, Container, Card, CardContent } from '@mui/material';

const DiscussionForum = () => {
  return (
    <Container sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Final Project Submission
      </Typography>
      
      <Card sx={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h6">Submission Guidelines</Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '10px' }}>
            Please ensure that your project follows the following guidelines before submitting:
            <ul>
              <li>Format: PDF, DOCX</li>
              <li>Max file size: 20MB</li>
              <li>Ensure all sections of your project are included</li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
      
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Project Title"
          variant="outlined"
          sx={{ marginBottom: '15px' }}
        />
        <TextField
          label="Project Description"
          variant="outlined"
          multiline
          rows={4}
          sx={{ marginBottom: '15px' }}
        />
        
        {/* File upload section */}
        <Button variant="contained" component="label" sx={{ marginBottom: '15px' }}>
          Upload Project File
          <input type="file" hidden />
        </Button>

        {/* Preview button */}
        <Button variant="outlined" sx={{ marginBottom: '15px' }}>
          Preview Submission
        </Button>

        {/* Submit button */}
        <Button variant="contained" color="primary" sx={{ marginTop: '15px' }}>
          Submit Project
        </Button>
      </Box>
    </Container>
  );
};

export default DiscussionForum;
