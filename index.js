const express = require("express");

require("./connections/mongoConnect");

const app = express();

app.use(express.json());
const port = 3000;

const userRoute = require("./routes/usercontroller");
// const likeRoute = require("./routes/likedController");
const nftRoute = require("./routes/postController");

app.use("/user", userRoute);
// app.use(likeRoute);
app.use("/nft", nftRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
