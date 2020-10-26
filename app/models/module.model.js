const sql = require("./db.js");

// constructor
const Module = function(module) {
	return module;
};

Module.create = async (request, response) => {
  // open the MySQL connection
  sql.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();
    sql.query("INSERT INTO module SET name = ?, content = ?, date = ? ", [request.name, request.content, dateString], function (err, rows) {
      if (err) {
        throw err;
      }
      response(null, {id: rows.insertId});
    });
  });
};

Module.getById = async (request, response) => {
  sql.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");

    sql.query("SELECT * FROM module WHERE id = ?", [request.moduleId], function (err, result ) {
      if (err) {
        throw err;
      }
      return response(null, { ...result[0] });
    });
  });
};

Module.getAll = async (request, response) => {
  // open the MySQL connection
  sql.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
    
    sql.query("SELECT * FROM module", function (err, result) {
      if (err) {
        throw err;
      }
      response(null, {...result});
    });
  });
};

Module.update = async (request, response) => {
  const { id, data } = request;
  console.log(data.name);
  sql.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();
    console.log(request);
    sql.query("UPDATE module SET name = ?, content = ?, date = ? WHERE id = ? ", [data.name, data.content, dateString, id], function (err, result) {
      if (err) {
        throw err;
      }
      response(null, {...result});
    });
  });
};

Module.delete = async (request, response) => {
  sql.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");

    sql.query("DELETE FROM module WHERE id = ?", [request.moduleId], function (err, result ) {
      if (err) {
        throw err;
      }
      response(null, { ...result });
    });
  });
};

module.exports = Module;
