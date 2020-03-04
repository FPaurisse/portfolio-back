const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  primaryColor: {
    type: String,
    required: true,
  },
  secondaryColor: {
    type: String,
    required: true,
  },
  optionalColor: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  mockup: {
    type: String,
    required: true,
  },
  context: {
    type: String,
    required: true,
  },
  tools: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
},
{ timestamps: true });

const Work = mongoose.model('Work', workSchema);

module.exports = Work;
