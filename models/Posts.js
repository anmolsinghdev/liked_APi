const Mongoose = require("mongoose");

const postSchema = Mongoose.Schema({
  email: {
    type: String,
  },
  nft: {
    type: String,
  },
  likes: {
    type: Array,
  },
});
const postModel = Mongoose.model("posts", postSchema);
module.exports = postModel;
