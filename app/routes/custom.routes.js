const express = require('express');
const router = express.Router();

const controller = require("../controllers/custom.controller.js");

router.route('/fileupload').post(controller.fileupload);
router.route('/registerNets').post(controller.registerNets);
router.route('/registerTreatment').post(controller.registerTreatment);
router.route('/customers').get(controller.customers);
module.exports = router;