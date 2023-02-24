const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    funFact: { type: String },
    image: { type: String },
    info: { type: String, required: true },
  },
  {
    collection: "animal-data",
  }
);

const animalModel = mongoose.model("animalData", animalSchema);

module.exports = animalModel;
