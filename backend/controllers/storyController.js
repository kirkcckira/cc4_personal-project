const moment = require("moment");

const User = require("../models/user");
const Story = require("../models/story");
const Comment = require("../models/comment");

const storyController = {};

// SHOW ALL

storyController.getAll = async (req, res, next) => {
  try {
    await Story.find({})
      .sort({ _id: -1 })
      .exec((req, data) => {
        res.json({ allStory: data });
      });
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }
};

// CREATE

storyController.create = async (req, res, next) => {
  let img;
  let date = moment().format("YYYY-MM-DD");

  if (req.body.image != "") {
    img = req.body.image.replace(" ", "");
    img = img.split(",");
  } else {
    img = null;
  }
  let tags = req.body.tag.replace(" ", "");
  tags = tags.split(",");

  const { title, body } = req.body;
  const newStory = new Story({
    title,
    body,
    image: img,
    tag: tags,
    createdDate: date,
    author: {
      id: req.user._id,
      name: req.user.name,
    },
  });
  try {
    await newStory.save();
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }

  res.status(201).json({ newStory: newStory });
};

// SHOW ONE

storyController.getStoryById = async (req, res, next) => {
  const storyId = req.params.storyId;
  try {
    await Story.findById(storyId)
      .populate("comments")
      .exec((err, story) => {
        res.json({ foundStory: story });
      });
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }
};

// PATCH

storyController.update = async (req, res, next) => {
  const storyId = req.params.storyId;
  const { title, body } = req.body;

  if (req.body.image != "") {
    img = req.body.image.replace(" ", "");
    img = img.split(",");
  } else {
    img = null;
  }
  let tags = req.body.tag.replace(" ", "");
  tags = tags.split(",");

  let updatedStory = {
    title,
    body,
    image: img,
    tag: tags,
  };

  try {
    await Story.findByIdAndUpdate(storyId, updatedStory, (err, story) => {
      res.status(201).json({ updatedStory: story });
    });
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }
};

// DELETE

storyController.delete = async (req, res, next) => {
  const storyId = req.params.storyId;
  try {
    await Story.findByIdAndRemove(
      storyId,
      { useFindAndModify: false },
      (err, story) => {
        res.json({ deletedStory: story });
      }
    );
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }
};

// SEARCH CONTROLLERS //

// SEARCH BY TAG

storyController.tag = async (req, res, next) => {
  const tag = req.params.tagName;
  try {
    await Story.find({ tag: tag })
      .sort({ _id: -1 })
      .exec((req, data) => {
        res.json({ allStory: data });
      });
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }
};

// SEARCH BY NAVBAR

storyController.search = async (req, res, next) => {
  let regex = new RegExp(req.body.query, "i");
  // Story.find({ $or: [{ body: regex }, { tag: regex }, { title: regex }] })
  try {
    await Story.find({
      $or: [{ body: regex }, { tag: regex }, { title: regex }],
    })
      .sort({ _id: -1 })
      .exec((req, data) => {
        res.json({ allStory: data });
      });
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }
};

// COMMENT CONTROLLERS //

// SHOW BY ID

storyController.getCommentById = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    await Comment.findById(commentId, (err, comment) => {
      res.json({ foundComment: comment });
    });
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }
};

// CREATE

storyController.commentCreate = async (req, res, next) => {
  const storyId = req.params.storyId;
  try {
    await Story.findById(storyId, async (err, story) => {
      if (req.body.commentator === undefined) {
        const newComment = new Comment({
          comment: req.body.comment,
          author: {
            id: req.user._id,
            name: req.user.name,
          },
        });
        await newComment.save();
        story.comments.push(newComment);
        await story.save();
        res.json({ updatedStory: story });
      } else {
        const newComment = new Comment({
          comment: req.body.comment,
          commentator: req.body.commentator,
        });
        await newComment.save();
        story.comments.push(newComment);
        await story.save();
        res.json({ updatedStory: story });
      }
    });
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }
};

// PATCH

storyController.commentUpdate = async (req, res, next) => {
  const commentId = req.params.commentId;
  let newComment = { comment: req.body.newComment };
  try {
    await Comment.findByIdAndUpdate(commentId, newComment, (err, comment) => {
      res.json({ updatedStory: comment });
    });
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }
};

// DELETE

storyController.commentDelete = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    await Comment.findByIdAndRemove(
      commentId,
      { useFindAndModify: false },
      (err, comment) => {
        res.json({ deletedComment: comment });
      }
    );
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }
};

module.exports = storyController;
