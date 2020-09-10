"use strict";

var express = require("express");

var app = express();
var port = process.env.PORT || 3500;
app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "text/plain");
  next();
});
app.all("/", function (req, res) {
  console.log(req.query);
  res.end("Succes");
});
app.listen(port, function () {
  console.log("Express listening " + port);
});