const router = require('express').Router()
const controle = require('../controle/usuario.controle')


router.post('/', controle.save)

router.get('/', controle.getAll)

router.get('/:id', controle.getById)

router.put('/:id', controle.update)

router.delete('/:id', controle.remove)

router.post('/authenticate', controle.authenticate)

module.exports = router