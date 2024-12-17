import express from 'express';
const router = express.Router();
import multer from 'multer';
import documentModel from '../models/documentData.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: {fileSize: 5 * 1024 * 1024} });

router.post('/upload', upload.single('documentFile'), async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Request file:", req.file);

        if(!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const { project_id } = req.body;

        if(!project_id) {
            return res.status(400).send('Project ID is required');
        }

        const document = new documentModel({
            name: req.file.originalname,
            document: req.file.buffer,
            project_id: project_id
        });

        await document.save();
        res.status(200).send('File uploaded successfully');

    } catch (error) {
        console.log(error);
        res.status(500).send("Error uploading file");
    }
})

export default router;

