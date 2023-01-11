const mongoose=require('mongoose')
const Joi=require('joi');
const jwt=require('jsonwebtoken')


const schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

schema.methods.generateToken=function(){
    const token=jwt.sign({id:this.id, name:this.name},'tokenWord')
    return token;
}
const Users=mongoose.model('users',schema);

function validateUsers(user){
    const schema=Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required().email(), 
        password:Joi.string().required()
    });
    return schema.validate(user)
};

module.exports={Users,validateUsers}