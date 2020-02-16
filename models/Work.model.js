const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  title: {
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
