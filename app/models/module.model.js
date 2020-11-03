const sql = require("./db.js");

// constructor
const Module = function(module) {
	return module;
};

Module.create = async (request, response) => {
  // open the MySQL connection
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();
    sql.query("INSERT INTO module SET name = ?, content = ?, date = ? ", [request.name, request.content, dateString], function (err, rows) {
      if (err) response(err, null);
      response(null, {id: rows.insertId});
    });
  });
};

Module.getById = async (request, response) => {
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");

    sql.query("SELECT * FROM module WHERE id = ?", [request.moduleId], function (err, result ) {
      if (err) response(err, null);
      response(null, { ...result[0] });
    });
  });
};

Module.getAll = async (request, response) => {
  // open the MySQL connection
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    
    sql.query("SELECT * FROM module", function (err, result) {
      if (err) response(err, null);
      response(null, {...result});
    });
  });
};

Module.update = async (request, response) => {
  const { id, data } = request;
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();
    sql.query("UPDATE module SET name = ?, content = ?, date = ? WHERE id = ? ", [data.name, data.content, dateString, id], function (err, result) {
      if (err) response(err, null);
      response(null, {...result});
    });
  });
};

Module.delete = async (request, response) => {
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");

    sql.query("DELETE FROM module WHERE id = ?", [request.moduleId], function (err, result ) {
      if (err) response(err, null);
      response(null, { ...result });
    });
  });
};

module.exports = Module;
