const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema= new Schema({
  name:  { type: String, required: true },
  hex: { type: String, required: true },
  caste: {type: mongoose.Schema.Types.ObjectId, ref: 'Caste'},
  date: { type: Date, default: Date.now },
});

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;