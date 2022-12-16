const router = require('express').Router()
const controle = require('../controle/produto.controle')
const authz = require('../middlewares/authz.middleware')

router.post('/', authz, controle.save)

router.get('/', authz, controle.getAll)

router.get('/:id', authz, controle.getById)

router.put('/:id', authz, controle.update)

router.delete('/:id', authz, controle.remove)

module.exports = router