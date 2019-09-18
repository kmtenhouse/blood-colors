const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const casteSchema= new Schema({
  name:  { type: String, required: true },
  patron: { type: String}, 
  color: {type: mongoose.Schema.Types.ObjectId, ref: 'Color'},
  date: { type: Date, default: Date.now }
});

const Caste = mongoose.model('Caste', casteSchema);

module.exports = Caste;