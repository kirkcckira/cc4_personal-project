const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: { type: String, require: true },
  commentator: { type: String, require: true },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: { type: String, require: true },
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
