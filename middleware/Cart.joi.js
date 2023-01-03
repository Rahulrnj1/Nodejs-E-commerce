const joi = require('joi');
const validateSchema = require('./validation')

const cartschema = async (req, res, next) => {
    const schema = joi.object({
        userId: joi.string().required(),
        product_id: joi.string().required(),
        quantity: joi.string().required(),
        totalPrice: joi.string().required(),
        price: joi.string().required(),


    })
    validateSchema(req, res, next, schema);

}
const updatecartschema = async (req, res, next) => {

    const schema = joi.object({
        userId: joi.string().required(),
        product_id: joi.string().required(),
        quantity: joi.string().required(),
        totalPrice: joi.string().required(),
        price: joi.string().required(),

    });
    validateSchema(req, res, next, schema);

}
module.exports = { cartschema, updatecartschema }