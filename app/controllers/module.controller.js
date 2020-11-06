const Module = require("../models/module.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    res.status(500).send({
      message:
        defaultErrMessage || err.message || "Internal server error"
    });
  } else {
    res.status(200).send(data);
  }
};

// Create a module
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

// Get a module by ID
exports.getById = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Save User in the database
  Module.getById(new Module(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Get all modules
exports.getAll = (req, res) => {
  Module.getAll(req, (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Update a module by ID
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

// Delete a module by ID
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