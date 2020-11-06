const Page = require("../models/page.model.js");

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

// Create a Page
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Page in the database
  Page.create(new Page(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while registering."));
};

// Get Page by ID
exports.getById = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Save User in the database
  Page.getById(new Page(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Get all Pages
exports.getAll = (req, res) => {
  Page.getAll(req, (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Update a Page by ID
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  Page.update(new Page(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Delete a Page by ID
exports.delete = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  Page.delete(new Page(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};