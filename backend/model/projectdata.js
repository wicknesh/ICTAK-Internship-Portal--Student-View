const mongoose=require('mongoose');
const ProjectSchema=mongoose.Schema({
    ProjectId:Number,
    ProjectName:String,
    ProjectDescription:String,
    ProjectDocument:String,
    ProjectReference:String

})
const   ProjectData=mongoose.model('project',ProjectSchema);
module.exports=ProjectData;
