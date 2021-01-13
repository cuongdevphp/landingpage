const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    code: String,
    display_name: String,
    region: {
        type: String,
        enum: ["HOCHIMINH","HANOI"],
        required: true
    },
    name: String,
    count: Number,
    max: Number,
    count_draft: Number,
    max_draft: Number,
    cc: [String]
},
{
    timestamps: true,
})

exports.schema = mongoose.model('Brand', Schema);
exports.name = "brand.entity";