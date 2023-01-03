const joi = require('joi');
const validateSchema = require("./validation")

const addressschema = async (req, res, next) => {

    const schema = joi.object({
        shippingAddress1: joi.string().min(5).max(2555).required(),
        shippingAddress2: joi.string().min(5).max(2555).required(),
        city: joi.string().min(5).max(50).required(),
        zip: joi.string().required(),
        country: joi.string().required(),
        status: joi.string().required(),
        userId: joi.string().required(),

    });
    validateSchema(req, res, next, schema);

}
const Updateaddressschema = async (req, res, next) => {

    const schema = joi.object({
        shippingAddress1: joi.string().min(5).max(2555).required(),
        shippingAddress2: joi.string().min(5).max(2555).required(),
        city: joi.string().min(5).max(50).required(),
        zip: joi.string().required(),
        country: joi.string().required(),
        status: joi.string().required(),
        userId: joi.string().required(),

    });
    validateSchema(req, res, next, schema);

}
module.exports = { addressschema, Updateaddressschema }