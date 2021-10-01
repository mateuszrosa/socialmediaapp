import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});