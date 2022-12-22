const Animal = require("../models/animals.model");
const botaniczoo = require("botanic-zoo-api");

async function getAllAnimals() {
  let animals = await Animal.find();
  return animals;
}

async function getMemoryAnimals() {
  let animals = await getAllAnimals();
  let memoryAnimals = [];
  for (let i = 0; i < 8; i++) {
    memoryAnimals.push(animals[Math.floor(Math.random() * animals.length)]);
  }
  return memoryAnimals;
}

async function getHangmanWords() {
  let animals = await getAllAnimals();
  return animals[Math.floor(Math.random() * animals.length)].name;
}

// async function populateDb() {
//   await botaniczoo
//     .getBirdPets()
//     .then((birds) => {
//       for (let i of birds.Pets) {
//         Animal.create({
//           name: i.Name,
//           info: "Bird",
//           funFact: i.FunFact,
//           image: i.ImageUrl,
//         });
//       }
//     })
//     .then(async () => {
//       await botaniczoo.getCatPets().then((cats) => {
//         for (let i of cats.Pets) {
//           Animal.create({
//             name: i.Name,
//             info: "Cats",
//             funFact: i.FunFact,
//             image: i.ImageUrl,
//           });
//         }
//       });
//     })
//     .then(async () => {
//       await botaniczoo.getDogPets().then((dogs) => {
//         for (let i of dogs.Pets) {
//           Animal.create({
//             name: i.Name,
//             info: "Dogs",
//             funFact: i.FunFact,
//             image: i.ImageUrl,
//           });
//         }
//       });
//     })
//     .then(async () => {
//       await botaniczoo.getFishPets().then((fish) => {
//         for (let i of fish.Pets) {
//           Animal.create({
//             name: i.Name,
//             info: "Fish",
//             funFact: i.FunFact,
//             image: i.ImageUrl,
//           });
//         }
//       });
//     })
//     .then(async () => {
//       await botaniczoo.getRodentPets().then((rodents) => {
//         for (let i of rodents.Pets) {
//           Animal.create({
//             name: i.Name,
//             info: "Rodents",
//             funFact: i.FunFact,
//             image: i.ImageUrl,
//           });
//         }
//       });
//     });
// }

module.exports = { getAllAnimals, getMemoryAnimals, getHangmanWords };
