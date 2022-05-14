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

const upload = multer({ storage: storage });

router.post("/avatar", upload.single("image"), async (req, res) => {
  console.log(req.file);
  if (req.user != null) {
    await User.findOneAndUpdate(
      { username: req.user.username },
      {
        profilePicture: "http://localhost:8000/api/images/" + req.file.filename,
      }
    );
    res.json("immagine profilo aggiornata");
  } else {
    res.json("non loggato");
  }

  res.redirect("/");
});

//TODO aggiungi l'immagine solo all'animale specifico con controllo dell'utente
router.post(
  "/petPhotos/:petid",
  upload.array("images", 10),
  async (req, res) => {
    if (req.user != null) {
      await Pet.findOneAndUpdate(
        { owner: req.user.username },
        {
          profilePicture:
            "http://localhost:8000/api/images/" + req.file.filename,
        }
      );
      res.json("immagine profilo aggiornata");
    } else {
      res.json("non loggato");
    }
    res.json("Immagine caricata con successo");
  }
);

router.get("/:imageName", async (req, res) => {
  console.log(req.user);
  // const image = await fs.readFile(
  //   __foldername + "/server/Images/" + req.params.imageName
  // );
  if (req.user != null) {
    await User.findOne({ username: req.user.username }).then((user) => {
      if (user) {
        res.sendFile(__foldername + "/server/Images/" + req.params.imageName);
      } else {
        res.json("not authorized");
      }
    });
  } else {
    res.json("not logged in");
  }
});
module.exports = router;
