const express    = require('express')
const bodyParser = require('body-parser')
const mongoose   = require('mongoose')

const app    = express()
const router = express.Router()

// conecta ao banco
// mudar username e password
mongoose.connect('mongodb://locemarn:locemarn@ds046867.mlab.com:46867/nodestore')

// carrega os Models
const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')

// carrega as rotas
const indexRoute    = require('./routes/index-route')
const productRoute  = require('./routes/product-route')
const customerRoute  = require('./routes/customer-route')
const orderRoute  = require('./routes/order-route')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute)
app.use('/products', productRoute)
app.use('/customers', customerRoute)
app.use('/orders', orderRoute)

module.exports = app
