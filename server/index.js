import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import MongoClient from "mongodb";
import pkg from 'mongodb';
import { post, user } from './controllers';
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
    app.get('/user/login', (req, res) => user.login(req, res, usersCollection));

    //REGISTER
    app.post('/user/register', (req, res) => user.register(req, res, usersCollection));

    //GET USERS
    app.get('/users', (req, res) => user.getUsers(req, res, usersCollection));

    // GET USER INFO BY USERID
    app.get('/user', (req, res) => user.getUser(req, res, usersCollection));

    //ADD TO FRIENDS
    app.put('/user/friend', (req, res) => user.addFriend(req, res, usersCollection));

    //REMOVE FRIEND 
    app.put('/user/friend/remove', (req, res) => user.removeFriend(req, res, usersCollection));

    ////////////
    //MESSAGES//
    ////////////

    //SEND MESSAGE
    app.post('/messages', (req, res) => user.sendMessage(req, res, usersCollection));

    // REMOVE MESSAGE
    app.delete('/messages', (req, res) => user.removeMessage(req, res, usersCollection));

    /////////////////
    // POST ACTIONS//
    /////////////////

    // GET ALL POSTS
    app.get('/posts', (req, res) => post.getPosts(req, res, postsCollection));

    //  GET ALL POSTS BY USER
    app.get('/posts/user', (req, res) => post.getUsersPosts(req, res, postsCollection));

    // ADD NEW POST
    app.post('/post', (req, res) => post.addPost(req, res, postsCollection))

    // REMOVE POST
    app.delete('/post', (req, res) => post.removePost(req, res, postsCollection));

    // EDIT POST
    app.put('/post/edit', (req, res) => post.editPost(req, res, postsCollection));

    // ADD LIKE TO POST
    app.put('/post/like', (req, res) => post.addLikeToPost(req, res, postsCollection));

    //ADD COMMENT TO POST
    app.put('/post/comment', (req, res) => post.addComment(req, res, postsCollection));

    //REMOVE COMMENT
    app.delete('/post/comment/delete', (req, res) => post.removeComment(req, res, postsCollection));

    //EDIT COMMENT
    app.put('/post/comment/edit', (req, res) => post.editComment(req, res, postsCollection));

    // GET SINGLE POST
    app.get('/post', async (req, res) => post.getPost(req, res, postsCollection));

    app.listen(port, () => {
      console.log("Express listening " + port);
    });
  })
  .catch((error) => console.error(error));