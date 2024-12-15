const mongoose=require('mongoose');
const MarkSchema=mongoose.Schema({
    studentId:String,
    projectId:String,
    marks:Number,
    comment:String

})
const   MarkData=mongoose.model('markdata',MarkSchema);
module.exports=MarkData;
