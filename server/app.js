import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
export const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});