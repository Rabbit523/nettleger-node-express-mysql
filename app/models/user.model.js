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
  try {
  	// Create a token for activating account
  	const token = jwt.sign({ email: newUser.email }, secret, { expiresIn: '24h' });
		const encryptedPassword = await bcrypt.hash(newUser.password, 10);

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

User.login = async (user, result) => {
  try {
  	const [res, fields] = await sql.promise().query('SELECT * FROM user WHERE email = ?', [user.email]);
  	if (res.length > 0) {
  		const pwdValidation = bcrypt.compareSync(user.password, res[0].password);
  		
  		if (pwdValidation) {
  			const token = jwt.sign({ email: user.email }, secret, { expiresIn: '24h' });
    		result(null, { token });
  		} else {
  			throw { kind: "password" };
  		}
  	} else {
  		throw { kind: "user" };
  	}
  } catch (err) {
  	console.log({ err });
    result(err, null);
  };
};

module.exports = User;