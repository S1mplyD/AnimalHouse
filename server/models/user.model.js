const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, //Nome completo (nome e cognome)
    username: { type: String, required: true, unique: true },
    mail: { type: String, unique: true },
    serviceId: { type: String, unique: true }, //Id del servizio di login usato (E.s.: Google, Twitter...)
    password: { type: String },
    ownedAnimals: { type: [String] }, //Id degli animali posseduti (_id di mongo)
    profilePicture: { type: String }, //Path alle immagini su filesystem
  },
  {
    collection: "user-data",
  }
);

const userModel = mongoose.model("userData", userSchema);

module.exports = userModel;
