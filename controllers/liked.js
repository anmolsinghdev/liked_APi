// const likeModel = require("../../models/likecollection");
const likeModel = require("../models/liked");
const jwt = require("jsonwebtoken");

exports.likeController = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const { id, email } = jwt.verify(token, process.env.ACCESS_KEY);
  const user = {
    id,
    email,
  };
  req.user = user;
  const postid = req.params.id;
  const userid = req.user.id;
  let postexist;
  // check if post already exists
  try {
    postexist = await likeModel.exists({
      postid: postid,
    });
  } catch (err) {
    return next(err);
  }
  // create like model if it doesn t exist
  if (!postexist) {
    try {
      const likes = await likeModel.create({
        postid: postid,
        userid: userid,
      });
      res.json({ likes });
    } catch (err) {
      return next(err);
    }
  } else {
    let findpost;
    // try to find post in like model
    try {
      findpost = await likeModel.findOne({ postid: postid });
    } catch (err) {
      next(err);
    }

    /*
      find the like user with email
      Args:
       - email
      
      */
    const finduser = findpost.userid.find((email) => {
      return email === userid;
    });

    if (!finduser) {
      // find and update like
      try {
        const like = await likeModel.findOneAndUpdate(
          { postid: postid },
          {
            $push: {
              userid: userid,
            },
          },
          { new: true }
        );

        res.json({ like, likecount: like.userid.length });
      } catch (err) {
        return next(err);
      }
    } else {
      // remove the user from the like model
      try {
        const unlike = await likeModel.findOneAndUpdate(
          { postid: postid },
          {
            $pull: {
              userid: userid,
            },
          },
          { new: true }
        );

        res.json({ unlike, likecount: unlike.userid.length });
      } catch (err) {
        return next(err);
      }
    }
  }
};
