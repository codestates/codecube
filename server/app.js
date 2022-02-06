const express = require("express");
const app = express();
const port = 80;
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hello", (req, res) => {
  res.cookie("hello", "world").send("world");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
