const express = require("express");
const app = express();
const port = process.env.PORT || 3500;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "text/plain");
  next();
});

app.all("/", (req, res) => {
  console.log(req.query);
  res.end("Succes");
});

app.listen(port, () => {
  console.log("Express listening " + port);
});
