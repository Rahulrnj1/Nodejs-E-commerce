
const joi = require('joi');
const validateSchema = require('./validation')

const orderschema = async (req, res, next) => {

    const schema = joi.object({
        product: joi.string().min(5).max(50).required(),
        shippingAddress1: joi.string().min(5).max(2555).required(),
        shippingAddress2: joi.string().min(5).max(2555).required(),
        city: joi.string().min(5).max(50).required(),
        zip: joi.string().required(),
        country: joi.string().required(),
        Categoryid: joi.string().required(),
        status: joi.string().required(),
        orderiteam: joi.array().optional(),
        totalPrice: joi.string().required(),
        user: joi.string().required(),

    });
    validateSchema(req, res, next, schema);

}
const updateorderschema = async (req, res, next) => {

    const schema = joi.object({
        product: joi.string().min(5).max(50).required(),
        shippingAddress1: joi.string().min(5).max(2555).required(),
        shippingAddress2: joi.string().min(5).max(2555).required(),
        city: joi.string().min(5).max(50).required(),
        zip: joi.string().required(),
        country: joi.string().required(),
        Categoryid: joi.string().required(),
        status: joi.string().required(),
        orderiteam: joi.array().optional(),
        totalPrice: joi.string().required(),
        user: joi.string().required(),

    });
    validateSchema(req, res, next, schema);

}

module.exports = { orderschema, updateorderschema }