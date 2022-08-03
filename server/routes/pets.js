const router = require("express").Router();
const fs = require("fs");
const Pet = require("../models/pet.model");
const User = require("../models/user.model");

router
  .route("/")
  /**
   * GET
   * Ottiene tutti gli animali
   */
  .get(async (req, res) => {
    try {
      await Pet.find().then((pets) => {
        res.status(200).send(pets);
      });
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * POST
   * Crea un nuovo animale
   */
  .post(async (req, res) => {
    try {
      if (req.user != null) {
        await Pet.create({
          name: req.body.name,
          type: req.body.type,
          race: req.body.race,
          owner: req.user.username, //Owner should be the user who is adding the pet
          age: req.body.age,
        })
          .then(async (pet) => {
            await User.findOneAndUpdate(
              { username: req.user.username },
              { $push: { ownedAnimals: pet._id } }
            );
          })
          .then(() => {
            res.sendStatus(201);
          });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * PATCH
   * Cambia una o più proprietà di un animale
   *
   * @param petid Id dell´animale (usa il campo _id di mongo)
   */
  .patch(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          await Pet.findByIdAndUpdate(req.query.petid, req.body);
          res.sendStatus(200);
        } else {
          await Pet.findById(req.query.petid).then(async (pet) => {
            if (pet.owner == req.user.username) {
              await Pet.updateOne({ _id: pet._id }, req.body).then(() => {
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
  })
  /**
   * DELETE
   * Cancella un animale con uno specifico id
   *
   * @param petid Id dell´animale (usa il campo _id di mongo)
   */
  .delete(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          await Pet.findOneAndDelete({ _id: req.query.petid })
            .then(async (pet) => {
              pet.pictures.forEach(async (element) => {
                await fs.unlink(
                  __foldername + "/server/Images/" + element,
                  (err) => {
                    if (err) console.log(err);
                  }
                );
              });
            })
            .finally(() => {
              res.sendStatus(200);
            });
        } else {
          await Pet.findById(req.query.petid).then(async (pet) => {
            if (pet.owner == req.user.username) {
              await Pet.findOneAndDelete({ _id: pet._id })
                .then(async (pet) => {
                  console.log(pet);
                  pet.pictures.forEach(async (element) => {
                    await fs.unlink(
                      __foldername + "/server/Images/" + element,
                      (err) => {
                        if (err) console.log(err);
                      }
                    );
                  });
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
  .route("/pet")
  /**
   * GET
   * Ottiene l'animale con il nome inserito
   */
  .get(async (req, res) => {
    try {
      console.log(req.user);
      if (req.user != null) {
        if (req.user.admin) {
          await Pet.findOne({ name: req.query.name }).then((pet) => {
            res.status(200).send(pet);
          });
        } else {
          await Pet.findOne({ name: req.query.name }).then(async (pet) => {
            if (pet.owner == req.user.username) {
              res.status(200).send(pet);
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

module.exports = router;
