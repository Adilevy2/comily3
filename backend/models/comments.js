const mongoose=require('mongoose')
const Joi=require('joi');

const Comments=mongoose.model('comments',new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
}));

function validateComments(comment){
    const schema=Joi.object({
        name:Joi.string().required(),
        body:Joi.string().required(),
    })
    return schema.validate(comment);
 };

module.exports={Comments,validateComments};