const express = require("express");

const storyControllers = require("../controllers/storyController");
const middleware = require("../middleware/middleware");

const router = express.Router();

// STORY ROUTES //

// SHOW ALL

router.get("/", storyControllers.getAll);

// SHOW BY ID

router.get("/:storyId", storyControllers.getStoryById);

// CREATE

router.post("/", middleware.isLoggedin, storyControllers.create);

// PATCH

router.patch(
  "/:storyId",
  middleware.isLoggedin,
  middleware.checkStoryOwnership,
  storyControllers.update
);

// DESTROY

router.delete(
  "/:storyId",
  middleware.isLoggedin,
  middleware.checkStoryOwnership,
  storyControllers.delete
);

// SEARCH ROUTES //

// SEARCH BY TAG

router.get("/tag/:tagName", storyControllers.tag);

// SEARCH BY NAV

router.post("/search", storyControllers.search);

// COMMENT ROUTES //

// SHOW BY ID

router.get("/:storyId/:commentId", storyControllers.getCommentById);

// CREATE

router.post("/:storyId/comment", storyControllers.commentCreate);

// PATCH

router.patch(
  "/:storyId/:commentId",
  middleware.isLoggedin,
  middleware.checkCommentOwnership,
  storyControllers.commentUpdate
);

// DELETE

router.delete(
  "/:storyId/:commentId",
  middleware.isLoggedin,
  middleware.checkCommentOwnership,
  storyControllers.commentDelete
);

module.exports = router;
