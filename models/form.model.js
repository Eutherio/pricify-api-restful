
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formModel = new Schema({
  title: String,
  description: String,
  type: {
    type: String,
    enum: ['contact', 'logical']
  },
  product: {
    type: Schema.ObjectId,
    ref: 'Product'
  }
});

module.exports = mongoose.model('Form', formModel);
