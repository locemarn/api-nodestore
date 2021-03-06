
// const ValidationContract = require('../validators/fluent-validator')
const repository         = require('../repositories/order-repository')
const guid               = require('guid')

exports.get = async(req, res, next) => {
  try {
    const data = await repository.get()
    res.status(200).send(data)
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.post = async(req, res, next) => {
  // let contract = new ValidationContract()
  // contract.hasMinLen(req.body.name, 3, 'O nome deve conter ao menos 3 caracteres.')
  // contract.isEmail(req.body.email, 'E-mail inválido')
  // contract.hasMinLen(req.body.password, 6, 'A senha deve conter ao menos 6 caracteres.')

  // // se os dados forem inválidos
  // if (!contract.isValid()) {
  //   res.status(400).send(contract.errors()).end()
  //   return
  // }
  
  
  try {
  await repository.create({
    customer: req.body.customer,
    number: guid.raw().substring(0,6),
    items: req.body.items
  })
    res.status(201).send({
    message: 'Pedido cadastrado com sucesso!'
  })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}