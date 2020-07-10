const User = require("../models/user");
const Story = require("../models/story");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userController = {};

// GET ALL CONTRIBUTORS

userController.getAll = async (req, res, next) => {
  let allUser = [];
  let allContributor;
  // FIND ALL CONTRIBUTOR

  try {
    if (req.body.email) {
      await User.find({ email: req.body.email }, (err, data) => {
        if (data) {
          res.json({ foundUser: data });
        } else {
          res.send({ error: "User not found." });
          console.log("User not found.");
        }
      });
    } else {
      await Story.find({}, (err, data) => {
        data.forEach((story) => {
          allUser.push(story.author.name);
        });
        allContributor = new Set(allUser);
        allContributor = Array.from(allContributor);
        res.json({ allContributor: allContributor });
      });
    }
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }
};

// CREATE NEW USER

userController.create = async (req, res, next) => {
  const { email, username, password, name, description } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // CHECK DUPLICATION

  if (!validator.isEmail(email)) {
    return res.status(500).send("Invalid Email passed, please re-enter.");
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ username: username });
    if (existingUser) {
      existingUser = undefined;
      return res
        .status(500)
        .send("A User with given Username is already existed");
    }
    existingUser = await User.findOne({ name: name });
    if (existingUser) {
      existingUser = undefined;
      return res
        .status(500)
        .send("A User with given Handlename is already existed");
    }
    existingUser = await User.findOne({ email: email });
    if (existingUser) {
      existingUser = undefined;
      return res.status(500).send("A User with given Email is already existed");
    }
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }

  // CREAT NEW USER

  const newUser = new User({
    email,
    username,
    password: hashedPassword,
    name,
    description,
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }

  res.status(201).json({ newUser: newUser });
};

// SHOW STORY FROM NAME

userController.getByName = async (req, res, next) => {
  const name = req.params.name;
  try {
    await Story.find({ "author.name": name })
      .sort({ _id: -1 })
      .exec((req, data) => {
        res.json({ allStory: data });
      });
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }
};

// PATCH

userController.update = async (req, res, next) => {
  const newPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  try {
    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword },
      (err, data) => {
        console.log(data);
        res.json({ updatedUser: data });
      }
    );
  } catch (err) {
    console.log(`Something went wrong - ${err}`);
    return next(err);
  }
};

module.exports = userController;
