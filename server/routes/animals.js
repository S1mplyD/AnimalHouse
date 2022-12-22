const router = require("express").Router();
const animals = require("../APIs/animals");

router.route("/").get(async (req, res) => {
  let animal = await animals.getAllAnimals();
  res.send(animal);
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
