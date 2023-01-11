const {Users,validateUsers}=require('../models/users');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');



//getAll
router.get('/',async(req,res)=>{
    const users=await Users.find().sort('name');
    res.send(users).status(200)
})


//sighUp
router.post('/',async(req,res)=>{
    let {error}=validateUsers(req.body);
    if(error)
    res.status(400).send(error.details[0].message)

    let users=await Users.findOne({email:req.body.email});
    if(users){
        res.status(400).send('email.exist')
    }
    if(!users){
        users=await new Users(req.body);
        const salt =await bcrypt.genSalt(10);
        users.password=await bcrypt.hash(users.password,salt);
    }
    try{
        users=await users.save();
        res.send(users.generateToken()).status(200);
    }
    catch(err){
        res.status(400).send('error')  
  }
});


module.exports=router;