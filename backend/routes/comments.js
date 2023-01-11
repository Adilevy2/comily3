const express=require('express');
const router=express.Router();
const {Comments,validateComments}=require('../models/comments');
const auth=require('../middlewares/authinticate')


//get all comments
router.get('/',async(req,res)=>{
    const comments=await Comments.find().sort('name');
    res.send(comments).status(200);
});

//post a cooment
router.post('/',auth,async (req,res)=>{

    const results = validateComments(req.body)
    if(results.error){
        res.status(400).send(results.error.details[0].message)
        return
    }
    let comment = new Comments(req.body);
    comment = await comment.save()
    res.send(comment)
});

module.exports=router;