const Section = require("../models/section.model.js");

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

// Create a section
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save section in the database
  Section.create(new Section(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while registering."));
};

// Get Section by ID
exports.getById = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Save User in the database
  Section.getById(new Section(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Get all sections
exports.getAll = (req, res) => {
  Section.getAll(req, (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Update a section by ID
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  Section.update(new Section(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Delete a section by ID
exports.delete = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  Section.delete(new Section(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};