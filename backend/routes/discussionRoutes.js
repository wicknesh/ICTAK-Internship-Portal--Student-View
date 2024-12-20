import express from 'express';
import Discussion from '../models/Discussion.js';
import studentModel from '../models/studentData.js';

const router = express.Router();

// @route   GET /discussion/:p_id
// @desc    Get all queries for a specific project
// @access  Public
router.get('/:p_id', async (req, res) => {
  try {
    const discussions = await Discussion.find({ p_id: req.params.p_id });
    res.status(200).json(discussions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching discussion queries', error: err.message });
  }
});

// @route   POST /discussion
// @desc    Post a new query to the discussion forum
// @access  Public
router.post('/', async (req, res) => {
  const { p_id, email, query } = req.body;

  try {
    const student = await studentModel.findOne({ email });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const newDiscussion = new Discussion({
      p_id,
      name: student.name, 
      query,
    });

    const savedDiscussion = await newDiscussion.save();
    res.status(201).json(savedDiscussion);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post query', details: err.message });
  }
});

// @route   PUT /discussion/:id
// @desc    Edit an existing query
// @access  Public
router.put('/:id', async (req, res) => {
  const { email, query } = req.body;

  try {
    const student = await studentModel.findOne({ email });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ error: 'Query not found' });

    if (discussion.name !== student.name) {
      return res.status(403).json({ error: 'You can only edit your own queries' });
    }

    discussion.query = query;
    const updatedDiscussion = await discussion.save();
    res.status(200).json(updatedDiscussion);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update query', details: err.message });
  }
});

// @route   POST /discussion/:id/comments
// @desc    Add a comment to a query
// @access  Public
router.post('/:id/comments', async (req, res) => {
  const { commenterEmail, comment } = req.body;

  try {
    const student = await studentModel.findOne({ email: commenterEmail });
    if (!student) return res.status(404).json({ error: 'Commenter not found' });

    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ error: 'Query not found' });

    // Push a new comment with the commenter's name
    discussion.comments.push({ commenterName: student.name, comment ,  timestamp: new Date(),});
    const updatedDiscussion = await discussion.save();

    res.status(200).json(updatedDiscussion);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment', details: err.message });
  }
});

export default router;
