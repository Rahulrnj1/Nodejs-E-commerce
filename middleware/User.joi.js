const joi = require('joi');
const validateSchema = require('./validation')


const userregisterschema  = async (req,res,next) =>{
  const schema = joi.object({
    name: joi.string().min(5).max(50).required(),
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(5).max(255).required()
});

    validateSchema(req,res,next,schema);

}

const userloginschema  = async (req,res,next) =>{
  const schema = joi.object({
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(5).max(255).required()
});

    validateSchema(req,res,next,schema);

}


module.exports = {userregisterschema ,userloginschema}