const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: Date, required: true },
    post: { type: String, required: true },
    post_summary: { type: String, maxlength: 144 },
    photos: { type: [String] },
  },
  {
    collection: "post-data",
  }
);

const postModel = mongoose.model("postsData", postSchema);

module.exports = postModel;
