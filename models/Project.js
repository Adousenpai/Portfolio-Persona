const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projetSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  prev: String,
  git: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projetSchema);
