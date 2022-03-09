const Mongoose = require("mongoose");

const likedSchema = Mongoose.Schema({
  nftid: {
    type: String,
  },
  userid: {
    type: String,
  },
});

const likedModel = Mongoose.model("likes", likedSchema);
module.exports = likedModel;
