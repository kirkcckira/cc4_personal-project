const Story = require("../models/story");
const Comment = require("../models/comment");
const User = require("../models/user");

const middlewareObj = {};

middlewareObj.isLoggedin = (req, res, next) => {
  if (req.user) {
    return next();
  }
  // res.send("You aren't logged in!");
  res.redirect("http://localhost:3000/login");
};

middlewareObj.checkStoryOwnership = async (req, res, next) => {
  if (req.user) {
    await Story.findById(req.params.storyId, (err, story) => {
      if (err || !story) {
        console.log(err);
        res.redirect("back");
      } else {
        // CHECK OWNERSHIP
        if (story.author.id.equals(req.user._id) || req.user.name === "admin") {
          req.story = story;
          next();
        } else {
          console.log(err);
          res.redirect("http://localhost:3000/login");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (req.user) {
    Comment.findById(req.params.commentId, (err, comment) => {
      console.log(`Found ${comment}`);
      if (err || !comment) {
        console.log(err);
        res.redirect("back");
      } else {
        // CHECK OWNERSHIP
        if (comment.commentator && req.user.name === "admin") {
          req.comment = comment;
          next();
        } else {
          if (
            comment.author.id.equals(req.user._id) ||
            req.user.name === "admin"
          ) {
            req.comment = comment;
            next();
          } else {
            console.log(err);
            res.redirect("back");
          }
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

module.exports = middlewareObj;
