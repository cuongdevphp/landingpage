const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    user_name: String,
    region: {
        type: String,
        enum: ["HOCHIMINH","HANOI"],
        required: true
    },
    brand: String,
    name: String,
    email: String,
    count: Number,
    max: Number,
    count_draft: Number,
    max_draft: Number,
    full_name: String,
    mobile: String,
    phone_number: String,
    address_branch: String,
},
{
    timestamps: true,
})

exports.schema = mongoose.model('Broker', Schema);
exports.name = "broker.entity";