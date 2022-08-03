const multer = require("multer");
const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const User = require("../models/user.model");
const Pet = require("../models/pet.model");

/**
 * Storage delle immagini con regole sul come salvarle
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __foldername + "/server/Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

/**
 * Router per la gestione delle immagini profilo degli utenti
 */
router
  .route("/avatar")
  /**
   * GET
   * Ritorna l'immagine profilo di un utente
   */
  .get(async (req, res) => {
    try {
      if (req.user != null) {
        await User.findOne({ username: req.user.username }).then((user) => {
          if (user) {
            res.send(user.profilePicture);
          } else {
            res.json("not authorized");
          }
        });
      } else {
        res.status(401);
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * POST
   * Carica una nuova immagine profilo rimuovendo la precendente dal server e
   * dal database.
   * Questa funzione carica una singola immagine in quanto un utente può avere una sola
   * immagine profilo
   *
   */
  .post(async (req, res) => {
    try {
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
            ).then(() => {
              res.status(200).send("avatar uploaded correctly");
            });
          }
        });
      } else {
        res.status(401).send("unauthorized");
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * DELETE
   * Rimuove l'immagine profilo di un utente.
   * Funzione per gli utenti
   */
  //TODO: admin function
  .delete(async (req, res) => {
    try {
      if (req.user != null) {
        await User.findOne({ username: req.user.username })
          .then(async (user) => {
            await fs.unlink(
              __foldername + "/server/Images/" + user.profilePicture,
              (err) => {
                if (err) console.log(err);
              }
            );
          })
          .then(async () => {
            await User.findOneAndUpdate(
              {
                username: req.user.username,
              },
              { profilePicture: "" }
            ).then(() => {
              res.status(200).send("avatar deleted successfully");
            });
          });
      } else {
        res.status(401).send("unauthorized");
      }
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/petPhotos")
  //TODO: admin
  .get(async (req, res) => {
    try {
      if (req.user != null) {
        await Pet.findOne({ _id: req.query.id }).then((pet) => {
          if (pet) {
            res.send(pet.pictures);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    try {
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
            console.log(imagesAddr);
            await Pet.findOneAndUpdate(
              {
                $and: [{ owner: req.user.username }, { _id: req.query.id }],
              },
              {
                $push: {
                  pictures: {
                    $each: imagesAddr,
                  },
                },
              }
            );
            res.status(200).send("images uploaded correctly");
          }
        });
      } else {
        res.status(401);
      }
    } catch (error) {
      console.log(error);
    }
  })
  //TODO: admin
  .delete(async (req, res) => {
    try {
      if (req.user != null) {
        await Pet.findOne({ _id: req.query.id })
          .then(async () => {
            console.log(req.body);
            req.body.forEach(async (el) => {
              await fs.unlink(__foldername + "/server/Images/" + el, (err) => {
                if (err) console.log(err);
              });
            });
          })
          .then(async () => {
            await Pet.findOneAndUpdate(
              {
                $and: [{ owner: req.user.username }, { _id: req.query.id }],
              },
              {
                $pull: {
                  pictures: { $in: req.body },
                },
              }
            ).then(() => {
              res.status(200).send("images deleted successfully");
            });
          });
      } else {
        res.status(401).send("unauthorized");
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
