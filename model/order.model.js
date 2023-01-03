const mongoose = require('mongoose');

const iteamSchema = {
    product_id: mongoose.Schema.Types.ObjectId,
    price: Number,
    quantity: Number,
    totalPrice: Number

}

const orderSchema = new mongoose.Schema({

    orderiteam: [iteamSchema],

    shippingAddress1: {
        type: String
    },
    shippingAddress2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    totalPrice: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isactive: {
        type: Boolean,
        default: true
    },
    isdeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });





const Order = mongoose.model("Order", orderSchema);

module.exports = Order;