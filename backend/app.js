import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Working');
})

app.use('/student', studentRoutes);
app.use('/project', projectRoutes);

app.listen(process.env.port, () => {
    console.log(`Server is listening to port ${process.env.port}`);
})

connectDB();