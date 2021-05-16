const admins = require('../models/admin');

var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');
var room_controller = require('../controllers/roomController');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.query.firstLoad) {
    	console.log("firstLoad");
        res.json({ status: "go" });
    } else {
        if (!req.cookies.admin) {
            if (req.query.ticketId) {
            	console.log(req.query.ticketId);
                admins.findOne({ ticketId: req.query.ticketId }, function(err, admin) {
                    if (err) {
                    	console.log("error");
                        res.json({ status: "rejected" });
                    } else {
                    	console.log("granted");
                        res
                            .cookie('admin', admin._id, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true, SameSite: "strict" })
                            .json({ status: 'access' });
                    }
                });
            } else {
                res.render('adminLogin');
            }
        } else {
            admins.findById(req.cookies.admin, function(err, admin) {
                if (err) {
                    res.json({ status: "rejected" });
                } else {
                    res.render('admin', { title: 'Besser Sterben - Admin Konsole' });
                }
            });
        }
    }
});

router.get('/refresh', user_controller.getUsersBoarding);

router.get('/setmain', user_controller.sendUser2MainRoom);

router.get('/startJourney', user_controller.startJourney);

router.get('/reloadRooms', room_controller.reloadRooms);

router.get('/openRooms', room_controller.openRooms);

module.exports = router;