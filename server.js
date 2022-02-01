const express = require('express'),
  fs = require('fs'),
  app = express(),
  db = require('./src/Data/Base');

//Routers\\
const auth = express.Router();
const accounts = express.Router();
const users = express.Router();

app.use("/auth", auth);
app.use("/accounts", accounts);
app.use("/users", users);

app.listen(8080);

db.users.create("JoeMama", "Pass");
console.log(db.all());

//Routes\\


//App\\
app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/html/scn.html");
});

app.get("/server-status", (req, res) => {
  res.sendFile(`${__dirname}/src/html/server-status.html`);
});

//Users\\
users.get("/login", (req, res) => {
  res.sendFile(`${__dirname}/src/html/Login.html`);
});

users.get("/create", (req, res) => {
  res.sendFile(`${__dirname}/src/html/Create.html`);
});

//Auth\\
auth.get("/:username/:password", (req, res) => {
  if(db.users.find(req.params["username"])) {
    res.redirect("/");
  } else {
    res.redirect("/users/login");
  }
});

users.get("/create/:username/:password", (req, res) => {
  db.users.create(req.params["username"], req.params["password"]);
});

users.get("/:id", (req, res) => {
  res.send("");
});
