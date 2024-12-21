import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import axios from 'axios';

const DiscussionForum = () => {
  const [queries, setQueries] = useState([]);
  const [newQuery, setNewQuery] = useState('');
  const [editingQuery, setEditingQuery] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentingQueryId, setCommentingQueryId] = useState('');

  const projectId = 'p004';
  const studentEmail = 'katherine.moore@example.com';
  const studentName = 'Katherine Moore';

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/discussion/${projectId}`);
        setQueries(response.data);
      } catch (err) {
        console.error('Error fetching discussion queries:', err);
      }
    };

    fetchQueries();
  }, [projectId]);

  const postQuery = async () => {
    if (!newQuery.trim()) return;

    try {
      const response = await axios.post(`http://localhost:3000/discussion`, {
        p_id: projectId,
        email: studentEmail,
        query: newQuery,
      });
      setNewQuery('');
      setQueries((prev) => [...prev, response.data]);
    } catch (err) {
      console.error('Error posting query:', err);
    }
  };

  const editQuery = async (queryId, updatedQuery) => {
    try {
      const response = await axios.put(`http://localhost:3000/discussion/${queryId}`, {
        email: studentEmail,
        query: updatedQuery,
      });
      setQueries((prev) =>
        prev.map((query) => (query._id === queryId ? { ...query, query: response.data.query } : query))
      );
      setEditingQuery(null);
    } catch (err) {
      console.error('Error editing query:', err);
    }
  };

  const addComment = async (queryId) => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`http://localhost:3000/discussion/${queryId}/comments`, {
        commenterEmail: studentEmail,
        comment: newComment,
      });
      setQueries((prev) =>
        prev.map((query) =>
          query._id === queryId ? { ...query, comments: response.data.comments } : query
        )
      );
      setNewComment('');
      setCommentingQueryId(null);
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const likeQuery = async (queryId) => {
    try {
      const response = await axios.put(`http://localhost:3000/discussion/${queryId}/like`);
      setQueries((prev) =>
        prev.map((query) =>
          query._id === queryId ? { ...query, likes: response.data.likes } : query
        )
      );
    } catch (err) {
      console.error('Error liking query:', err);
    }
  };

  const likeComment = async (queryId, commentIndex) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/discussion/${queryId}/comments/${commentIndex}/like`
      );
      setQueries((prev) =>
        prev.map((query) =>
          query._id === queryId ? { ...query, comments: response.data.comments } : query
        )
      );
    } catch (err) {
      console.error('Error liking comment:', err.response?.data || err.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '40px', marginBottom: '40px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Discussion Forum
      </Typography>

      {/* Query Posting Section */}
      <Box
        component={Paper}
        elevation={3}
        sx={{
          padding: '20px',
          marginBottom: '30px',
          backgroundColor: '#f9f9f9',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Post a Query
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="Type your query here..."
          value={newQuery}
          onChange={(e) => setNewQuery(e.target.value)}
          sx={{ marginBottom: '20px', borderRadius: '8px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={postQuery}
          fullWidth
          sx={{ padding: '10px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}
        >
          Post Query
        </Button>
      </Box>

      {/* Query List Section */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Queries
      </Typography>
      {queries.map((query) => (
        <Box
          component={Paper}
          elevation={3}
          key={query._id}
          sx={{
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="body1">
            <strong>{query.name}:</strong> {editingQuery === query._id ? (
              <TextField
                value={query.query}
                onChange={(e) =>
                  setQueries((prev) =>
                    prev.map((q) =>
                      q._id === query._id ? { ...q, query: e.target.value } : q
                    )
                  )
                }
                multiline
                fullWidth
                sx={{ marginBottom: '10px', borderRadius: '8px' }}
              />
            ) : (
              query.query
            )}
          </Typography>

          <Typography variant="caption" sx={{ color: '#555', display: 'block', marginTop: '5px' }}>
            Posted on: {new Date(query.timestamp).toLocaleString()}
          </Typography>

          {studentName === query.name && (
            <IconButton
              onClick={() =>
                editingQuery === query._id
                  ? editQuery(query._id, query.query)
                  : setEditingQuery(query._id)
              }
              sx={{ float: 'right' }}
            >
              {editingQuery === query._id ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          )}

          <IconButton onClick={() => likeQuery(query._id)} sx={{ marginLeft: '10px' }}>
            <ThumbUpIcon /> {query.likes || 0}
          </IconButton>

          <Divider sx={{ marginY: '10px' }} />

          {/* Comments Section */}
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Comments:
          </Typography>
          {query.comments?.map((comment, index) => (
            <Box
              key={index}
              sx={{
                paddingLeft: '10px',
                marginY: '5px',
                borderLeft: '3px solid #1976d2',
                paddingBottom: '5px',
              }}
            >
              <Typography variant="body2">
                <strong>{comment.commenterName}:</strong> {comment.comment} <br />
                <em>{new Date(comment.timestamp).toLocaleString()}</em>
              </Typography>

              <Button
                startIcon={<ThumbUpIcon />}
                onClick={() => likeComment(query._id, index)}
                size="small"
                sx={{ marginTop: '5px' }}
              >
                Like ({comment.likes || 0})
              </Button>
            </Box>
          ))}

          {commentingQueryId === query._id ? (
            <>
              <TextField
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                fullWidth
                placeholder="Add a comment..."
                sx={{ marginTop: '10px', borderRadius: '8px' }}
              />
              <Button
                variant="contained"
                onClick={() => addComment(query._id)}
                sx={{
                  marginTop: '10px',
                  borderRadius: '8px',
                  padding: '10px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                }}
                fullWidth
              >
                Post Comment
              </Button>
            </>
          ) : (
            <Button
              startIcon={<CommentIcon />}
              onClick={() => setCommentingQueryId(query._id)}
              sx={{
                marginTop: '10px',
                borderRadius: '8px',
                padding: '10px',
                backgroundColor: '#1976d2',
                color: '#fff',
              }}
            >
              Add Comment
            </Button>
          )}
        </Box>
      ))}
    </Container>
  );
};

export default DiscussionForum;
