const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/fluent-validator')

exports.get = (req, res, next) => {
  Product.find({ 
    active: true              // traz apenas os produtos que estão como active true do bd
  }, 'title price slug')      // Informações que vão aparecer dos produtos
  .then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  })
}

exports.getBySlug = (req, res, next) => {
  Product
  .findOne({
    slug: req.params.slug,
    active: true              // traz apenas os produtos que estão como active true do bd
  }, 'title description price slug tags')      // Informaçῶoes que vão aparecer dos produtos
  .then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  })
}

exports.getById = (req, res, next) => {
  Product
  .findById(req.params.id)
  .then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  })
}

exports.getByTag = (req, res, next) => {
  Product
  .find({
    tags: req.params.tag,
    active: true
  }, 'title description price slug tags')
  .then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  })
}

exports.post = (req, res, next) => {
  let contract = new ValidationContract()
  contract.hasMinLen(req.body.title, 3, 'O título deve conter ao menos 3 carts.')
  contract.hasMinLen(req.body.slug, 3, 'O slug deve conter ao menos 3 carts.')
  contract.hasMinLen(req.body.description, 10, 'A descrição deve conter ao menos 10 carts.')
  contract.hasMinLen(req.body.price, 1, 'Campo obrigatório!')

  // se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  let product = new Product()
  
  product.title       = req.body.title
  product.slug        = req.body.slug
  product.description = req.body.description
  product.price       = req.body.price
  product.activate    = req.body.activate
  product.tags        = req.body.tags

  product
    .save()
    .then(x => {
      res.status(201).send({ message: 'Produto cadastrado com sucesso!' })
    }).catch(e => {
      res.status(400).send({ error: 'Falha ao cadastrar produto!', 
      data: e })
    }) 
}

exports.put = (req, res, next) => {
  Product
  .findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      slug: req.body.slug
    }
  }).then(x => {
    res.status(200).send({
      message: 'Produto atualizado com sucesso!'
    })
  }).catch(e => {
    res.status(400).send({
      message: 'Falha ao atualizar produto',
      data: e
    })
  })
}

exports.delete = (req, res, next) => {
  Product
  .findOneAndRemove(req.body.id)
  .then(x => {
    res.status(200).send({
      message: 'Produto removido com sucesso!'
    })
  }).catch(e => {
    res.status(400).send({
      message: 'Falha ao remover o produto',
      data: e
    })
  })
}