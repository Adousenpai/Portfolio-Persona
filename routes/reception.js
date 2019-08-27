const router = require('express').Router();
const { ensureAuthenticated } = require('../config/auth');
const Contact = require('../models/ContactModel');

router.get('/reception', ensureAuthenticated, (req, res) => {
  Contact.find(function(err, schema) {
    res.render('reception', { contact: schema });
  });
});

// Supprimer un message
router.post('/deletemsg', (req, res) => {
  Contact.deleteOne({ _id: req.body.id }).then(response => {
    res.redirect('/admin/reception');
  });
});

module.exports = router;
