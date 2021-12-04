const { resolveSoa } = require("dns");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((_req, res, next) => {
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

app.post('/api/posts', async (req, res, next) => {
  const post = await req.body;
  console.log(post);

  res
    .status(201)
    .json(
      {
        message: "It's ok!"
      }
    )
})

app.get("/api/posts", (_req, res, _next) => {
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
