// const likeModel = require("../../models/likecollection");
const likeModel = require("../models/liked");
const NFT = require("../models/Posts");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

exports.likeController = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const { id, email } = jwt.verify(token, process.env.ACCESS_KEY);
  const user = {
    id,
    email,
  };
  req.user = user;
  const urlNFTId = req.params.id;
  const userid = req.user.id;

  const fetchNFT = await likeModel.findOne({
    nftid: urlNFTId,
    userid: userid,
  });

  if (fetchNFT === null) {
    await likeModel.create({
      nftid: urlNFTId,
      userid: userid,
    });
    const findNFT = await NFT.findByIdAndUpdate(
      { _id: urlNFTId },
      { $set: { likes: await countLike(urlNFTId) } },
      { new: true }
    );
    console.log("findNFT", findNFT);
    res.json({
      success: true,
      status: 201,
      message: " message.SUCCESSFULLY_SAVED",
      // data: await countLike(urlNFTId),
      NFT: findNFT,
    });
  } else if (
    fetchNFT.userid.includes(userid) &&
    fetchNFT.nftid.includes(urlNFTId)
  ) {
    const query = {
      userid: userid,
      nftid: urlNFTId,
    };
    const result = await likeModel.deleteOne(query);
    const findNFT = await NFT.findByIdAndUpdate(
      { _id: urlNFTId },
      { $set: { likes: await countLike(urlNFTId) } },
      { new: true }
    );
    if (result.deletedCount === 1) {
      res.json({
        success: true,
        status: 201,
        message: "message.UPDATED_SUCCESSFULLY",
        NFT: findNFT,
      });
    }
  } else {
    await likeModel.create({
      nftid: urlNFTId,
      userid: userid,
    });
    const findNFT = await NFT.findById(urlNFTId);
    res.json({
      success: true,
      status: 201,
      message: "message.SUCCESSFULLY_SAVED",
      data: await countLike(urlNFTId),
      NFT: findNFT,
    });
  }
};
async function countLike(urlNFTId) {
  let like = await likeModel.aggregate([
    { $match: { nftid: urlNFTId } },
    {
      $count: "Likes",
    },
  ]);
  return like;
}
