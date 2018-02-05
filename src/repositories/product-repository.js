const mongoose = require('mongoose')
const Product  = mongoose.model('Product')

exports.get = async() => {
  return res = await Product.find({ 
    active: true              // traz apenas os produtos que estão como active true do bd
  }, 'title price slug')      // Informações que vão aparecer dos produtos
  return res
}

exports.getBySlug = async(slug) => {
  const res = await Product
  .findOne({
    slug: slug,
    active: true              // traz apenas os produtos que estão como active true do bd
  }, 'title description price slug tags')      // Informaçῶoes que vão aparecer dos produtos
  return res
}

exports.getById = async(id) => {
  const res = await Product
    .findById(id)
    return res
}

exports.getByTag = async(tag) => {
  const res = await Product
  .find({
    tags: tag,
    active: true              // traz apenas os produtos que estão como active true do bd
  }, 'title description price slug tags')      // Informaçῶoes que vão aparecer dos produtos
  return res
}

exports.create = async(data) => {
  let product = new Product(data)
  await product.save()
}

exports.update = async(id, data) => {
  await Product
  .findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
      slug: data.slug
    }
  })
}

exports.delete = async(id) => {
  await Product
  .findOneAndRemove(id)
}