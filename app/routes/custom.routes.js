const express = require('express');
const router = express.Router();

const controller = require("../controllers/custom.controller.js");

router.route('/fileupload').post(controller.fileupload);
router.route('/registerNets').post(controller.registerNets);

module.exports = router;