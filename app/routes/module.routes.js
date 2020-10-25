const express = require('express');
const router = express.Router();

const controller = require("../controllers/module.controller.js");

router.route('/create').post(controller.create);
router.route('/get').post(controller.get);
router.route('/update').post(controller.update);
router.route('/delete').post(controller.delete);

module.exports = router;