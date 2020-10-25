const sql = require("./db.js");

// constructor
const Module = function(module) {
	return module;
};

Module.create = async (newModule, result) => {
  // open the MySQL connection
  sql.connect(error => {
    if (error) result(error);
    console.log("Successfully connected to the database.");
    var d = new Date();
    var dateString = d.toString();
    sql.query("INSERT INTO module SET name = ?, content = ?, date = ? ", [newModule.name, newModule.content, dateString], function (err, rows, fields) {
      if (err) {
        result(err);
      }
      result(null, {id: rows.insertId});
    });
  });
};

Module.get = async (newModule, result) => {
  try {
  	console.log('module before create: ', newModule);
  	
    const [res, fields] = await sql.promise().query(
      "INSERT INTO user SET email = ?, password = ?, name = ?, token = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newUser.email, encryptedPassword, newUser.name ? newUser.name : null , token]
    );

    console.log("Created 'user': ", { userId: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

Module.update = async (newModule, result) => {
  try {
  	console.log('module before create: ', newModule);
  	
    const [res, fields] = await sql.promise().query(
      "INSERT INTO user SET email = ?, password = ?, name = ?, token = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newUser.email, encryptedPassword, newUser.name ? newUser.name : null , token]
    );

    console.log("Created 'user': ", { userId: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

Module.delete = async (newModule, result) => {
  try {
  	console.log('module before create: ', newModule);
  	
    const [res, fields] = await sql.promise().query(
      "INSERT INTO user SET email = ?, password = ?, name = ?, token = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newUser.email, encryptedPassword, newUser.name ? newUser.name : null , token]
    );

    console.log("Created 'user': ", { userId: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

module.exports = Module;
