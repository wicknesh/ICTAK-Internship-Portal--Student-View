import express from 'express';
const router = express.Router();
import studentModel from '../models/studentData.js'

router.post('/add', async (req, res) => {
    const { s_id, name } = req.body;
    try {
        const newUser = new studentModel({ s_id, name })
        await newUser.save();
        res.status(200).json({message: 'Successfully added'});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const data = await studentModel.findOne({s_id: req.params.id});
        res.status(200).send(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

router.put('/selectProject', async (req, res) => {
    const { s_id, p_id } = req.body;
    try {
        const data = await studentModel.findOneAndUpdate(
            { s_id },
            { selectedProject: p_id },
            { new: true }
        );
        res.status(200).json({ message: 'Project selected successfully', data});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default router;