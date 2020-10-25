const Module = require("../models/module.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    res.status(500).send({
      message:
        defaultErrMessage || err.message || "Internal server error"
    });
  } else {
    res.send(data);
  }
};

// Create Module
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save module in the database
  Module.create(new Module(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while registering."));
};

// Get Module with ID
exports.get = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  Module.get(new Module(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Get Module with ID
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  Module.update(new Module(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Get Module with ID
exports.delete = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  Module.delete(new Module(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};