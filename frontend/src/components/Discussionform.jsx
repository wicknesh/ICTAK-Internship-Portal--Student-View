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
  Stack,
  Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SendIcon from '@mui/icons-material/Send';
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
        💬 Discussion Forum
      </Typography>

      {/* Query Posting Section */}
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4, backgroundColor: '#fdfdfd' }}>
        <Typography variant="h6" gutterBottom>
          ✍️ Post a Query
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="Type your query here..."
          value={newQuery}
          onChange={(e) => setNewQuery(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={postQuery}
          startIcon={<SendIcon />}
          fullWidth
        >
          Post Query
        </Button>
      </Paper>

      {/* Query List Section */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        📝 Queries
      </Typography>
      {queries.map((query) => (
        <Paper key={query._id} elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar>{query.name[0]}</Avatar>
            <Box flexGrow={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {query.name}
              </Typography>
              {editingQuery === query._id ? (
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
                />
              ) : (
                <Typography variant="body1">{query.query}</Typography>
              )}
              <Typography variant="caption" sx={{ color: '#888' }}>
                🕒 {new Date(query.timestamp).toLocaleString()}
              </Typography>
            </Box>
            {studentName === query.name && (
              <IconButton
                onClick={() =>
                  editingQuery === query._id
                    ? editQuery(query._id, query.query)
                    : setEditingQuery(query._id)
                }
              >
                {editingQuery === query._id ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            )}
          </Stack>

          <Button
            startIcon={<ThumbUpIcon />}
            onClick={() => likeQuery(query._id)}
            sx={{ marginTop: 1 }}
          >
            Like ({query.likes || 0})
          </Button>

          {/* Comments Section */}
          <Divider sx={{ marginY: 1 }} />
          <Typography variant="subtitle2">💬 Comments:</Typography>
          {query.comments?.map((comment, index) => (
            <Box key={index} sx={{ paddingLeft: 2, marginY: 1 }}>
              <Typography variant="body2">
                <strong>{comment.commenterName}:</strong> {comment.comment}
              </Typography>
              <Button
                startIcon={<ThumbUpIcon />}
                onClick={() => likeComment(query._id, index)}
                size="small"
              >
                Like ({comment.likes || 0})
              </Button>
            </Box>
          ))}
        </Paper>
      ))}
    </Container>
  );
};

export default DiscussionForum;
