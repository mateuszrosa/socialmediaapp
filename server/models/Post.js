import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: {
        type: String
    },
    text: {
        type: String
    },
    login: {
        type: String
    },
    likes: {
        type: Number
    },
    likedBy: {
        type: Array
    },
    date: {
        type: String
    },
    comments: {
        type: Array
    }
});

export const Post = mongoose.model('post', schema);