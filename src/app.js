const express    = require('express')
const bodyParser = require('body-parser')
const mongoose   = require('mongoose')

const app    = express()
const router = express.Router()

// conecta ao banco
mongoose.connect('mongodb://locemarn:locemarn@ds046867.mlab.com:46867/nodestore')

// carrega os Models
const Product = require('./models/product')

// carrega as rotas
const indexRoute    = require('./routes/index-route')
const productRoute  = require('./routes/product-route')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute)
app.use('/products', productRoute)

module.exports = app
