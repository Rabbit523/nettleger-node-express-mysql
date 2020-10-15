var express = require('express');
var router = express.Router();

router.route('/user').post('/login', function (req, res) {
	res.send("hello");
});

module.exports = router;