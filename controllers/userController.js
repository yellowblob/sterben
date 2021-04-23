const users = require('../models/user');

const bbb = require('bigbluebutton-js');
const http = bbb.http

exports.init = function(req, res) {
    var initialUser = {
        sessionStart: Date.now(),
        lastRequest: Date.now(),
    }
    if (!req.cookies.user) {
        users.create(initialUser, function(err, user) {
            if (err) return handleError(err);
            console.log(user._id);
            res
                .cookie('user', user._id, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true })
                .render('index', { title: 'Besser Sterben - eine Testfahrt mit dem Tod' });
        });
    } else {
        res.render('index', { title: 'Besser Sterben - eine Testfahrt mit dem Tod' });
    }
};

exports.board = function(req, res) {
    users.findById(req.cookies.user, function(err, user) {
        users.find({ sessionStart: { $lt: user.sessionStart }, boarded: false, active: true }, function(err, queue) {
            if (queue.length === 0) {
                const api = bbb.api(
                    process.env.HOST,
                    process.env.SECRET,
                );
                const meetingsUrl = api.monitoring.getMeetings();

                http(meetingsUrl).then((result) => {
                    let sendMeeting = false;
                    for (let i = 0; i < result.meetings.length; i++) {
                        room = result.meetings[i];
                        if (room.participantCount === 1 && room.isBreakout === true) {
                            const attendeeUrl = api.administration.join(req.cookies.user, room.meetingID, room.attendeePW);
                            res.json({ status: "go", url: attendeeUrl });
                            sendMeeting = true;
                            user.boarded = true;
                            user.room = room.meetingName;
                        }
                    }
                    if (!sendMeeting) {
                        res.json({ status: "wait", queue: queue.length });
                    }
                    user.lastRequest = Date.now();
                    user.save();
                });
            } else {
                res.json({ status: "wait", queue: queue.length });
                user.lastRequest = Date.now();
                user.save();
            }

        });
    });
}

exports.main = function(req, res) {
    users.findById(req.cookies.user, function(err, user) {
        if (user.enteredMain === true) {
            const meetingID = process.env.MEETING_ID;
            const attendeePW = process.env.ATTENDEE_PW;
            const api = bbb.api(
                process.env.HOST,
                process.env.SECRET
            );
            const attendeeUrl = api.administration.join(req.cookies.user, meetingID, attendeePW);
            res.json({ status: "go", url: attendeeUrl });
        } else {
            res.json({ status: "wait" });
        }
    });
}

exports.getUsersBoarding = function(req, res) {
    users.find({ boarded: true, enteredMain: false }, '_id boardingRoom', function(err, boardingUsers) {
        res.json(boardingUsers);
    });
}

exports.sendUser2MainRoom = function(req, res) {
    users.findByIdAndUpdate(req.query.id, { enteredMain: true }, () => {
        res.status(200);
    });
}