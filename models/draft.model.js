const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    name: String,
    email: String, //encrypt
    phone: String, 
    sex: {
        type: String,
        enum: ["MALE","FEMALE"],
    },
    brand: {
        type: String,
        enum: ["HOCHIMINH","HANOI"]
    },
    country: {
        type: String,
        enum: ["VIETNAM","OTHER"]
    },
    assign_to_user: String,
    transaction_code: String,
    broker: String,
    ref: String,
    images: [String],
    completedAt: Date
},
{
    timestamps: true,
})

exports.schema = mongoose.model('Draft', Schema);
exports.name = "draft.entity";