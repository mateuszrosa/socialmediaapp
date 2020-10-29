import dotenv from 'dotenv'
import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import MongoClient from "mongodb";
import pkg from 'mongodb';
const { ObjectId } = pkg;


dotenv.config();

const port = process.env.PORT || 3500;

const app = express();
MongoClient.connect(process.env.NODE_DATABASE, {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to database");
    const db = client.db("social-media-app");
    const usersCollection = db.collection("users");
    const postsCollection = db.collection("posts");

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())

    app.use(cors());

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    /////////////////
    // USER ACTIONS//
    /////////////////

    //LOGGING
    app.post("/user/login", (req, res) => {
      usersCollection
        .findOne(req.query)
        .then((response) => {
          if (response !== null) {
            console.log("Logged in");
            res.json(response);
          } else {
            res.sendStatus(500);
          }
        })
        .catch((err) => console.error(err));
    });

    //REGISTER
    app.post("/user/register", async (req, res) => {
      let user = await usersCollection.findOne({ login: req.body.login });
      if (user) {
        return res.status(400).send("That user already exists" );
      } else {
        usersCollection
          .insertOne(req.body)
          .then((response) => res.json(...response.ops));
      }
    });

    //GET USERS
    app.get("/users", (req,res) => {
      usersCollection
        .find()
        .toArray()
        .then(response => res.json(response))
        .catch(err => console.log(err))
    })

    // GET USER INFO BY USERID
    app.get('/user', async(req,res) => {
      const {userId} = req.query;
      await usersCollection
      .findOne(
        {_id: ObjectId(userId)}
      )
      .then(response => {
        res.json(response)
      })
      .catch(err => console.log(err))
    })

    //ADD TO FRIENDS
    app.put('/user/friend', async (req,res) => {
      const {userId, friendId} = req.query;
      let user;
      let friendUser;
      await usersCollection
        .findOneAndUpdate(
          { _id: ObjectId(userId)},
          { $push: {"friends" : friendId}},
          {returnOriginal: false, upsert: true})
          .then((response) => {
            user = response.value
          })
          .catch(err => console.log(err));
      await usersCollection
          .findOneAndUpdate(
            { _id: ObjectId(friendId)},
            { $push: {"friends" : userId}},
            {returnOriginal: false, upsert: true})
            .then((response) => {
              friendUser = response.value;
            })
            .catch(err => console.log(err));
      res.json({
        user,
        friendUser
      })
    })

    //REMOVE FRIEND 
    app.put('/user/friend/remove', async (req,res) => {
      const {userId, friendId} = req.query;
      let user;
      let friendUser;
      await usersCollection
        .findOneAndUpdate(
          { _id: ObjectId(userId)},
          { $pull: {"friends" : friendId}},
          {returnOriginal: false, upsert: true})
          .then((response) => {
            user = response.value
          })
          .catch(err => console.log(err));
      await usersCollection
          .findOneAndUpdate(
            { _id: ObjectId(friendId)},
            { $pull: {"friends" : userId}},
            {returnOriginal: false, upsert: true})
            .then((response) => {
              friendUser = response.value;
            })
            .catch(err => console.log(err));
      res.json({
        user,
        friendUser
      })
    })

    ////////////
    //MESSAGES//
    ////////////

    //SEND MESSAGE
    app.post('/messages', async (req, res) => {
      const {senderId, senderName, text, to, date} = req.query;
      await usersCollection
        .findOneAndUpdate(
          {login: to},
          {$push: {"inbox": {
            senderId,
            senderName,
            text,
            to,
            date,
            id: new ObjectId()
          }}},
          {returnOriginal: false, upsert: true})
        .then(response => console.log('Send message'))
        .catch(err =>  console.log(err))
      await usersCollection
          .findOneAndUpdate(
            {_id: ObjectId(senderId)},
            {$push: {"sent": {
              senderId,
              senderName,
              text,
              to,
              date,
              id: new ObjectId()
            }}},
            {returnOriginal: false, upsert: true})
          .then(response => { res.json(response.value)})
          .catch(err => console.log(err));
      })

    //REMOVE MESSAGE
    app.delete('/messages', async(req,res) => {
      const {id, login, box} = req.query;
      await usersCollection
        .findOneAndUpdate(
          {login},
          {$pull: { [box] :
            {id: ObjectId(id)}
          }},
          {returnOriginal: false, upsert: true}
          )
        .then(response => {
          res.json(response.value)
        })
        .catch(err => console.log(err))
    })

    /////////////////
    // POST ACTIONS//
    /////////////////

    // GET ALL POSTS
    app.get('/posts', async (req,res) => {
      await postsCollection
       .find()
       .toArray()
       .then((response) => {
         res.send(response)
       })
       .catch(err => console.log(err))
     })

    //  GET ALL POSTS BY USER
    app.get('/posts/user', async(req, res) => {
      const {userId, login} = req.query;
      await postsCollection
      .find({userId})
      .toArray()
      .then(response => res.json(response))
      .catch(err => console.log(err))
    })

    // ADD NEW POST
    app.post("/post", (req, res) => {
      const{userId, text, login, likes, likedBy, date, comments} = req.body;
      postsCollection
        .insertOne({userId,text, login, likes, likedBy, date, comments})
        .then((response) => {
          res.json(...response.ops)
        })
    })

    // REMOVE POST
    app.delete('/post', async (req, res) => {
      const {id} = req.query;
      await postsCollection
      .findOneAndDelete(
        {_id: ObjectId(id)}
      )
      .then((response) => {
        res.json(response.value)
      })
      .catch(err => console.log(err))
    })

    // EDIT POST
    app.put('/post/edit', async(req,res) => {
      const {id,text} = req.query;
      await postsCollection
      .findOneAndUpdate(
        {_id: ObjectId(id)},
        {$set: {"text": text}},
        {returnOriginal: false, upsert: true})
        .then((response) => {
          res.json(response.value)
        })
        .catch(err => console.log(err))
    })

    // ADD LIKE TO POST
    app.put('/post/like', async (req,res) => {
      const {id, userId} = req.query;
      await postsCollection
      .findOneAndUpdate(
        { _id: ObjectId(id)},
        { $inc: { "likes" : 1 } , $push: {"likedBy" : userId}},
        {returnOriginal: false, upsert: true})
        .then((response) => {
          console.log(response.value)
          res.json(response.value)
        })
        .catch(err => console.log(err))
    })

    //ADD COMMENT TO POST
    app.put("/post/comment", async(req,res) => {
      const {id, userId, text, login, date} = req.query;
      await postsCollection
      .findOneAndUpdate(
        {_id: ObjectId(id)},
        {$push: {"comments" : {
          id: new ObjectId(),
          userId,
          text,
          login,
          date
        }}},
        {returnOriginal: false, upsert: true}
      )
      .then(response => {
        res.json(response.value)
      })
      .catch(err => console.log(err))
    })

    // GET SINGLE POST
    app.get("/post", async(req,res) => {
      const {id} = req.query;
      await postsCollection
      .findOne(
        {_id: ObjectId(id)}
      )
      .then(response => {
        res.json(response)
      })
      .catch(err => console.log(err))
    })

    app.listen(port, () => {
      console.log("Express listening " + port);
    });
  })
  .catch((error) => console.error(error));
