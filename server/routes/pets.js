const router = require("express").Router();
const Pet = require("../models/pet.model");

router
  .route("/")
  /**
   * GET
   * Get all pets
   */
  .get(async (req, res) => {
    const pets = await Pet.find();
    res.send(pets);
  })
  /**
   * POST
   * Create a new Pet
   */
  .post(async (req, res) => {
    try {
      await Pet.create({
        name: req.body.name,
        type: req.body.type,
        race: req.body.race,
        owner: req.body.owner, //Owner should be the user who is adding the pet
        age: req.body.age,
        premium: req.body.premium,
      });
      res.sendStatus(200);
    } catch (error) {
      res.json({ Error: "Error" + error });
    }
  });

router
  .route("/:petid")
  /**
   * PUT
   * Change one or more property of a Pet
   *
   * @param petid Id of the Pet (uses _id field of mongodb)
   */
  .put(async (req, res) => {
    try {
      await Pet.findByIdAndUpdate(req.params.petid, req.body);
      res.status(200).json("Pet edited successfully");
    } catch (error) {
      res.json({ Error: "Error" + error });
    }
  })
  /**
   * DELETE
   * Delete an item with a specific id
   *
   * @param petid Id of the Pet (uses _id field of mongodb)
   */
  .delete(async (req, res) => {
    try {
      await Pet.findByIdAndDelete(req.params.petid);
      res.status(200).json("Pet deleted successfully");
    } catch (error) {
      res.json({ Error: "Error" + error });
    }
  });

router
  .route("/:petname")
  /**
   * GET
   * Get Pet by name
   *
   * @param petname name of the Pet we search for
   */
  .get(async (req, res) => {
    try {
      const pet = await Pet.findOne({ name: req.params.petname });
      res.status(200).json(pet);
    } catch (error) {
      res.json({ Error: "Error" + error });
    }
  });

module.exports = router;
