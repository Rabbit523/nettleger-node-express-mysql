const User = require("../models/user.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "user") {
      res.status(404).send({
        message: 'User is not exist!'
      });
    } else if (err.kind === "password") {
      res.status(404).send({
        message: 'Password is not correct!'
      });
    } else {
      res.status(500).send({
        message:
          defaultErrMessage || err.message || "Internal server error"
      });
    }
  } else {
    res.send(data);
  }
};

// Register
exports.register = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  User.register(new User(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while registering."));
};

// Login
exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  User.login(new User(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};