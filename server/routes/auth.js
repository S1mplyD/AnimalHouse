const GoogleStrategy = require("passport-google-oauth20");
const TwitterStrategy = require("passport-twitter");
const router = require("express").Router();
require("dotenv").config({ path: "../../.env" });
const passport = require("passport");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ serviceId: profile.id }).then((currentUser) => {
        if (!currentUser) {
          //Utente non registrato, lo creo
          User.create({
            name: profile.displayName,
            username: profile.displayName,
            serviceId: profile.id,
            mail: profile._json.email,
            profilePicture: profile._json.picture,
          }).then((newUser) => {
            done(null, newUser);
          });
        } else {
          done(null, currentUser);
        }
      });
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_KEY_SECRET,
      callbackURL: "http://localhost:8000/auth/twitter/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ serviceId: profile.id }).then((currentUser) => {
        if (!currentUser) {
          //Utente non registrato, lo creo
          User.create({
            name: profile.displayName,
            username: profile.username,
            serviceId: profile.id,
            profilePicture: profile.photos[0].value,
          }).then((newUser) => {
            done(null, newUser);
          });
        } else {
          done(null, currentUser);
        }
      });
    }
  )
);

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
 * Google
 * Login tramite google
 */

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);
/**
 * Twitter
 * Login tramite twitter
 */
router.get(
  "/twitter",
  passport.authenticate("twitter", { scope: ["profile"] })
);

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

router.post("/login", async (req, res) => {
  User.findOne({ username: req.body.login }).then(async (user) => {
    let decryptedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (decryptedPassword) {
      res.json("login successfull");
    } else {
      res.send("login failed");
    }
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
