const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { response } = require("express");
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
    //   console.log("Time:", Date.now());
    //   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    //   res.header("Content-Type", "text/plain");
    //   next();
    // });

    app.use(cors());

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.post("/login", (req, res) => {
      const cursor = db
        .collection("users")
        .findOne(req.query)
        .then((response) => {
          if (response !== null) {
            console.log("Logged in");
            res.json({ userId: response._id });
          } else {
            res.sendStatus(500);
          }
        })
        .catch((err) => console.error(err));
    });

    app.post("/register", (req, res) => {
      usersCollection
        .insertOne(req.query)
        .then((response) => {
          console.log("You registered account");
          res.json(response.ops);
        })
        .catch((err) => console.error(err));
    });

    app.listen(port, () => {
      console.log("Express listening " + port);
    });
  })
  .catch((error) => console.error(error));
