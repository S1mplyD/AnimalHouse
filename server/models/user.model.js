const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, //Nome completo (nome e cognome)
    username: { type: String, required: true, unique: true },
    mail: { type: String, unique: true },
    serviceId: { type: String }, //Id del servizio di login usato (E.s.: Google, Twitter...)
    password: { type: String },
    ownedAnimals: { type: [String] }, //Id degli animali posseduti (_id di mongo)
    profilePicture: { type: String }, //Path alle immagini su filesystem
    admin: { type: Boolean, required: true, default: false },
    cartProducts: { type: [String] }, //_id of cart products
    userBookings: { type: [String] }, //_id of services booked by user
  },
  {
    collection: "user-data",
  }
);

const userModel = mongoose.model("userData", userSchema);

module.exports = userModel;
