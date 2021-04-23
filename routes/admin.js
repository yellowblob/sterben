var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('admin', { title: 'Besser Sterben - eine Testfahrt mit dem Tod' });
});

router.get('/refresh', user_controller.getUsersBoarding);

router.get('/setmain', user_controller.sendUser2MainRoom);

module.exports = router;