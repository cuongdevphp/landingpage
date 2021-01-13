const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    code: String,
    display_name: String,
    name: {
        type: String,
        enum: ["HOCHIMINH","HANOI"],
        required: true
    },
    count: Number,
    max: Number,
    count_draft: Number,
    max_draft: Number,
},
{
    timestamps: true,
})

exports.schema = mongoose.model('Region', Schema);
exports.name = "region.entity";