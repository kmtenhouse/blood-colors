"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema= new Schema({
  googleId:  { type: Number, required: true},
  lastLogin: { type: Date, default: Date.now },
});

const User= mongoose.model('User', userSchema);

module.exports = User;