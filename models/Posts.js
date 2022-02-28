const Mongoose = require("mongoose");

const postSchema = Mongoose.Schema({
  email: {
    type: String,
  },
  post: {
    type: String,
  },
});
const postModel = Mongoose.model("posts", postSchema);
module.exports = postModel;
