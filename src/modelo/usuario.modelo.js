const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    Senha: {
        type: String,
        required: true
    },
    profiles: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('usuario', usuarioSchema)