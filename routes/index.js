const router = require("express").Router();
const Project = require("../models/Project");

router.get("/", (req, res) => {
  Project.find(function(err, schema) {
    res.render("./welcome", { tutu: schema });
  });
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;
