const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productModel = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('Product', productModel);
