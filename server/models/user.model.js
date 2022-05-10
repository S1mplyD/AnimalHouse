const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ownedAnimals: { type: [String] }, //Id degli animali posseduti (_id di mongo)
    profilePicture: { type: String }, //Path alle immagini su filesystem
  },
  {
    collection: "user-data",
  }
);

const userModel = mongoose.model("userData", userSchema);

module.exports = userModel;
