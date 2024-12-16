import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    s_id: Number,
    name: String,
    selectedProject: { type: String, default: null }
})

export default mongoose.model('student', studentSchema);