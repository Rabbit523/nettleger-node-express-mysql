const Treatment = require("../models/treatment.model.js");

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

// Create a Treatment
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Treatment in the database
  Treatment.create(new Treatment(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while registering."));
};

// Get Treatment by ID
exports.getById = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Save User in the database
  Treatment.getById(new Treatment(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Get Treatment by ID
exports.getBySlug = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Save User in the database
  Treatment.getBySlug(new Treatment(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Get all Treatments
exports.getAll = (req, res) => {
  Treatment.getAll(req, (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Update a Treatment by ID
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  Treatment.update(new Treatment(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Delete a Treatment by ID
exports.delete = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  Treatment.delete(new Treatment(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};