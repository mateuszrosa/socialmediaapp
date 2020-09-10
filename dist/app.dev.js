"use strict";

var express = require("express");

var app = express();

var bodyParser = require("body-parser");

var port = process.env.PORT || 3500;

var MongoClient = require("mongodb").MongoClient;

var baseUrl = "mongodb+srv://parik:piechy8@favnote-bruxz.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(baseUrl, {
  useUnifiedTopology: true
}).then(function (client) {
  console.log("Connected to database");
  var db = client.db("social-media-app");
  var usersCollection = db.collection("users");
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.get("/", function (req, res) {
    res.send("Hello World!");
  });
  app.all("/", function (req, res) {
    var _req$body = req.body,
        login = _req$body.login,
        password = _req$body.password;
    usersCollection.insertOne({
      login: login,
      password: password
    }).then(function (res) {
      return console.log(res);
    })["catch"](function (err) {
      return console.error(err);
    });
    res.redirect("http://localhost:3000");
  });
  app.listen(port, function () {
    console.log("Express listening " + port);
  });
})["catch"](function (error) {
  return console.error(error);
}); // app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Content-Type", "text/plain");
//   next();
// });