import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    login: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    friends: {
        type: Array
    },
    date: {
        type: String
    },
    inbox: {
        type: Array
    },
    sent: {
        type: Array
    }
})

export const User = mongoose.model('user', schema);