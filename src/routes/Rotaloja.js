const router = require('express').Router()
const controle = require('../controle/loja.controle')


router.post('/', controle.save)

router.get('/', controle.getAll)

router.get('/:id', controle.getById)

router.put('/:id', controle.update)

router.delete('/:id', controle.remove)

module.exports = router