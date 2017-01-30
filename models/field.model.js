
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fieldModel = new Schema({
  name: String,
  type: {
    type: String,
    enum: [
      'input',
      'textarea',
      'select',
      'checkbox'
    ]
  },
  output: {
    type: String,
    enum: [
      'string',
      'email',
      'date',
      'tel',
      'number',
      'boolean'
    ]
  },
  value: {
    type: Number
  },
  form: {
    type: Schema.ObjectId,
    ref: 'Form'
  }
});

module.exports = mongoose.model('Field', fieldModel);
