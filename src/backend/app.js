import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import MongoClient from "mongodb"

const port = process.env.PORT || 3500;

const app = express();
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
    app.use(bodyParser.json())

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

    app.post("/register", async (req, res) => {
      let user = await usersCollection.findOne({ login: req.query.login });
      if (user) {
        return res.status(400).send("That user already exists" );
      } else {
        usersCollection
          .insertOne(req.query)
          .then((response) => console.log(response));
      }
    });

    app.post("/post", (req, res) => {
      const{userId, text} = req.body;
      const cursor = db
        .collection("posts")
        .insertOne({userId,text})
        .then((response) => {
          console.log(req.body)
          res.json(req.body)
        })
    })

    app.listen(port, () => {
      console.log("Express listening " + port);
    });
  })
  .catch((error) => console.error(error));
