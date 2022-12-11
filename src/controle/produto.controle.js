const produto = require('../modelo/produto.modelo')


const save = async (req, res, next) => {  
    try {
        const data = req.body
        const newProduto = new Produto(data)
        const savedProduto = await newProduto.save()
        if(!savedProduto) {
            throw new Error('Produto não pôde ser salvo')
        }
        res.status(201).json({
            message: 'Novo produto cadastrado'
        })
        
    } catch(err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const produto = await Produto.find()
        res.status(200).json(produto)
    } catch(err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const produto = await Produto.findById(id)
        if(!produto) {
            throw new Error(`Produto com o ${id} não foi encontrado`)
        }
        res.status(200).json(produto)
    } catch(err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const produto = await Produto.findById(id)
        if(!produto) {
            throw new Error(`Produto com o ${id} não foi encontrado`)
        }

        const newProduto = await Produto.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json(newProduto)
    } catch(err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const produto = await Produto.findById(id)
        if(!produto) {
            throw new Error(`Produto com o ${id} não foi encontrado`)
        }
        await Produto.findByIdAndDelete(id)
        res.status(200).json({message: `Produto com o ${id} foi removido`})
    } catch(err) {
        next(err)
    }
}

module.exports = {
    save,
    getAll,
    getById,
    update,
    remove
}