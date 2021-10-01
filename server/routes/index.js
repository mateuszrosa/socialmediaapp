import express from 'express';
import { post, user } from '../controllers';

export const router = express.Router();

//LOGGING
router.get('/user/login', user.login);

//REGISTER
router.post('/user/register', user.register);

//GET USERS
router.get('/users', user.getUsers);

//GET USER INFO BY USERID
router.get('/user', user.getUser);

//ADD TO FRIENDS
router.put('/user/friend', user.addFriend);

//REMOVE FRIEND 
router.put('/user/friend/remove', user.removeFriend);

// SEND MESSAGE
router.post('/messages', user.sendMessage);

//REMOVE MESSAGE
router.delete('/messages', user.removeMessage);

// GET ALL POSTS
router.get('/posts', post.getPosts);

//ADD NEW POST
router.post('/post', post.addPost);

// REMOVE POST
router.delete('/post', post.removePost);

// EDIT POST
router.put('/post/edit', post.editPost);

// ADD LIKE TO POST
router.put('/post/like', post.addLikeToPost);

//ADD COMMENT TO POST
router.put('/post/comment', post.addComment);

//REMOVE COMMENT
router.delete('/post/comment/delete', post.removeComment);

//EDIT COMMENT
router.put('/post/comment/edit', post.editComment);

// GET SINGLE POST
router.get('/post', post.getPost);

//  GET ALL POSTS BY USER
router.get('/posts/user', post.getUsersPosts);