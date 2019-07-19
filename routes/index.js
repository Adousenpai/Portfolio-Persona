const express = require("express");
const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");

router.get("/", (req, res) => {
  res.render("welcome");
});

//Project Page
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    name: req.user.name
  });
});

module.exports = router;
