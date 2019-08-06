const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: String,
  Sujet: String,
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);
