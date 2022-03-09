const express = require("express");
const router = express.Router();
const nft = require("../controllers/post");
const likedNft = require("../controllers/liked");

router.post("/create", nft.createNft);
router.delete("/delete", nft.deletenft);
router.post("/like/:id", likedNft.likeController);
router.get("/like/ascending", nft.findLikeAscending);
router.get("/like/descending", nft.findLikeDescending);

module.exports = router;
