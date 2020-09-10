"use strict";

var express = require("express");

var app = express();
var port = process.env.PORT || 3500;
app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.post("/", function (req, res) {
  console.log(req.query);
});
app.listen(port, function () {
  console.log("Express listening " + port);
});