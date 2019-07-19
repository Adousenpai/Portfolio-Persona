const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Login Handle /////////////////////////////////////////////////////////////////////////
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Log out handlle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("succes_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
