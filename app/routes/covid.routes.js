const express = require('express');
const router = express.Router();

const controller = require("../controllers/covid.controller.js");

router.route('/info').get(controller.info);
router.route('/create').post(controller.create);
router.route('/get').post(controller.getById);
router.route('/detail').post(controller.getBySlug);
router.route('/getAll').get(controller.getAll);
router.route('/update').post(controller.update);
router.route('/delete').post(controller.delete);

module.exports = router;