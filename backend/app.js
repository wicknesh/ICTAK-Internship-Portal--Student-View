import express from 'express';
import cors from 'cors';
import 'dotenv/config';
// import './db/connection.js' //Amina DB connection
import connectDB from './config/db.js'
import studentRoutes from './routes/studentRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: ["https://ictak-internship-portal-student-view-frontend.vercel.app"],
//     methods: ["POST", "PUT", "GET"],
//     credentials: true
// }))
app.use('/student', studentRoutes); //common for Amina
app.use('/project', projectRoutes);

app.get('/', (req, res) => {
    res.send('Working');
})

app.listen(process.env.port, () => {
    console.log(`Server is listening to port ${process.env.port}`);
})

connectDB();
