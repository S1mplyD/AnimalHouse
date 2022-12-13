const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const productsRoute = require("./server/routes/products");
const petsRoute = require("./server/routes/pets");
const usersRoute = require("./server/routes/users");
const leaderboardRoute = require("./server/routes/leaderboard");
const getHolidays = require("./server/APIs/holidays").getHolidays;
const authRoute = require("./server/routes/auth");
const cookieSession = require("cookie-session");
const passport = require("passport");
const imagesRoute = require("./server/routes/images");
const getTrivia = require("./server/APIs/trivia").getTrivia;
const postRoute = require("./server/routes/posts");
const newsRoute = require("./server/routes/news");
const galleryRoute = require("./server/routes/gallery");
const servicesRoute = require("./server/routes/services");
const adsRoute = require("./server/routes/ADs");
const commentsRoute = require("./server/routes/comment");
const cartRoute = require("./server/routes/cart");
const fs = require("fs");

const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());

// Cookies
//TODO: cookieSession is deprecated
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //Un giorno
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

fs.readdir(__dirname, (err, files) => {
  if (err) console.log(err);
  if (!files.includes("public")) {
    fs.mkdir("public", (err) => {
      if (err) console.log(err);
    });
  }
});

app.use("/test", express.static(path.join(__dirname, "test")));
app.use("/games", express.static(path.join(__dirname, "games/build")));
app.use("/", express.static(path.join(__dirname, "frontend/dist")));
app.use("/backoffice", express.static(path.join(__dirname, "backoffice/test")));
app.use(express.static(path.join(__dirname, "public")));
/**
 * API routes
 */
app.use("/api/products", productsRoute);
app.use("/api/pets", petsRoute);
app.use("/api/users", usersRoute);
app.use("/api/leaderboard", leaderboardRoute);
app.use("/api/images", imagesRoute);
app.use("/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/news", newsRoute);
app.use("/api/gallery", galleryRoute);
app.use("/api/services", servicesRoute);
app.use("/api/ads", adsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/carts", cartRoute);
app.get("/api/getHolidays", async (req, res) => {
  const holiday = await getHolidays(
    req.body.day,
    req.body.month,
    req.body.year
  );
  res.json(holiday);
});
app.get("/api/getTrivia/:difficulty", async (req, res) => {
  await getTrivia(req.params.difficulty).then((response) => {
    res.json(response);
  });
});
app.get(/.*/, (req, res) =>
  res.sendFile(__dirname + "/frontend/dist/index.html")
);

mongoose.connect(process.env.MONGODB_PERSONAL_URI);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
