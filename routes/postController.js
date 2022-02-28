const express = require("express");
const router = express.Router();
const post = require("../controllers/post");

router.post("/post", post.createpost);
router.post("/post/:id/like", post.createpostLike);

module.exports = router;
