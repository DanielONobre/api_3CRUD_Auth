const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./src/Utilidades/db')
const Rotaloja = require('./src/routes/Rotaloja')
const Rotaproduto = require('./src/routes/Rotaproduto')
const Rotausuario = require('./src/routes/RotaUsuario')
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('api esta rodando')
})

// Rotas da loja
app.use('/api/v1/loja', Rotaloja)
// Rota produtos
app.use('/api/v1/produto', Rotaproduto)
// Rotas Usuario
app.use('/api/v1/usuario', Rotausuario)

app.use((error, req, res, next) => {
    console.log('ERRO', error) 
    res.status(500).json({errorMessage: error.message})
 })

 app.listen(port, () => {
    console.log(`api esta rodando na porta ${port}`)
})
