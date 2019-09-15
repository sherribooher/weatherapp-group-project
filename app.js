var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var session = require("express-session");
var ejs = require("ejs");
var cookieParser = require("cookie-parser");
var db = require("./models");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
var PORT = process.env.PORT || 3000;

db.user.hasMany(db.card_locations);
db.card_locations.belongsTo(db.user);

var axios = require("axios");

var city = "Atlanta";

var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=8e9a4b4545a680355a95d6c810a6f708`;

var sessionStorage = new SequelizeStore({
  db: db.sequelize
});

var app = express();

app.use(cookieParser());

app.use(
  session({
    secret: "appSecret",
    resave: false,
    saveUninitialized: true,
    store: sessionStorage
  })
);

sessionStorage.sync();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  if (req.session.user_id !== undefined) {
    next();
  } else if (req.path === "/signin") {
    next();
  } else if (req.path === "/signup") {
    next();
  } else {
    res.redirect("/signin");
  }
});

app.get("/signup", function(req, res, next) {
  res.render("signup");
});
app.get("/", (req, res, next) => {
  res.redirect("/signup");
});
app.get("/signin", function(req, res, next) {
  res.render("signin", {
    error_message: " "
  });
});

app.post("/signin", function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  db.user.findOne({ where: { email: email } }).then(function(user) {
    if (user != null) {
      bcrypt.compare(password, user.password_hash, function(err, matched) {
        if (matched) {
          // set user_id in the session
          req.session.user_id = user.id;
          // redirect to welcome page
          res.redirect("/dashboard");
        } else {
          // render the login form
          res.render("signin", { error_message: "Bad Password" });
        }
      });
    } else {
      res.render("signin", { error_message: "User Not Found" });
    }
  });
});

app.post("/signup", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;

  var location = req.body.location;
  location = location.substr(0, location.indexOf(","));
  bcrypt.hash(password, 10, function(err, hash) {
    db.user
      .create({
        email: email,
        password_hash: hash,
        firstName: firstName,
        lastName: lastName,
        location: location
      })
      .then(function(user) {
        req.session.user_id = user.id;
        res.redirect("/dashboard");
      });
  });
});

app.get("/dashboard", function(req, res, next) {
  var user_id = req.session.user_id;

  db.user
    .findByPk(user_id)
    .then(function(user) {
      var firstName = user.firstName;
      var location = user.location;
      res.render("dashboard", {
        firstName: firstName,
        location: location
      });
    })
    .then(function(user) {});
});

app.post("/signin", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
});

app.listen(PORT, function() {
  console.log("listening on port 3000...");
});
