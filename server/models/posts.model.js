const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    author: { type: String, required: true },
    shortDescription: { type: String, maxlength: 144 },
  },
  {
    collection: "post-data",
  }
);

const postModel = mongoose.model("postsData", postSchema);

module.exports = postModel;
