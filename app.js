const express = require("express");
const app = express();
const port = process.env.PORT || 3500;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log(req.query);
});

app.listen(port, () => {
  console.log("Express listening " + port);
});
