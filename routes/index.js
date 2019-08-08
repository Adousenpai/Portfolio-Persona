const router = require('express').Router();
const Project = require('../models/Project');

router.get('/', (req, res) => {
  Project.find(function(err, schema) {
    res.render('welcome', { project: schema });
  });
});

module.exports = router;
