const express = require("express");
const app = express();
const port = 80;
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hello", (req, res) => {
  res.send("world");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
