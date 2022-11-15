const router = require("express").Router();
const User = require("../models/user.model");
const fs = require("fs");
const Pet = require("../models/pet.model");

router
  .route("/")
  /**
   * GET
   * Ottieni tutti gli utenti
   */
  .get(async (req, res) => {
    try {
      await User.find().then((users) => {
        if (users) {
          res.status(200).send(users);
        } else {
          res.sendStatus(404);
        }
      });
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * PATCH
   * Cambia una o più proprietà di un utente
   *
   * @param userid Id dell'utente (Utilizza il campo _id di mongo)
   */
  .patch(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          await User.findOneAndUpdate(
            { username: req.query.username },
            req.body
          ).then(() => {
            res.sendStatus(200);
          });
        }
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * DELETE
   * Cancella un utente
   *
   * @param userid Id dell'utente (Utilizza il campo _id di mongo)
   */
  .delete(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          //BAN
          await User.findByIdAndDelete(req.query.id).then(() => {
            res.sendStatus(200);
          });
        } else {
          //delete own account
          await User.findById(req.query.id).then(async (user) => {
            if (user.username == req.user.username) {
              await User.deleteOne(user._id)
                .then(async () => {
                  await fs.unlink(
                    __foldername + "/server/Images/" + user.profilePicture,
                    (err) => {
                      if (err) console.log(err);
                    }
                  );
                })
                .finally(() => {
                  res.sendStatus(200);
                });
            }
          });
        }
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/user")
  /**
   * GET
   * Ottieni un utente dato un parametro
   */
  .get(async (req, res) => {
    try {
      if (req.user != null) {
        await User.find({
          $or: [
            { name: req.query.userfield },
            { username: req.query.userfield },
            { mail: req.query.userfield },
          ],
        }).then((users) => {
          res.status(200).send(users);
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/grantPermission")
  /**
   * POST
   * grant admin permission to user
   */
  .patch(async (req, res) => {
    if (req.user.admin) {
      await User.findByIdAndUpdate(req.query.id, { admin: true }).then(() => {
        res.sendStatus(200);
      });
    } else {
      res.sendStatus(401);
    }
  });

router
  .route("/revokePermission")
  /**
   * POST
   * revoke admin permission to user
   */
  .patch(async (req, res) => {
    if (req.user.admin) {
      await User.findByIdAndUpdate(req.query.id, { admin: false }).then(() => {
        res.sendStatus(200);
      });
    } else {
      res.sendStatus(401);
    }
  });

router.route("/userPets").get(async (req, res) => {
  try {
    if (req.user != null) {
      await Pet.find({ owner: req.user.username }).then((pets) => {
        let petNames = [];
        pets.forEach((el) => {
          petNames.push(el.name);
        });
        res.send(petNames);
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
