const express = require("express");

require("./connections/mongoConnect");

const app = express();

app.use(express.json());
const port = 3000;

const userRoute = require("./routes/usercontroller");
// const likeRoute = require("./routes/likedController");
const postRoute = require("./routes/postController");

app.use("/user", userRoute);
// app.use(likeRoute);
app.use(postRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
