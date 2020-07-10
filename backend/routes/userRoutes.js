const express = require("express");
const passport = require("passport");

const userControllers = require("../controllers/userController");

const router = express.Router();

// SHOW ALL

router.get("/", userControllers.getAll);

// CREATE

router.post("/", userControllers.create);

// PATCH

router.patch("/", userControllers.update);

// LOGIN

router.post("/login", (req, res, next) => {
  passport.authorize("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No user found for given username.");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log("Successfully Authenticated");
        console.log(req.session);
        console.log(req.user);
        res.status(200).json({ loginUser: req.user });
      });
    }
  })(req, res, next);
});

// LOGOUT

router.post("/logout", (req, res, next) => {
  req.logOut();
  console.log(req.session);
});

// SHOW BY NAME

router.get("/:name", userControllers.getByName);

module.exports = router;
