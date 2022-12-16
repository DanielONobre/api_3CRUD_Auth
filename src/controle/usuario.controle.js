const User = require('../modelo/usuario.modelo')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const constants = require('../Utilidades/constants')

const save = async (req, res, next) => {
    try {
        const data = req.body

        const hash = await bcrypt.hash(data.Senha, 10)
        data.Senha = hash
        const newUser = new User(data)
        const savedUser = await newUser.save()

        if (!savedUser) {
            throw Error('Usuario nao pode ser salvo, tente novamente')
        }
        res.status(201).json({
            message: 'Novo usuário criado'
        })
    } catch (err) {
        next(err)
    }

}
const getAll = async (req, res, next) => {
    try {
        const usuarios = await User.find()
        for (let usuario of usuarios) {
            usuario.password = undefined
        }
        res.json(usuarios)
    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const usuario = await User.findById(id)
        if (!usuario) {
            throw new Error(`Usuario com o id ${id} não foi encontrado`)
        }

        usuario.password = undefined
        res.json(usuario)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body
        const usuario = await User.findById(id)
        if (!usuario) {
            throw new Error(`Usuario com o id ${id} não foi encontrado`)
        }
        data.password = usuario.password
        const newUsuario = await User.findByIdAndUpdate(id, data, { new: true })
        newUsuario.password = undefined
        res.json(newUsuario)
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const usuario = await User.findById(id)
        if (!usuario) {
            throw new Error(`Usuario com o id ${id} não foi encontrado`)
        }
        await User.findByIdAndDelete(id)
        res.json({ message: `Usuario com o id ${id} foi deletado` })
    } catch (err) {
        next(err)
    }
}

const authenticate = async (req, res, next) => {
    try {
        const { username, Senha } = req.body

        if (!(username && Senha)) {
            throw new Error('username and password are required')
        }

        const user = await User.findOne({ username })

        if (user && (await bcrypt.compare(Senha, user.Senha))) {
            const token = jwt.sign({
                sub: user._id,
                iss: constants.security.iss,
                username: 'daniel',
                name: user.name,
                profiles: user.profiles
            }, constants.security.secret, {
                expiresIn: constants.security.expires
            })

            res.status(200).json(token)
        } else {
            throw new Error('username and password invalid')
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    save,
    getAll,
    getById,
    update,
    remove,
    authenticate
}