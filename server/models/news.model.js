const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: Date, required: true },
    post_summary: { type: String, maxlength: 144 },
    post: { type: String, required: true },
  },
  {
    collection: "news-data",
  }
);

const newsModel = mongoose.model("newsData", newsSchema);

module.exports = newsModel;
