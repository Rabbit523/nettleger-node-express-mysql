const express = require('express');
const router = express.Router();

const controller = require("../controllers/user.controller.js");

router.route('/login').post(controller.login);
router.route('/register').post(controller.register);
router.route('/test').get(controller.test);
module.exports = router;