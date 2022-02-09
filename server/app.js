const express = require("express");
const app = express();
const port = 80;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

app.use(logger("dev"));

app.use(
  cors({
    origin: "http://codecube.tk.s3-website.ap-northeast-2.amazonaws.com/",
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());

app.get("/world", (req, res) => {
  res.send("world!");
});

app.get("/hello", (req, res) => {
  res
    .cookie("hello", "world!!!", {
      domain: "ec2-52-79-189-93.ap-northeast-2.compute.amazonaws.com",
      secure: false,
    })
    .send("world");
});

app.listen(port, () => {
  console.log(`http server listening on port ${port}`);
});
