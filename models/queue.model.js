const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    to: String,
    cc: [String],
    id_number: String,
    hash: String
},
{
    timestamps: true,
})

exports.schema = mongoose.model('Queue', Schema);
exports.name = "queue.entity";