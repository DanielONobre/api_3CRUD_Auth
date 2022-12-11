const router = require('express').Router()
const controle = require('../controle/produto.controle')


router.post('/', controle.save)

router.get('/', controle.getAll)

router.get('/:id', controle.getById)

router.put('/:id', controle.update)

router.delete('/:id', controle.remove)

module.exports = router