const mongoose=require('mongoose');
const MarkSchema=mongoose.Schema({
   
    projectId:String,
    week:String,
    date:String,
    marks:Number,
    comment:String

})
const   MarkData=mongoose.model('markdata',MarkSchema);
module.exports=MarkData;
