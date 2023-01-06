const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    replies: { type: [String] }, //_id of other comments
    user: { type: String, required: true },
    parentId: { type: String }, //_id of parent comment or reply
  },
  {
    collection: "comment-data",
  }
);

const commentModel = mongoose.model("commentData", commentSchema);

module.exports = commentModel;
