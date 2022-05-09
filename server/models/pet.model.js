const { default: mongoose } = require("mongoose");
const Schema = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String },
    race: { type: String },
    owner: { type: String, required: true },
    age: { type: Number },
    premium: { type: Boolean, required: true },
  },
  {
    collection: "pet-data",
  }
);

const petModel = mongoose.model("pet-data", petSchema);

module.exports = petModel;
