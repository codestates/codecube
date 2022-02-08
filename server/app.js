const express = require("express");
const fs = require("fs");
const https = require("https");
const app = express();
const port = 443;
const cors = require("cors");
const cookieParser = require("cookie-parser");

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true,
    secure: true,
    sameSite: "none",
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hello", (req, res) => {
  res.cookie("hello", "world!!!").send("world");
});

https.createServer(options, app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});
