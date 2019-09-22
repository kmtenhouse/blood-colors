const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exampleSchema= new Schema({
  text:  { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Example = mongoose.model('Example', exampleSchema);

module.exports = Example;