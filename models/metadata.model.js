const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["OCR","FACE_AUTH"],
    },
    url: String,
    request_data: Object,
    request_log_path: String,
    response: Object,
    ref: String,
    success: Boolean
},
{
    timestamps: true,
})

exports.schema = mongoose.model('MetaData', Schema);
exports.name = "metadata.entity";