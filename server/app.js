const express = require("express");
const app = express();
const port = 80;
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://codecube.tk.s3-website.ap-northeast-2.amazonaws.com/",
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hello", (req, res) => {
  res.cookie("hello", "world!!!").send("world");
});

app.listen(port, () => {
  console.log(`http server listening on port ${port}`);
});
