const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const port = 3000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// Passport config
require("./config/passport")(passport);

// Env config
dotenv.config();

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: "cat",
    resave: true,
    saveUninitialized: true
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variable
app.use((req, res, next) => {
  res.locals.succes_msg = req.flash("succes_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");

  next();
});
// Serveur
app.listen(port, () => console.log(`Example app listening on port ${port} !`));

// Link CSS
app.use(express.static("public"));

//Middleware
app.use(express.json());

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/register"));
app.use("/users", require("./routes/login"));

// app.use("/users", require("./routes/users"));

// Connection to Mongo Db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to db :)");
});
