const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String },
    filename: { type: String, required: true, unique: true },
    location: { type: String },
    photographer: { name: { type: String, required: true }, url: String },
    votes: { type: Number, required: true, default: 0 }, //Numero di voti effettuati
    averageVote: { type: Number, required: true, default: 0 }, //Media dei voti
    votesNumber: { type: Number, required: true, default: 0 }, //numero dei votanti
    username: { type: String, required: true },
  },
  {
    collection: "gallery-data",
  }
);

const galleryModel = mongoose.model("galleryData", gallerySchema);

module.exports = galleryModel;
