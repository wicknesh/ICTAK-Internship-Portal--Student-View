import express from 'express';
import Discussion from '../models/Discussion.js';
import studentModel from '../models/studentData.js';

const router = express.Router();


router.get('/:p_id', async (req, res) => {
  try {
    const discussions = await Discussion.find({ p_id: req.params.p_id });
    res.status(200).json(discussions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching discussion queries', error: err.message });
  }
});

// @route   POST /discussion

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

//   PUT /discussion/:id

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

//  POST /discussion/:id/comments

router.post('/:id/comments', async (req, res) => {
  const { commenterEmail, comment } = req.body;

  try {
    const student = await studentModel.findOne({ email: commenterEmail });
    if (!student) return res.status(404).json({ error: 'Commenter not found' });

    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ error: 'Query not found' });

 
    discussion.comments.push({ commenterName: student.name, comment ,  timestamp: new Date(),});
    const updatedDiscussion = await discussion.save();

    res.status(200).json(updatedDiscussion);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment', details: err.message });
  }
});

router.put('/:id/like', async (req, res) => {
  try {
    const query = await Discussion.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(query);
  } catch (err) {
    res.status(500).json({ error: 'Failed to like query' });
  }
});

router.put('/:queryId/comments/:commentIndex/like', async (req, res) => {
  const { queryId, commentIndex } = req.params;
  try {
    const query = await Discussion.findById(queryId);
    if (!query) return res.status(404).json({ message: 'Query not found' });

    if (!query.comments[commentIndex]) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    query.comments[commentIndex].likes = (query.comments[commentIndex].likes || 0) + 1;
    await query.save();
    res.json({ comments: query.comments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like comment' });
  }
});


export default router;
