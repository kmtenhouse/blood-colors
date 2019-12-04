"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema= new Schema({
  googleId:  { type: Number, required: true},
  tiers: [{ type: Schema.Types.ObjectId, ref: 'Tier' }]
});

const User= mongoose.model('User', userSchema);

module.exports = User;