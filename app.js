const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3500;
const MongoClient = require("mongodb").MongoClient;

const baseUrl =
  "mongodb+srv://parik:piechy8@favnote-bruxz.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(baseUrl, {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to database");
    const db = client.db("social-media-app");
    const usersCollection = db.collection("users");
    app.use(bodyParser.urlencoded({ extended: true }));

    // app.use(function(req, res, next) {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Content-Type", "text/plain");
    //   next();
    // });

    app.get("/", (req, res) => {
      const cursor = db
        .collection("users")
        .find()
        .toArray()
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
      res.send("Hello World!");
    });
    app.post("/login", (req, res) => {
      const cursor = db
        .collection("users")
        .findOne(req.body)
        .then((response) => {
          if (response !== null) {
            console.log("Logged in");
            res.redirect("http://localhost:3000");
          } else {
            console.log("Wrong login or password");
            res.redirect("http://localhost:3000/login");
          }
        })
        .catch((err) => console.error(err));
      // const cursor = db
      //   .collection("users")
      //   .findOne({ login: "mateusz.rosa", password: 123 })
      //   .toArray()
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => console.error(err));
      // res.redirect("http://localhost:3000");
    });

    app.post("/register", (req, res) => {
      console.log("object");
      usersCollection
        .insertOne(req.body)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
      res.redirect("http://localhost:3000");
    });

    app.listen(port, () => {
      console.log("Express listening " + port);
    });
  })
  .catch((error) => console.error(error));
