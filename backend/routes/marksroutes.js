const express=require('express');
const router=express.Router();
const markModel=require('../model/markdata');
router.use(express.json());



router.get('/marks',async(req,res)=>{
    try{
    const data= await markModel.find();
    res.status(200).send (data);
} catch(error){
    res.status(400).send('no data');

}

})


  
  
  
  
    
module.exports=router;
