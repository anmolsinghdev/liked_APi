const express = require("express");
const router = express.Router();
const post = require("../controllers/post");
const likedpost = require("../controllers/liked");

router.post("/post", post.createpost);
router.post("/post/like/:id", likedpost.likeController);

module.exports = router;
