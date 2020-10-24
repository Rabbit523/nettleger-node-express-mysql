const express = require('express');
const router = express.Router();

const custom = require("../controllers/custom.controller.js");

router.route('/fileupload').post(custom.fileupload);

module.exports = router;