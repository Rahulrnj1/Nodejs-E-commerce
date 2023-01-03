const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    quantity: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    price: {
        type: Number,
        default: 0
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
    },
}, { versionKey: false });
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;