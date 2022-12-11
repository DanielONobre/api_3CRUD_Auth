const loja = require('../modelo/loja.modelo')


const save = async (req, res, next) => {  
    try {
        const data = req.body
        const newLoja = new Loja(data)
        const savedloja = await newLoja.save()
        if(!savedLoja) {
            throw new Error('Loja não pôde ser salva')
        }
        res.status(201).json({
            message: 'Nova loja cadastrada'
        })
        
    } catch(err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const loja = await Loja.find()
        res.status(200).json(loja)
    } catch(err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const loja = await loja.findById(id)
        if(!loja) {
            throw new Error(`Loja com o ${id} não foi encontrada`)
        }
        res.status(200).json(loja)
    } catch(err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const loja = await Loja.findById(id)
        if(!loja) {
            throw new Error(`Loja com o ${id} não foi encontrada`)
        }

        const newloja = await loja.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json(newloja)
    } catch(err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const loja = await loja.findById(id)
        if(!loja) {
            throw new Error(`loja com o ${id} não foi encontrada`)
        }
        await loja.findByIdAndDelete(id)
        res.status(200).json({message: `loja com o ${id} foi removida`})
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

