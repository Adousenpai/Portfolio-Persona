const mongoose = require("mongoose");

const projetSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Project", projetSchema);
