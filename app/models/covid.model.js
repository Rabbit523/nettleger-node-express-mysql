const sql = require("./db.js");

// constructor
const Covid = function(covid) {
	return covid;
};

Covid.create = async (request, response) => {
  // open the MySQL connection
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();
    sql.query("INSERT INTO covid SET name = ?, link = ?, meta_title = ?, meta_description = ?, description = ?, cost = ?, btnName = ?, date = ?, steps = ?, content = ? ",
      [request.name,
       request.link ? request.link : request.name.toLowerCase().replace(' ', '_'),
       request.meta_title,
       request.meta_description,
       request.description,
       request.cost,
       request.btnName,
       dateString,
       request.steps ? JSON.stringify(request.steps) : null,
       request.content ? JSON.stringify(request.content) : null,
      ],
      function (err, rows) {
        if (err) response(err, null);
        response(null, {id: rows.insertId});
      }
    );
  });
};

Covid.getById = async (request, response) => {
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");

    sql.query("SELECT * FROM covid WHERE id = ?", [request.covidId], function (err, result ) {
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
function getAllCovids() {
 return new Promise((resolve, reject) => {
    sql.query("SELECT id, name, link, cost, btnName, description FROM covid", function (err, rows ) {
      if (err) reject(err);
      resolve(rows);
    });
  }); 
}
function getAllTreatments() {
 return new Promise((resolve, reject) => {
    sql.query("SELECT id, name, link, card_cost, card_description FROM treatment", function (err, rows ) {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

Covid.info = async (request, response) => {
  const slugs = await getAllSlugs();
  const covids = await getAllCovids();
  response(null, { slugs, covids });
}

Covid.getBySlug = async (request, response) => {
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    
    sql.query("SELECT * FROM covid WHERE link = ?", [request.slug], async function (err, result ) {
      if (err) response(err, null);
      const slugs = await getAllSlugs();
      const treatments = await getAllTreatments();
      response(null, { slugs, treatments, model_type: 'covid', ...result[0] });
    });
  });
};

Covid.getAll = async (request, response) => {
  // open the MySQL connection
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    
    sql.query("SELECT * FROM covid", function (err, result) {
      if (err) response(err, null);
      response(null, {...result});
    });
  });
};

Covid.update = async (request, response) => {
  const { id, data } = request;
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();

    sql.query("UPDATE covid SET name = ?, link = ?, meta_title = ?, meta_description = ?, description = ?, cost = ?, btnName = ?, steps = ?, content = ?, date = ? WHERE id = ? ",
      [data.name,
       data.link ? data.link : data.name.toLowerCase().replace(' ', '_'),
       data.meta_title,
       data.meta_description,
       data.description,
       data.cost,
       data.btnName,
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

Covid.delete = async (request, response) => {
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");

    sql.query("DELETE FROM covid WHERE id = ?", [request.covidId], function (err, result ) {
      if (err) response(err, null);
      response(null, { ...result });
    });
  });
};

module.exports = Covid;
