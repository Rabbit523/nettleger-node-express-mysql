const Covid = require("../models/covid.model.js");

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
// Get Covid info
exports.info = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Covid in the database
  Covid.info(new Covid(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while registering."));
};
// Create a Covid
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Covid in the database
  Covid.create(new Covid(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while registering."));
};

// Get Covid by ID
exports.getById = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Save User in the database
  Covid.getById(new Covid(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Get Covid by ID
exports.getBySlug = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Save User in the database
  Covid.getBySlug(new Covid(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Get all Covids
exports.getAll = (req, res) => {
  Covid.getAll(req, (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Update a Covid by ID
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  Covid.update(new Covid(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};

// Delete a Covid by ID
exports.delete = (req, res) => {
  // Validate request
  if (!req.body) {
    // Unique validation needed
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  Covid.delete(new Covid(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while authenticating."));
};