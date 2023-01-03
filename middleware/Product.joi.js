const joi = require('joi');
const validateSchema = require('./validation')

const addproductschema = async (req, res, next) => {

    const schema = joi.object({
        title: joi.string().min(5).max(50).required(),
        descriptions: joi.string().min(5).max(2555).required(),
        name: joi.string().min(5).max(50).required(),
        price: joi.string().required(),
        Categoryid: joi.string().required(),
        // image: joi.string().required(),

    });
    validateSchema(req, res, next, schema);

}
const updateproductschema = async (req, res, next) => {

    const schema = joi.object({
        title: joi.string().min(5).max(50).required(),
        descriptions: joi.string().min(5).max(2555).required(),
        name: joi.string().min(5).max(50).required(),
        price: joi.string().required(),
        Categoryid: joi.string().required(),


    });
    validateSchema(req, res, next, schema);

}
module.exports = { addproductschema, updateproductschema }