const GoogleStrategy = require("passport-google-oauth20");
const TwitterStrategy = require("passport-twitter");
const router = require("express").Router();
require("dotenv").config({ path: "../../.env" });
const passport = require("passport");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local");

/**
 * Autenticazione con google
 */
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
 * Autenticazione con twitter
 */

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

/**
 * Autenticazione normale
 */

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ mail: username }, async (err, user) => {
      if (err) {
        console.log(err);
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

router.post("/login", passport.authenticate("local"), function (req, res) {
  res.json();
});

router.post("/register", async (req, res) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  User.create({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    mail: req.body.mail,
    password: encryptedPassword,
  });
  res.json("registrazione avvenuta con successo");
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
