const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  createdDate: Date,
  image: [String],
  tag: [String],
  storyCount: Number,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
