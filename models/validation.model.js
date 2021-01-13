const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    id_number: {
        type: String,
        unique: true
    },
    email: String,
    token: String,
    expireAt: {
        type: Date,
        default: null
    }
},
{
    timestamps: true,
})

Schema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });

exports.schema = mongoose.model('Validation', Schema);

exports.name = "validation.entity";