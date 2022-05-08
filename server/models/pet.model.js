const { default: mongoose } = require("mongoose");
const Schema = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    race: { type: String, required: true },
    owner: { type: String, required: true, unique: true },
    age: { type: Number },
    premium: { type: Boolean, required: true },
  },
  {
    collection: "pet-data",
  }
);

const petModel = mongoose.model("pet-data", petSchema);

module.exports = petModel;
