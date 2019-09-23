const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema= new Schema({
  hex:  { type: String, required: true },
  name:  { type: String, default: "" },
  contrastColor:  { type: String, required: true },
  tier: { type: Schema.Types.ObjectId, ref: 'Tier' },
  date: { type: Date, default: Date.now },
});

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;