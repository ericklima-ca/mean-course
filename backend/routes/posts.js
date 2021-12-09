const Post = require("../models/post");
const router = require("express").Router();
require("../db")();

router.post("/", async (req, res) => {
  const { title, content } = req.body;

  const post = new Post({
    title: title,
    content: content,
  });
  try {
    let { _id } = await post.save();
    console.log(post);
    res.status(201).json({
      message: "ok",
      postId: _id,
    });
  } catch (e) {
    console.log(e);
  }
});

router.get("/", async (_req, res) => {
  try {
    const documents = await Post.find();
    let responseData = {
      message: "ok",
      posts: documents,
    };
    res.status(200).json(responseData);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await Post.deleteOne({ _id: id });
    console.log("Deleted: " + id);
    res.status(201).json({
      message: "ok",
    });
  } catch (e) {
    console.log(e);
  }
});

router.put("/:id", async (req, res, _next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  const result = await Post.updateOne({ _id: req.body.id }, post);
  console.log(result);
  res.status(200).json({ message: "Ok!" });
});

module.exports = router;
