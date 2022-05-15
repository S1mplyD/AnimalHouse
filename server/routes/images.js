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

router.post("/avatar", async (req, res) => {
  if (req.user != null) {
    const upload = multer({ storage: storage }).single("image");
    upload(req, res, async function (err) {
      if (err) {
        console.log(err);
      } else {
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

//TODO aggiungi l'immagine solo all'animale specifico con controllo dell'utente
router.post("/petPhotos/:petid", async (req, res) => {
  if (req.user != null) {
    const upload = multer({ storage: storage }).array("images", 10);
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
      } else {
        res.req.files.forEach((element) => {
          console.log(element.filename);
        });
        // await Pet.findOneAndUpdate(
        //   { $and: [{ owner: req.user.username }, { _id: req.params.petid }] },
        //   {
        //     profilePicture: "http://localhost:8000/api/images/" + res.req.files,
        //   }
        // );
      }
    });

    res.json("immagine profilo aggiornata");
  } else {
    res.json("non loggato");
  }
});

router.get("/avatar", async (req, res) => {
  if (req.user != null) {
    await User.findOne({ username: req.user.username }).then((user) => {
      if (user) {
        res.sendFile(__foldername + "/server/Images/" + user.profilePicture);
      } else {
        res.json("not authorized");
      }
    });
  } else {
    res.json("not logged in");
  }
});
module.exports = router;
