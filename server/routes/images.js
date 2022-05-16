const multer = require("multer");
const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const User = require("../models/user.model");
const Pet = require("../models/pet.model");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __foldername + "/server/Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

router
  .route("/avatar")
  .get(async (req, res) => {
    if (req.user != null) {
      await User.findOne({ username: req.user.username }).then((user) => {
        if (user) {
          res.send(user.profilePicture);
        } else {
          res.json("not authorized");
        }
      });
    } else {
      res.json("not logged in");
    }
  })
  .post(async (req, res) => {
    if (req.user != null) {
      const upload = multer({ storage: storage }).single("image");
      upload(req, res, async function (err) {
        if (err) {
          console.log(err);
        } else {
          await User.findOne({ username: req.user.username }).then(
            async (user) => {
              await fs.unlink(
                __foldername + "/server/Images/" + user.profilePicture,
                (err) => {
                  if (err) console.log(err);
                }
              );
            }
          );
          await User.findOneAndUpdate(
            { username: req.user.username },
            {
              profilePicture: res.req.file.filename,
            }
          );
        }
      });

      res.redirect(200, "/");
    } else {
      res.json("non loggato");
    }
  });

router
  .route("/petPhotos/:petid")
  .get(async (req, res) => {
    if (req.user != null) {
      await Pet.findOne({ _id: req.params.petid }).then((pet) => {
        if (pet) {
          res.send(pet.pictures);
        }
      });
    }
  })
  .post(async (req, res) => {
    if (req.user != null) {
      const upload = multer({ storage: storage }).array("images", 10);
      upload(req, res, async (err) => {
        if (err) {
          console.log(err);
        } else {
          res.req.files.forEach((element) => {
            console.log(element.filename);
          });
          const imagesAddr = [];
          res.req.files.forEach((element) => {
            imagesAddr.push(element.filename);
          });
          await Pet.findOneAndUpdate(
            { $and: [{ owner: req.user.username }, { _id: req.params.petid }] },
            {
              $push: {
                pictures: {
                  $each: imagesAddr,
                },
              },
            }
          );
          res.redirect(200, "/");
        }
      });
    } else {
      res.json("non loggato");
    }
  });

module.exports = router;
