const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String },
    filename: {
      type: String,
      required: true,
      unique: true,
      default: "placeholder",
    },
    location: { type: String }, //name of the place (?)
    photographer: { name: { type: String, required: true }, url: String }, //photographer name and url to social media/site
    votes: { type: Number, required: true, default: 0 }, //Numero di voti effettuati
    averageVote: { type: Number, required: true, default: 0 }, //Media dei voti
    votesNumber: { type: Number, required: true, default: 0 }, //numero dei votanti
    username: { type: String, required: true }, //user that added the image to the gallery
  },
  {
    collection: "gallery-data",
  }
);

const galleryModel = mongoose.model("galleryData", gallerySchema);

module.exports = galleryModel;
