const GoogleStrategy = require("passport-google-oauth20");
const router = require("express").Router();
const TwitterStrategy = require("passport-twitter").Strategy;
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
            mail: profile._json.email,
            serviceId: profile.id,
            profilePicture: profile._json.picture,
            admin: false,
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
            admin: false,
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

//TODO: user already existing
passport.use(
  "local-signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      User.findOne({ username: username }, async (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false);
        } else {
          const encryptedPassword = await bcrypt.hash(password, 10);
          User.create({
            name: req.body.name,
            username: username,
            mail: req.body.mail,
            password: encryptedPassword,
            admin: false,
          }).then((user) => {
            return done(null, user);
          });
        }
      });
    }
  )
);

router.post("/login", passport.authenticate("local"), function (req, res) {
  res.json();
});

router.post("/register", passport.authenticate("local-signup"), (req, res) => {
  res.json();
});
router.route("/isAuthenticated").get(async (req, res) => {
  if (req.user != null) {
    console.log(req.user);
    res.send(req.user);
  } else {
    res.sendStatus(404);
  }
});

// router.post("/register", async (req, res) => {
//
//   User.create({
//     name: req.body.name,
//     username: req.body.username,
//     mail: req.body.mail,
//     password: encryptedPassword,
//     admin: false,
//   }).then((user) => {

//   });
//   // req.login();
//   res.json("registrazione avvenuta con successo");
// });

// passport.use('local-signup', new LocalStrategy({
//   // by default, local strategy uses username and password, we will override with email
//   usernameField : 'email',
//   passwordField : 'password',
//   passReqToCallback : true // allows us to pass back the entire request to the callback
// },
// function(req, email, password, done) {

//   // find a user whose email is the same as the forms email
//   // we are checking to see if the user trying to login already exists
//   User.findOne({ 'local.email' :  email }, function(err, user) {
//       // if there are any errors, return the error
//       if (err)
//           return done(err);

//       // check to see if theres already a user with that email
//       if (user) {
//           return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//       } else {

//           // if there is no user with that email
//           // create the user
//           var newUser            = new User();

//           // set the user's local credentials
//           newUser.local.email    = email;
//           newUser.local.password = newUser.generateHash(password);

//           // save the user
//           newUser.save(function(err) {
//               if (err)
//                   throw err;
//               return done(null, newUser);
//           });
//       }

// }));

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

router.get("/logout", (req, res) => {
  try {
    req.logout();
    res.status(200).redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
