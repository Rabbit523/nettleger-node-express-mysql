const sql = require("./db.js");
// Import Bcrypt Package
const bcrypt = require('bcrypt-nodejs');
// Import JWT Package
const jwt = require('jsonwebtoken');
// Create custom secret for use in JWT
const secret = 'harrypotter';

// constructor
const User = function(user) {
	return user;
};

User.register = async (newUser, result) => {
	// Create a token for activating account
	const token = jwt.sign({ email: newUser.email }, secret, { expiresIn: '24h' });
	const encryptedPassword = await bcrypt.hash(newUser.password, 10);
	const d = new Date();
	const dateString = d.toString();
	// open the MySQL connection
  sql.connect(error => {
    if (error) result({ kind: 'sql' }, error);;
		console.log("Successfully connected to the database.");
    sql.query("INSERT INTO user SET email = ?, password = ?, name = ?, token = ?, date = ?", 
		[newUser.email, encryptedPassword, newUser.name ? newUser.name : null , token, dateString], function (err, rows, fields) {
      if (err) {
        result({ kind: 'sql' }, err);
      }
      result(null, {id: rows.insertId, ...newUser});
    });
  });
};

User.login = async (user, result) => {
	sql.connect(error => {
    if (error) result({ kind: 'sql' }, error);
		console.log("Successfully connected to the database.");
		sql.query('SELECT * FROM user WHERE email = ?', [user.email], function (err, res, fields) {
      if (err) {
        result({ kind: 'sql' }, err);
			}
			if (res.length > 0) {
				const pwd = user.password ? user.password : '';
				const pwdValidation = bcrypt.compareSync(pwd, res[0].password);
				
				if (pwdValidation) {
					const token = jwt.sign({ email: user.email }, secret, { expiresIn: '24h' });
					result(null, { token, id: res.insertId });
				} else {
					result({ kind: 'password' }, null);
				}
			} else {
				result({ kind: 'user' }, null);
			}
  	});
	});
};

module.exports = User;