const mongoose = require('mongoose')
const Product  = mongoose.model('Product')

exports.get = () => {
  return Product.find({ 
    active: true              // traz apenas os produtos que estão como active true do bd
  }, 'title price slug')      // Informações que vão aparecer dos produtos
}

exports.getBySlug = (slug) => {
  return Product
  .findOne({
    slug: slug,
    active: true              // traz apenas os produtos que estão como active true do bd
  }, 'title description price slug tags')      // Informaçῶoes que vão aparecer dos produtos
}

exports.getById = (id) => {
  return Product
    .findById(id)
}

exports.getByTag = (tag) => {
  return Product
  .find({
    tags: tag,
    active: true              // traz apenas os produtos que estão como active true do bd
  }, 'title description price slug tags')      // Informaçῶoes que vão aparecer dos produtos
}

// exports.create = (data) => {
//   let product = new Product()
  
//   product.title       = req.body.title
//   product.slug        = req.body.slug
//   product.description = req.body.description
//   product.price       = req.body.price
//   product.activate    = req.body.activate
//   product.tags        = req.body.tags

//   product
//     .save()
// }

exports.update = (id, data) => {
  return Product
  .findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
      slug: data.slug
    }
  })
}

exports.delete = (id) => {
  return Product
  .findOneAndRemove(id)
}