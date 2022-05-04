const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json([]));
const userController = require("../Controllers/user")


app.post("/register", userController.register)

app.post("/login", userController.login)


module.exports = app;