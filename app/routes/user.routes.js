const express = require('express');
const router = express.Router();

const user = require("../controllers/user.controller.js");

router.route('/login').post(user.login);
router.route('/register').post(user.register);

module.exports = router;