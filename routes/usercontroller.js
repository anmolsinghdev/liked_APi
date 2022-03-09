const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

router.post("/create", user.createusers);
router.delete("/delete", user.deleteuser);
router.post("/login", user.loginuser);

module.exports = router;
