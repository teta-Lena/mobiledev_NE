const { Schema, model } = require('mongoose');

const PurchasedTokenSchema = new Schema({
    meter_number: {
        type: String,
        default: null,
        minlength: 6,
    },
    token: {
        type: String,
        default: null,
        minlength: 8,
    },
    token_status: {
        type: String,
        enum: ['USED', 'NEW', 'EXPIRED'],
        default: 'NEW',
    },
    token_value_days: {
        type: Number,
        default: 0,
        maxlength: 11,
    },
    purchased_date: {
        type: Date,
        default: Date.now(),
    },
    amount: {
        type: Number,
        default: 0,
        maxlength: 11,
    },
}, { timestamps: true });

module.exports = model('PurchasedToken', PurchasedTokenSchema);
