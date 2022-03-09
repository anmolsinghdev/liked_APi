const postModel = require("../models/Posts");
// const likeModel = require("../models/liked");
// const jwt = require("jsonwebtoken");

//! create a post Function
exports.createNft = async (req, res, next) => {
  try {
    const data = await postModel.create({
      email: req.body.email,
      nft: req.body.nft,
    });
    res.send({
      data: data,
    });
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
};
exports.deletenft = async (req, res, next) => {
  try {
    const data = await postModel.deleteMany({});
    res.send({
      data: data,
    });
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
};

exports.findLikeAscending = async (req, res, next) => {
  try {
    const data = await postModel.find().sort({ likes: 1 }).select("-__v");
    res.send({
      data: data,
    });
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
};
exports.findLikeDescending = async (req, res, next) => {
  try {
    const data = await postModel.find().sort({ likes: -1 }).select("-__v");
    res.send({
      data: data,
    });
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
};
