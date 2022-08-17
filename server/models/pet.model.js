const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String },
    race: { type: String },
    owner: { type: String, required: true }, //username dell'owner
    age: { type: Number },
    premium: { type: Boolean, required: true, default: false },
    pictures: { type: [String] }, //Path alle immagini su filesystem
  },
  {
    collection: "pet-data",
  }
);

const petModel = mongoose.model("pet-data", petSchema);

module.exports = petModel;
