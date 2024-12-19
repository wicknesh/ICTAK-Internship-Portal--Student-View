import React, { useState, useEffect, useContext } from 'react';
import { Container, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { StudentContext } from './StudentProvider'; 
const DiscussionForum = () => {
  const [queries, setQueries] = useState([]);
  const [newQuery, setNewQuery] = useState('');
  const [editingQuery, setEditingQuery] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentingQueryId, setCommentingQueryId] = useState('');

  const { projectId } = useParams(); 
  const { student } = useContext(StudentContext); 
  const studentEmail = student.email;

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
        prev.map((query) => (query._id === queryId ? { ...query, comments: response.data.comments } : query))
      );
      setNewComment('');
      setCommentingQueryId(null);
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Discussion Forum
      </Typography>
      <Box>
        <Typography variant="h6" gutterBottom>
          Queries
        </Typography>
        {queries.map((query) => (
          <Box
            key={query._id}
            sx={{
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              position: 'relative',
            }}
          >
            <Typography variant="body1">
              <strong>{query.name}:</strong>{' '}
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
                  sx={{ marginBottom: '10px' }}
                />
              ) : (
                query.query
              )}
            </Typography>
            {student.name === query.name && (
              <IconButton
                onClick={() =>
                  editingQuery === query._id
                    ? editQuery(query._id, query.query)
                    : setEditingQuery(query._id)
                }
                sx={{ position: 'absolute', right: '10px', top: '10px' }}
              >
                {editingQuery === query._id ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            )}
            <Box>
              <Typography variant="subtitle2" sx={{ marginTop: '10px' }}>
                Comments:
              </Typography>
              {query.comments?.map((comment, index) => (
                <Typography key={index} variant="body2">
                  <strong>{comment.commenterName}:</strong> {comment.comment}
                </Typography>
              ))}
              {commentingQueryId === query._id ? (
                <>
                  <TextField
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    fullWidth
                    placeholder="Add a comment..."
                    sx={{ marginTop: '10px' }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => addComment(query._id)}
                    sx={{ marginTop: '10px' }}
                  >
                    Post Comment
                  </Button>
                </>
              ) : (
                <Button
                  startIcon={<CommentIcon />}
                  onClick={() => setCommentingQueryId(query._id)}
                  sx={{ marginTop: '10px' }}
                >
                  Add Comment
                </Button>
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        label="Post your query"
        value={newQuery}
        onChange={(e) => setNewQuery(e.target.value)}
        sx={{ marginTop: '20px' }}
      />
      <Button variant="contained" onClick={postQuery} sx={{ marginTop: '10px' }}>
        Post Query
      </Button>
    </Container>
  );
};

export default DiscussionForum;


// 2nd code 
// import React, { useState, useEffect } from 'react';
// import { Container, Box, Typography, TextField, Button, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';
// import CommentIcon from '@mui/icons-material/Comment';
// import axios from 'axios';

// const DiscussionForum = () => {
//   const [queries, setQueries] = useState([]);
//   const [newQuery, setNewQuery] = useState('');
//   const [editingQuery, setEditingQuery] = useState(null);
//   const [newComment, setNewComment] = useState('');
//   const [commentingQueryId, setCommentingQueryId] = useState('');

//   // Hardcoded values for testing
//   // const projectId = 'p004';
//   // const studentEmail = 'john.doe@example.com'; 
//   // const studentName = 'John Doe'; 
//   const projectId = 'p004';
//   const studentEmail = 'katherine.moore@example.com'; 
//   const studentName = 'Katherine Moore'; 

//   useEffect(() => {
//     const fetchQueries = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/discussion/${projectId}`);
//         setQueries(response.data);
//       } catch (err) {
//         console.error('Error fetching discussion queries:', err);
//       }
//     };

//     fetchQueries();
//   }, [projectId]);

//   const postQuery = async () => {
//     if (!newQuery.trim()) return;

//     try {
//       const response = await axios.post(`http://localhost:3000/discussion`, {
//         p_id: projectId,
//         email: studentEmail,
//         query: newQuery,
//       });
//       setNewQuery('');
//       setQueries((prev) => [...prev, response.data]);
//     } catch (err) {
//       console.error('Error posting query:', err);
//     }
//   };

//   const editQuery = async (queryId, updatedQuery) => {
//     try {
//       const response = await axios.put(`http://localhost:3000/discussion/${queryId}`, {
//         email: studentEmail,
//         query: updatedQuery,
//       });
//       setQueries((prev) =>
//         prev.map((query) => (query._id === queryId ? { ...query, query: response.data.query } : query))
//       );
//       setEditingQuery(null);
//     } catch (err) {
//       console.error('Error editing query:', err);
//     }
//   };
//   const addComment = async (queryId) => {
//     if (!newComment.trim()) return;
  
//     try {
//       const response = await axios.post(`http://localhost:3000/discussion/${queryId}/comments`, {
//         commenterEmail: studentEmail, // Send the email for identifying the student
//         comment: newComment,
//       });
//       setQueries((prev) =>
//         prev.map((query) =>
//           query._id === queryId ? { ...query, comments: response.data.comments } : query
//         )
//       );
//       setNewComment('');
//       setCommentingQueryId(null);
//     } catch (err) {
//       console.error('Error adding comment:', err);
//     }
//   };
  

//   return (
//     <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
//       <Typography variant="h4" gutterBottom>
//         Discussion Forum
//       </Typography>
//       <Box>
//         <Typography variant="h6" gutterBottom>
//           Queries
//         </Typography>
//         {queries.map((query) => (
//           <Box
//             key={query._id}
//             sx={{
//               marginBottom: '10px',
//               padding: '10px',
//               border: '1px solid #ddd',
//               borderRadius: '5px',
//               position: 'relative',
//             }}
//           >
//             <Typography variant="body1">
//               <strong>{query.name}:</strong>{' '}
//               <Typography variant="caption" sx={{ display: 'block', marginTop: '5px' }}>
//       Posted on: {new Date(query.timestamp).toLocaleString()}
//     </Typography>
//               {editingQuery === query._id ? (
//                 <TextField
//                   value={query.query}
//                   onChange={(e) =>
//                     setQueries((prev) =>
//                       prev.map((q) =>
//                         q._id === query._id ? { ...q, query: e.target.value } : q
//                       )
//                     )
//                   }
//                   multiline
//                   fullWidth
//                   sx={{ marginBottom: '10px' }}
//                 />
//               ) : (
//                 query.query
//               )}
//             </Typography>
//             {studentName === query.name && (
//               <IconButton
//                 onClick={() =>
//                   editingQuery === query._id
//                     ? editQuery(query._id, query.query)
//                     : setEditingQuery(query._id)
//                 }
//                 sx={{ position: 'absolute', right: '10px', top: '10px' }}
//               >
//                 {editingQuery === query._id ? <SaveIcon /> : <EditIcon />}
//               </IconButton>
//             )}
//             <Box>
//               <Typography variant="subtitle2" sx={{ marginTop: '10px' }}>
//                 Comments:
//               </Typography>
//               {query.comments?.map((comment, index) => (
//                 <Typography key={index} variant="body2">
//                   <strong>{comment.commenterName}:</strong> {comment.comment} <br />
//                   <em>{new Date(comment.timestamp).toLocaleString()}</em>
//                 </Typography>
//               ))}
//               {commentingQueryId === query._id ? (
//                 <>
//                   <TextField
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     fullWidth
//                     placeholder="Add a comment..."
//                     sx={{ marginTop: '10px' }}
//                   />
//                   <Button
//                     variant="contained"
//                     onClick={() => addComment(query._id)}
//                     sx={{ marginTop: '10px' }}
//                   >
//                     Post Comment
//                   </Button>
//                 </>
//               ) : (
//                 <Button
//                   startIcon={<CommentIcon />}
//                   onClick={() => setCommentingQueryId(query._id)}
//                   sx={{ marginTop: '10px' }}
//                 >
//                   Add Comment
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         ))}
//       </Box>
//       <TextField
//         fullWidth
//         multiline
//         rows={3}
//         variant="outlined"
//         label="Post your query"
//         value={newQuery}
//         onChange={(e) => setNewQuery(e.target.value)}
//         sx={{ marginTop: '20px' }}
//       />
//       <Button variant="contained" onClick={postQuery} sx={{ marginTop: '10px' }}>
//         Post Query
//       </Button>
//     </Container>
//   );
// };

// export default DiscussionForum;
