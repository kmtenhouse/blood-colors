const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tierSchema= new Schema({
  name:  { type: String, required: true },
  order: { type: Number, default: 0 },
  displayColor: { type: Schema.Types.ObjectId, ref: 'Color' }, //this one should not be included in the main colors array
  colors: [{ type: Schema.Types.ObjectId, ref: 'Color' }], 
  date: { type: Date, default: Date.now },
});

const Tier = mongoose.model('Tier', tierSchema);

module.exports = Tier;