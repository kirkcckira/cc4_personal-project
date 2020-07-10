require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const storyRoutes = require("./routes/storyRoutes");

const app = express();

let port = process.env.PORT || 5000;
let url = process.env.DATABASE_URL;

// MIDDLEWARE

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "cat is good",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("cat is good"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// ROUTES

app.use("/api/user", userRoutes);
app.use("/api/story", storyRoutes);

// START SERVER

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to the database.");
  }
);

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
