const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String },
    filename: { type: String, required: true, unique: true },
    location: { type: String },
    source: { name: String, url: String },
    photographer: { name: String, url: String },
  },
  {
    collection: "gallery-data",
  }
);

const galleryModel = mongoose.model("galleryData", gallerySchema);

module.exports = galleryModel;
