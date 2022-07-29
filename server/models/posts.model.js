const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: Date, required: true },
    post_summary: { type: String, maxlength: 144 },
    post: { type: String, required: true },
  },
  {
    collection: "post-data",
  }
);

const postModel = mongoose.model("postsData", postSchema);

module.exports = postModel;
