const {Users,validateUsers}=require('../models/users');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const Joi=require('joi')


router.post('/',async(req,res)=>{
    const {error}=validateAuth(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }
    const users=await Users.findOne({email:req.body.email});
    if(!users){
        res.status(400).send('invalid email or password')
    }
    if(users){
        const compare=await bcrypt.compare(req.body.password,users.password)
        if(!compare)
              res.send('invalid password').status(400)
        else{
            res.header('access-control-expose-headers','x-auth-token')
            .header('x-auth-token',users.generateToken())
            .status(200).send(users.generateToken())
        }
    }
});

function validateAuth(user){
    const schema=Joi.object({
        email:Joi.string().min(2).max(255).required().email(),
        password:Joi.string().min(2).max(1024).required(),
    })
    return schema.validate(user)

}


module.exports=router;