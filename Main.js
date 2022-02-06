//Express Setup\\
const express = require('express'),
  fs = require('fs'),
  app = express(),
  db = require('./src/data/Base'),
  $ = require('jquery'),
  server = { status: false };

const auth = express.Router();
const accounts = express.Router();
const users = express.Router();

app.use("/auth", auth);
app.use("/accounts", accounts);
app.use("/users", users);

db.users.create("A roach", "whatthefuck");

app.listen(8080);

//App\\
app.use(express.static("src"));

app.get("/", (req, res) => {
  if(!server.status) return res.redirect("/server-status");
  res.sendFile(__dirname + "/src/html/Game.html");
});

app.get("/server-status", (req, res) => {
  res.sendFile(`${__dirname}/src/html/server-status.html`);
});

//Users\\
users.get("/login", (req, res) => {
  if(!server.status) return res.redirect("/server-status");
  res.sendFile(`${__dirname}/src/html/Login.html`);
});

users.get("/create", (req, res) => {
  if(!server.status) return res.redirect("/server-status");
  res.sendFile(`${__dirname}/src/html/Create.html`);
});

users.get("/create/:username/:password", (req, res) => {
  if(!server.status) return res.redirect("/server-status");
  if(!db.users.create(req.params["username"], req.params["password"])) {
    res.redirect('/users/create');
  }
});

users.get("/:id", (req, res) => {
  if(!server.status) return res.redirect("/server-status");
  res.sendFile(`${__dirname}/src/html/Account.html`);
});

//Authenticate\\
auth.get("/:username/:password", (req, res) => {
  if(!server.status) return res.redirect("/server-status");
  if(db.users.findByUsername(req.params["username"])) {
    res.redirect("/");
  } else {
    res.redirect("/users/login");
  }
});
