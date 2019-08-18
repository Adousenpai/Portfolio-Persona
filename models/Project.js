const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  prev: {
    type: String,
    required: true
  },
  git: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projetSchema);
