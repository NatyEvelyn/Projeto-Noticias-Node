const express = require("express");
const session = require("express-session");
const app = express();
//const noticias= require('./mockup')

//configurações ejs
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./views/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Vy@K9pPqAdy^Jw5_",
    resave: false,
    saveUninitialized: false,
  })
);

module.exports = app;
