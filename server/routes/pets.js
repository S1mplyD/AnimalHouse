const router = require("express").Router();
const Pet = require("../models/pet.model");
const User = require("../models/user.model");

router
  .route("/")
  /**
   * GET
   * Ottiene tutti gli animali
   */
  .get(async (req, res) => {
    const pets = await Pet.find();
    res.send(pets);
  })
  /**
   * POST
   * Crea un nuovo animale
   */
  .post(async (req, res) => {
    console.log(req.user);
    try {
      if (req.user != null) {
        await Pet.create({
          name: req.body.name,
          type: req.body.type,
          race: req.body.race,
          owner: req.user.username, //Owner should be the user who is adding the pet
          age: req.body.age,
          premium: req.body.premium,
        }).then(async (pet) => {
          await User.findOneAndUpdate(
            { username: req.user.username },
            { $push: { ownedAnimals: pet._id } }
          );
        });
      }

      res.sendStatus(200);
    } catch (error) {
      res.json({ Error: "Errore: " + error });
    }
  });

router
  .route("/:petid")
  /**
   * PUT
   * Cambia una o più proprietà di un animale
   *
   * @param petid Id dell´animale (usa il campo _id di mongo)
   */
  .patch(async (req, res) => {
    try {
      await Pet.findByIdAndUpdate(req.params.petid, req.body);
      res.status(200).json("Animale modificato con successo");
    } catch (error) {
      res.json({ Error: "Errore: " + error });
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
      await Pet.findByIdAndDelete(req.params.petid);
      res.status(200).json("Animale eliminato con successo");
    } catch (error) {
      res.json({ Error: "Errore: " + error });
    }
  });

//TODO aggiungere più campi di ricerca
router
  .route("/:petname")
  /**
   * GET
   * Ottiene l'animale con il nome inserito
   *
   * @param petname nome dell'animale che stiamo cercando
   */
  .get(async (req, res) => {
    try {
      const pet = await Pet.findOne({ name: req.params.petname });
      res.status(200).json(pet);
    } catch (error) {
      res.json({ Error: "Errore: " + error });
    }
  });

module.exports = router;
