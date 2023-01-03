const mongoose = require('mongoose');
const addressSchema = mongoose.Schema({

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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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





const Address = mongoose.model("Address", addressSchema);

module.exports = Address;


