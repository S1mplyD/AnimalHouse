const router = require("express").Router();
const animals = require("../APIs/animals");
const { getAnimals } = require("../APIs/animals");

router.route("/").get(async (req, res) => {
  try {
    let animal = await animals.getAllAnimals();
    res.send(animal);
  } catch (e) {
    console.log(e);
  }
});

router.route("/funfact").get(async (req, res) => {
  try {
    const animals = await getAnimals(req.query.name, req.query.specie);
    res.send(animals);
  } catch (e) {
    console.log(e);
  }
});

router.route("/memory").get(async (req, res) => {
  await animals.getMemoryAnimals().then((animals) => {
    res.send(animals);
  });
});

router.route("/hangman").get(async (req, res) => {
  await animals.getHangmanWords().then((word) => {
    res.send(word);
  });
});

// router.route("/populate").get(async (req, res) => {
//   animals.populateDb();
// });

module.exports = router;
