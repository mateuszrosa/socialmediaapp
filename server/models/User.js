import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    login: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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

schema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
        for (let key in error.keyValue) {
            if (key === 'email') {
                error.errors = { message: 'That email is already used' }
            } else if (key === 'login') {
                error.errors = { message: 'That login is already used' }
            }
        }
    }
    next(error);
})

export const User = mongoose.model('user', schema);