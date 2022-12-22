const router = require("express").Router();
const animals = require("../APIs/animals");

router.route("/").get(async (req, res) => {
  let animal = await animals.getAllAnimals();
  res.send(animal);
});

module.exports = router;
