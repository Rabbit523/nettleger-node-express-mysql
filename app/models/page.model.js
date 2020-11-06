const sql = require("./db.js");

// constructor
const Page = function(page) {
	return page;
};

Page.create = async (request, response) => {
  // open the MySQL connection
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();
    sql.query("INSERT INTO page SET name = ?, slug = ?, meta_title = ?, meta_description = ?, type = ?, sections = ?, date = ?, status = ?, page_content = ? ",
      [request.name,
       request.slug ? request.slug : request.name.toLowerCase(),
       request.meta_title,
       request.meta_description,
       request.type ? request.type : 'single',
       request.sections ? JSON.stringify(request.sections) : null,
       dateString,
       0,
       request.page_content ? JSON.stringify(request.page_content) : null
      ],
      function (err, rows) {
        if (err) response(err, null);
        response(null, {id: rows.insertId});
      }
    );
  });
};

Page.getById = async (request, response) => {
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");

    sql.query("SELECT * FROM page WHERE id = ?", [request.pageId], function (err, result ) {
      if (err) response(err, null);
      response(null, { ...result[0] });
    });
  });
};

Page.getAll = async (request, response) => {
  // open the MySQL connection
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    
    sql.query("SELECT * FROM page", function (err, result) {
      if (err) response(err, null);
      response(null, {...result});
    });
  });
};

Page.update = async (request, response) => {
  const { id, data } = request;
  console.log(data.sections);
  console.log(data.sections['HomeBannerSection']['modules']);
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();
    sql.query("UPDATE page SET name = ?, slug = ?, meta_title = ?, meta_description = ?, type = ?, sections = ?, date = ?, status = ?, page_content = ? WHERE id = ? ",
      [data.name,
       data.slug ? data.slug : data.name.toLowerCase(),
       data.meta_title,
       data.meta_description,
       data.type ? data.type : 'single',
       data.sections ? JSON.stringify(data.sections) : null,
       dateString,
       0,
       data.page_content ? JSON.stringify(data.page_content) : null,
       id
      ],
      function (err, result) {
        if (err) response(err, null);
        response(null, {...result});
      }
    );
  });
};

Page.delete = async (request, response) => {
  sql.connect(error => {
    if (error) response(error, null);
    console.log("Successfully connected to the database.");

    sql.query("DELETE FROM page WHERE id = ?", [request.pageId], function (err, result ) {
      if (err) response(err, null);
      response(null, { ...result });
    });
  });
};

module.exports = Page;
