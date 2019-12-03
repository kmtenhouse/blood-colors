"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema= new Schema({
  hex:  { type: String, required: true, match: /^#[0-9a-fA-F]{6}$/ },
  name:  { type: String, default: "" },
  contrastColor:  { type: String, required: true, match: /^#[0-9a-fA-F]{6}$/ },
  tier: { type: Schema.Types.ObjectId, ref: 'Tier' },
  date: { type: Date, default: Date.now },
});

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;