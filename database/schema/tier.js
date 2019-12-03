"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tierSchema= new Schema({
  name:  { type: String, default: ""},
  displayColor: { type: Schema.Types.ObjectId, ref: 'Color', required: true }, //this one should not be included in the main colors array
  order: { type: Number, default: 0 },
  colors: [{ type: Schema.Types.ObjectId, ref: 'Color' }], 
  date: { type: Date, default: Date.now },
});

const Tier = mongoose.model('Tier', tierSchema);

module.exports = Tier;