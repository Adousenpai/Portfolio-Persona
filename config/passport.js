const Localstrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Load user model
const User = require("../models/User");

module.exports = passport => {
  passport.use(
    new Localstrategy({ usernameField: "email" }, (email, password, done) => {
      //Match user
      User.findOne({ email: email })
        .then(user => {
          console.log(user);
          if (!user) {
            return done(null, false, {
              message: "that email is not registered"
            });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
