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
  })); // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Content-Type", "text/plain");
  //   next();
  // });

  app.get("/", function (req, res) {
    var cursor = db.collection("users").find().toArray().then(function (res) {
      return console.log(res);
    })["catch"](function (err) {
      return console.error(err);
    });
    res.send("Hello World!");
  });
  app.post("/login", function (req, res) {
    var cursor = db.collection("users").findOne(req.body).then(function (response) {
      if (response !== null) {
        console.log("Logged in");
        res.redirect("http://localhost:3000");
      } else {
        console.log("Wrong login or password");
        res.redirect("http://localhost:3000/login");
      }
    })["catch"](function (err) {
      return console.error(err);
    }); // const cursor = db
    //   .collection("users")
    //   .findOne({ login: "mateusz.rosa", password: 123 })
    //   .toArray()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.error(err));
    // res.redirect("http://localhost:3000");
  });
  app.post("/register", function (req, res) {
    console.log("object");
    usersCollection.insertOne(req.body).then(function (res) {
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
});