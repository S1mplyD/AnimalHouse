const botaniczoo = require("botanic-zoo-api");

async function getAllAnimals() {
  let cats = await botaniczoo.getCatPets();
  let dogs = await botaniczoo.getDogPets();
  let birds = await botaniczoo.getBirdPets();
  let exotic = await botaniczoo.getExoticPets();
  let rodents = await botaniczoo.getExoticPets();
  let fish = await botaniczoo.getFishPets();
  let allAnimals = [cats, dogs, birds, exotic, rodents, fish];
  return allAnimals;
}

module.exports = { getAllAnimals };
