const User = require('../modelo/usuario.modelo')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const save = async (req, res, next) => {
    try {
        const data = req.body

        const hash = await bcrypt.hash(data.password, 10)
        data.password = hash
        console.log(data.password)

        const user = new User(data)

        const savedUser = await user.save()

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
        const usuario = await usuario.find()
        for (let usuario of usuarios) {
            usuario.password = undefined
        }
        res.json(users)
    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const usuario = await usuario.findById(id)
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
        if (!user) {
            throw new Error(`Usuario com o id ${id} não foi encontrado`)
        }
        data.password = usuario.password
        const newUsuario = await usuario.findByIdAndUpdate(id, data, { new: true })
        newUsuario.password = undefined
        res.json(newUsuario)
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const usuario = await Usuario.findById(id)
        if (!user) {
            throw new Error(`Usuario com o id ${id} não foi encontrado`)
        }
        await Usuario.findByIdAndDelete(id)
        res.json({ message: `Usuario com o id ${id} foi deletado` })
    } catch (err) {
        next(err)
    }
}

const authenticate = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!(username && password)) {
            throw new Error('Usuario e senha sao necessarios')
        }

        const user = await User.findOne({ username })

        if (usuario && (await bcrypt.compare(password, usuario.password))) {
            const token = jwt.sign({
                sub: usuario._id,
                iss: 'biblioteca-api',
                username: usuario.username,
                name: usuario.name,
                
            }, '12345678', {
                expiresIn: '2h'
            })

            res.status(200).json(token)
        } else {
            throw new Error('Usuario e senha invalidos')
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