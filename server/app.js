import express from 'express';
import cors from 'cors';
import session from 'express-session';;
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
export const app = express();
dotenv.config();

app.use(session({
    secret: process.env.SESSION_KEY_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
}))

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});