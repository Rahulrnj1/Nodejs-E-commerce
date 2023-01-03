const joi = require('joi');
const validateSchema = require('./validation')


const addcategotyschema = async (req, res, next) => {

  const schema = joi.object({
    name: joi.string().min(5).max(50).required(),
    // image: joi.required(), 

  });
  validateSchema(req, res, next, schema);

}
const updatecategotyschema = async (req, res, next) => {

  const schema = joi.object({
    name: joi.string().min(5).max(50).required(),
    // image: joi.string().required(),

  });
  validateSchema(req, res, next, schema);

}


module.exports = { addcategotyschema, updatecategotyschema }