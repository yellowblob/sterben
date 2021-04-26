const express = require('express');
const router = express.Router();
var user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', user_controller.init);

router.get('/board', user_controller.board);

module.exports = router;