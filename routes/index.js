const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUrl = "mongodb://localhost:27017/";
const bbb = require('bigbluebutton-js');
const http = bbb.http

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.cookies.userID) {
        MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sterben");
            var user = {
                sessionTime: Date.now(),
                boarded: false,
                main: false,
                room: null
            };
            dbo.collection("onboarding").insertOne(user, function(err, result) {
                if (err) console.log(err);
                res
                    .cookie('userID', result.insertedId, { httpOnly: true })
                    .render('index', { title: 'Besser Sterben - eine Testfahrt mit dem Tod' });
                db.close();
            });
        });
    } else {
        res.render('index', { title: 'Besser Sterben - eine Testfahrt mit dem Tod' });
    }
});

router.get('/board', function(req, res, next) {
    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sterben");
        dbo.collection("onboarding").findOne({ _id: new mongo.ObjectID(req.cookies.userID) }, function(err, user) {
            if (err) throw err;
            dbo.collection("onboarding").find({ sessionTime: { $lt: user.SessionTime }, boarded: false }).toArray(function(err, queue) {
                console.log(queue);
                if (queue.length === 0) {
                    const api = bbb.api(
                        process.env.HOST,
                        process.env.SECRET,
                    );
                    const meetingsUrl = api.monitoring.getMeetings();

                    http(meetingsUrl).then((result) => {
                        console.log(result);
                        let sendMeeting = false;
                        for (let i = 0; i < result.meetings.length; i++) {
                            console.log(i);
                            room = result.meetings[i];
                            if (room.participantCount === 1 && room.isBreakout === true) {
                                console.log("Treffer");
                                let fullName = user._id;
                                console.log(user._id);
                                const attendeeUrl = api.administration.join(req.cookies.userID, room.meetingID, room.attendeePW);
                                console.log(attendeeUrl);
                                res.json({ status: "go", url: attendeeUrl });
                                var newValues = { $set: { boarded: true, room: room.meetingName } };
                                sendMeeting = true;
                                dbo.collection("onboarding").updateOne({ _id: new mongo.ObjectID(req.cookies.userID) }, newValues, function(err, res) {
                                    console.log("1 document updated");
                                    db.close();
                                });
                            }
                        }
                        if (!sendMeeting) {
                            res.json({ status: "wait", queue: queue.length });
                            db.close();
                        }
                    });
                } else {
                    res.json({ status: "wait", queue: queue.length });
                    db.close()
                }

            });
        });
    });
});

router.get('/main', function(req, res, next) {
    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sterben");
        dbo.collection("onboarding").findOne({ _id: new mongo.ObjectID(req.cookies.userID) }, function(err, user) {
            if (user.main === true) {
                const meetingID = process.env.MEETING_ID;
                const attendeePW = process.env.ATTENDEE_PW;
                const api = bbb.api(
                    process.env.HOST,
                    process.env.SECRET
                );
                const attendeeUrl = api.administration.join(req.cookies.userID, meetingID, attendeePW);
                res.json({ status: "go", url: attendeeUrl });
            } else {
                res.json({ status: "wait" });
            }
            db.close();
        });
    });
});

module.exports = router;