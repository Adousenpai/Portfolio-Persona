const router = require('express').Router();
const Contact = require('../models/ContactModel');

router.get('/Contact', (req, res) => {
  Contact.find(function(err, schema) {
    res.render('reception', { contact: schema });
  });
});

module.exports = router;
