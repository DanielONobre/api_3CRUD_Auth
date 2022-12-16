const mongoose = require('mongoose')

const produtoSchema = mongoose.Schema({
        Nomeproduto: {
        type: String,
        required: true,
    },
        PrecoProduto: {
        type: Number,
        required: false
    },
        Validade: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Produto', produtoSchema)