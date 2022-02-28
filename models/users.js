const Mongoose = require("mongoose");

const userschema = Mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
const userModel = Mongoose.model("users", userschema);
module.exports = userModel;
