
const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    name: String,
    email: String, //encrypt
    phone: String, // encrypt
    address: String, // encrypt
    brand: {
        type: String,
        enum: ["HOCHIMINH","HANOI"]
    },
    country: {
        type: String,
        enum: ["VIETNAM","OTHER"]
    },
    dob: {
        type: Date,
    },
    birth_place: String,
    id_number: {
        type: String,
        unique: true
    },
    id_type: {
        type: String,
        enum: ["CMND","CCCD"],
    },
    id_issue_date: Date,
    id_issue_place: String,
    allow_margin_trade: {
        type: Boolean,
        default: false
    },
    allow_derivative_trade: {
        type: Boolean,
        default: false
    },
    allow_banking: {
        type: Boolean,
        default: false
    },
    bank_account: String,
    bank_brand: String,
    bank_brand_region: String,
    requests: String,
    files: [String],
    validated: {
        type: Boolean,
        default: false,
        required: true
    },
    hash: String,
    sent: {
        type: Boolean,
        default: false,
        required: true
    },
    sex: {
        type: String,
        enum: ["MALE","FEMALE"],
    },
    is_ekyc: {
        type: Boolean,
        default: false
    },
    draftId: String,
},
{
    timestamps: true,
})

exports.schema = mongoose.model('Registration', Schema);
exports.name = "register.entity";