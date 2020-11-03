const sql = require("./db.js");

// constructor
const Section = function(section) {
	return section;
};

Section.create = async (request, response) => {
  // open the MySQL connection
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();
    sql.query("INSERT INTO section SET name = ?, content = ?, date = ? ", [request.name, request.content, dateString], function (err, rows) {
      if (err) response(err, null);
      response(null, {id: rows.insertId});
    });
  });
};

Section.getById = async (request, response) => {
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");

    sql.query("SELECT * FROM section WHERE id = ?", [request.sectionId], function (err, result ) {
      if (err) response(err, null);
      response(null, { ...result[0] });
    });
  });
};

Section.getAll = async (request, response) => {
  // open the MySQL connection
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    
    sql.query("SELECT * FROM section", function (err, result) {
      if (err) response(err, null);
      response(null, {...result});
    });
  });
};

Section.update = async (request, response) => {
  const { id, data } = request;
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();
    sql.query("UPDATE section SET name = ?, content = ?, date = ? WHERE id = ? ", [data.name, data.content, dateString, id], function (err, result) {
      if (err) response(err, null);
      response(null, {...result});
    });
  });
};

Section.delete = async (request, response) => {
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");

    sql.query("DELETE FROM section WHERE id = ?", [request.sectionId], function (err, result ) {
      if (err) response(err, null);
      response(null, { ...result });
    });
  });
};

module.exports = Section;
