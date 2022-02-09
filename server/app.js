const express = require("express");
const app = express();
const port = 80;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

app.use(logger("dev"));

app.use(
  cors({
    origin: "https://codecube.tk",
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/world", (req, res) => {
  res.send("world!");
});

app.get("/hello", (req, res) => {
  res
    .cookie("hello", "world!!!", {
      domain: "codecube.tk",
      secure: true,
      sameSite: "none",
    })
    .send("world");
});

app.listen(port, () => {
  console.log(`http server listening on port ${port}`);
});
