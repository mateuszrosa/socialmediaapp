import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { validateEmail } from './validators';
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
        select: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Email is not correct']
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

schema.pre('save', function (next) {
    const user = this;
    console.log(user);
    const salt = bcrypt.genSaltSync(10);
    if (!user.isModified('password')) return next();
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
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
    } else if (error) {
        error.errors = { message: error.message.split(": ")[2] }
    }
    next(error);
})

export const User = mongoose.model('user', schema);