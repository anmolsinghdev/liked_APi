const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createusers = async (req, res, next) => {
  try {
    const data = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.send(data);
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
};
exports.deleteuser = async (req, res, next) => {
  try {
    const data = await userModel.deleteMany({});
    res.send(data);
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
};

exports.loginuser = async (req, res, next) => {
  try {
    const inputemail = req.body.email;
    const inputpassword = req.body.password;
    const { _id, email, password } = await userModel.findOne({
      email: inputemail,
    });

    if (inputemail === email && inputpassword === password) {
      const jwtsign = jwt.sign(
        { email: inputemail, id: _id },
        process.env.ACCESS_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.json({
        data: {
          id: _id,
          email: email,
          password: password,
          token: jwtsign,
        },
      });
    } else {
      res.json({
        err: "doesn't Matched",
      });
    }
  } catch (err) {
    res.json({
      error: err,
    });
  }
};
