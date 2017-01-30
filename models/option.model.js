
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionModel = new Schema({
  type: {
    type: String,
    enum: [
      'option',
      'checkbox'
    ]
  },
  label: String,
  value: String,
  field: {
    type: Schema.ObjectId,
    ref: 'Field'
  }
});

module.exports = mongoose.model('Option', optionModel);
