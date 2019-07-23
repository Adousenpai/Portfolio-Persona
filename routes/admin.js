const express = require("express");
const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const Project = require("../models/Project");
const multer = require("multer");
const path = require("path");

//Project Page
router.get("/project", (req, res) => {
  res.render("project", {
    // name: req.user.name
  });
});

// Set Storage engine
storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init upload
const upload = multer({
  storage: storage
}).single("image");

// Admin Handle
router.post("/projectPost", function(req, res) {
  upload(req, res, err => {
    if (err) {
      console.log(err);
      res.render("project", {
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
          res.redirect("/");
        }
      });
    }
  });
});

module.exports = router;
