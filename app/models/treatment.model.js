const sql = require("./db.js");

// constructor
const Treatment = function(treatment) {
	return treatment;
};

Treatment.create = async (request, response) => {
  // open the MySQL connection
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();
    sql.query("INSERT INTO treatment SET name = ?, card_description = ?, card_cost = ?, steps = ?, content = ?, date = ? ",
      [request.name,
       request.card_description,
       request.card_cost,
       request.steps ? JSON.stringify(request.steps) : null,
       request.content ? JSON.stringify(request.content) : null,
       dateString
      ],
      function (err, rows) {
        if (err) response(err, null);
        response(null, {id: rows.insertId});
      }
    );
  });
};

Treatment.getById = async (request, response) => {
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");

    sql.query("SELECT * FROM treatment WHERE id = ?", [request.treatmentId], function (err, result ) {
      if (err) response(err, null);
      response(null, { ...result[0] });
    });
  });
};

function getAllSlugs () {
  return new Promise((resolve, reject) => {
    sql.query("SELECT slug, name FROM page", function (err, rows ) {
      if (err) reject(err);
      resolve(rows);
    });
  });
}
function getAllTreatments() {
 return new Promise((resolve, reject) => {
    sql.query("SELECT id, name, card_cost, card_description FROM treatment", function (err, rows ) {
      if (err) reject(err);
      resolve(rows);
    });
  }); 
}
Treatment.getBySlug = async (request, response) => {
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    
    sql.query("SELECT * FROM treatment WHERE name = ?", [request.slug], async function (err, result ) {
      if (err) response(err, null);
      const slugs = await getAllSlugs();
      const treatments = await getAllTreatments();
      response(null, { slugs, treatments, model_type: 'treatment', ...result[0] });
    });
  });
};

Treatment.getAll = async (request, response) => {
  // open the MySQL connection
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    
    sql.query("SELECT * FROM treatment", function (err, result) {
      if (err) response(err, null);
      response(null, {...result});
    });
  });
};

Treatment.update = async (request, response) => {
  const { id, data } = request;
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();
    sql.query("UPDATE treatment SET name = ?, card_description = ?, card_cost = ?, steps = ?, content = ?, date = ? WHERE id = ? ",
      [data.name,
       data.card_description,
       data.card_cost,
       data.steps ? JSON.stringify(data.steps) : null,
       data.content ? JSON.stringify(data.content) : null,
       dateString,
       id
      ],
      function (err, result) {
        if (err) response(err, null);
        response(null, {...result});
      }
    );
  });
};

Treatment.delete = async (request, response) => {
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");

    sql.query("DELETE FROM treatment WHERE id = ?", [request.treatmentId], function (err, result ) {
      if (err) response(err, null);
      response(null, { ...result });
    });
  });
};

module.exports = Treatment;
