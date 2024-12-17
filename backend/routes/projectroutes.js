const express=require('express');
const router=express.Router();
const projectModel=require('../model/projectdata');
router.use(express.json());



router.get('/projectdata',async(req,res)=>{
    try{
    const data= await projectModel.find();
    res.status(200).send (data);
} catch(error){
    res.status(400).send('no data');

}

})


  
  
  
  
    
module.exports=router;
