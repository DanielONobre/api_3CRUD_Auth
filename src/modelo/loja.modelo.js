const mongoose = require('mongoose')

const lojaSchema = mongoose.Schema({
        NomeLoja: {
        type: String,
        required: true,
    },
        CEP: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('loja', lojaSchema)