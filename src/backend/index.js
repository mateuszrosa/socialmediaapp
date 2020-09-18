const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./routes/users");
const express = require("express");
const app = express();

const baseUrl =
  "mongodb+srv://parik:piechy8@favnote-bruxz.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(baseUrl)
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use("/api/users", users);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
