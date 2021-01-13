const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    phone_number: String,
    resend_number: {
        type: Number,
        default: 0
    },
    code: {
        type: String,
        required: true
    },
    sentAt: Date,
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '5m' },
    },
    key: String
},
{
    timestamps: true,
})

exports.schema = mongoose.model('Otp', Schema);
exports.name = "otp.entity";