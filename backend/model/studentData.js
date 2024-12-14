const mongoose=require("mongoose")
const studentSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneNo: Number
});

const studentModel = mongoose.model('studentData', studentSchema)
module.exports=studentModel