const { resolveSoa } = require("dns");
const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use((_req, _res, next) => {
  console.log("First middleware");
  next();
});

app.use("/api/posts", (_req, res, _next) => {
  const posts = [
    {
      id: "1293192csas",
      title: "The first",
      content: "The first content",
    },
    {
      id: "1casa9c123",
      title: "The second",
      content: "The second content",
    },
  ];

  res.status(200).json({
    message: "It's ok",
    posts: posts,
  });
});

module.exports = app;
