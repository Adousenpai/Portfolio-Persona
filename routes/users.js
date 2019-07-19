const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

// Register Handle ///////////////////////////////////////////////////////////////////////
router.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, password, password2 } = req.body;
  let errors = [];
  console.log(errors);
  //Check required fields
  if (!name || !email || !password || password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // Check password match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  // Check pass Length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 1) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // Validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        // User exist
        errors.push({ msg: "Email already exist" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            console.log(newUser);

            // Save user in database
            newUser
              .save()
              .then(user => {
                req.flash(
                  "succes_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }
});

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
