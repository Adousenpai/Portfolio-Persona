const router = require('express').Router();
const { ensureAuthenticated } = require('../config/auth');
const Project = require('../models/Project');
const multer = require('multer');
const path = require('path');

//Project Page
router.get('/project', ensureAuthenticated, (req, res) => {
  Project.find(function(err, schema) {
    res.render('project', { project: schema });
  });
});

// Configuration du Storage a image
storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});

// Télécharger l'image
const upload = multer({
  storage: storage
}).single('image');

// Ajouter un projet
router.post('/projectPost', function(req, res) {
  upload(req, res, err => {
    if (err) {
      console.log(err);
      res.render('project', {
        msg: err
      });
    } else {
      console.log(req.file);
      console.log(req.body);
      const projetSchema = new Project(req.body);
      projetSchema.image = req.file.filename;
      projetSchema.save((err, Project) => {
        if (err) {
          return res.json(err);
        } else {
          res.redirect('/admin/dashboard');
        }
      });
    }
  });
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Project.find(function(err, schema) {
    res.render('dashboard', { project: schema });
  });
});

// Page de modification
router.get('/update/:id', ensureAuthenticated, (req, res) => {
  const id = req.params.id;
  Project.findById(id, (err, project) => {
    if (err) {
      res.send(err);
    }
    res.render('MAJproject', { project: project });
  });
});

// Modification de projet
router.post('/update/:id', (req, res) => {
  upload(req, res, err => {
    const id = req.params.id;
    Project.findById(id, (err, project) => {
      project.title = req.body.title;
      project.description = req.body.description;
      project.prev = req.body.prev;
      project.git = req.body.git;
      project.image = req.file.filename;
      project.save(err => {
        if (err) {
          res.send(err);
        }
        req.flash('update', 'Project updated');
        res.redirect('/admin/dashboard');
      });
    });
  });
});

// Supprimer un projet
router.post('/delete', ensureAuthenticated, (req, res) => {
  Project.deleteOne({ _id: req.body.id }).then(response => {
    res.redirect('/admin/dashboard');
  });
});

module.exports = router;
