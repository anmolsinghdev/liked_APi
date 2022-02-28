const Mongoose = require("mongoose");

const likedSchema = Mongoose.Schema({
  postid: {
    type: String,
  },
  userid: {
    type: Array,
  },
});
const likedModel = Mongoose.model("likes", likedSchema);
module.exports = likedModel;
