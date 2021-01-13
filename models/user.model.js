const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    cc_email: String,
    location: {
        type: String,
        enum: ["HOCHIMINH","HANOI"],
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    password: String,
    mail_received_count: Number,
    validated: Boolean
},
{
    timestamps: true,
})

exports.schema = mongoose.model('Users', Schema);
exports.name = "user.entity";