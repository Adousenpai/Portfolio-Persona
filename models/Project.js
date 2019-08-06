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
  },
  Categorie: {
    type: Schema.Types.ObjectId,
    ref: 'Categorie'
  }
});
const Project = mongoose.model('Project', projetSchema);
module.exports = Project;
