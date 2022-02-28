const postModel = require("../models/Posts");
const likeModel = require("../models/liked");
const jwt = require("jsonwebtoken");

//! create a post Function
exports.createpost = async (req, res, next) => {
  try {
    const data = await postModel.create({
      email: req.body.email,
      post: req.body.post,
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

//! create A create Like Post
exports.createpostLike = async (req, res, next) => {
  try {
    const urlpostid = req.params.id;
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const { id, email } = jwt.verify(token, process.env.ACCESS_KEY);
    const user = {
      id,
      email,
    };
    req.user = user;
    const userID = user.id;

    // first Find that Post is exists or Not
    const findLikedPostAndUser = await likeModel.findOne({
      postid: urlpostid,
    });

    // create like model if it doesn t exist
    if (findLikedPostAndUser === null) {
      const createPostAndUser = await likeModel.create({
        postid: urlpostid,
        userid: req.user.id,
      });

      // !Send Response :- Result and Post Details
      res.json({
        result: "created",
        createPostAndUser: createPostAndUser,
      });
    } else {
      const getuserid = findLikedPostAndUser.userid.find((id) => {
        return id === userID;
      });

      if (findLikedPostAndUser.postid === urlpostid && getuserid !== userID) {
        const insertUser = await likeModel
          .findOneAndUpdate(
            {
              postid: urlpostid,
            },
            { $push: { userid: userID } },
            { new: true }
          )
          .select("-__v");

        const likedLength = insertUser.userid.length;
        res.json({
          result: "Liked",
          likedLength: likedLength,
          data: insertUser,
        });
      } else {
        if (findLikedPostAndUser.postid === urlpostid && getuserid === userID) {
          const pullUser = await likeModel
            .findOneAndUpdate(
              {
                postid: urlpostid,
              },
              { $pull: { userid: userID } },
              { new: true }
            )
            .select("-__v");
          const unLikedLength = pullUser.userid.length;
          res.json({
            result: "Unliked",
            likedLength: unLikedLength,
            data: pullUser,
          });
        }
      }
    }
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
};
