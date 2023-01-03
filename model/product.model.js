const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    descriptions: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 2555
    },
    price: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true,
    },

    Categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;