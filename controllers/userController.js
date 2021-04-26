const users = require('../models/user');

const bbb = require('bigbluebutton-js');
const http = bbb.http

const levelmap = require("./levelmap.json");

exports.init = function(req, res) {
    res.render('index');
};

exports.board = function(req, res) {
    if (!req.cookies.user) {
        if (req.query.ticketId) {
            users.findOne({ ticketId: req.query.ticketId }, function(err, user) {
                if (err || user === null) {
                    console.log(err);
                    res.json({ status: "rejected", level: 0 });
                } else {
                    user.sessionStart = Date.now();
                    user.lastRequest = Date.now();
                    user.level = 1;
                    res
                        .cookie('user', user._id, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true, SameSite: "strict" })
                        .json({ status: "go", level: user.level });
                    user.save();
                }
            });
        } else {
            res.json({ status: "go", level: 0 });
        }
    } else {
        users.findById(req.cookies.user, function(err, user) {
        	user.lastRequest = Date.now();
        	user.save();
            let level = user.level;
            switch (level) {
                case 1:
                    boarding_queue(req, res, user);
                    break;
                case 2:
                    boarding_room(req, res, user);
                    break;
                case 3:
                    main_room(req, res, user);
                    break;
                default:
                    res.status(404);
            }

        });
    }
}

function boarding_queue(req, res, user) {
    users.find({ sessionStart: { $lt: user.sessionStart }, level: 1, active: true }, function(err, queue) {
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
                        sendMeeting = true;
                        user.level = 2;
                        res.json({ status: "go", level: user.level, url: attendeeUrl });
                        user.boardingRoom = room.meetingName;
                        user.save();
                    }
                }
                if (!sendMeeting) {
                    res.json({ status: "wait", level: user.level, queue: queue.length });
                }      
            });
        } else {
            res.json({ status: "wait", level: user.level, queue: queue.length });
        }

    });
}

function boarding_room(req, res, user) {
    res.json({ status: "wait", level: user.level });
}

function main_room(req, res, user) {
    const meetingID = process.env.MEETING_ID;
    const attendeePW = process.env.ATTENDEE_PW;
    const api = bbb.api(
        process.env.HOST,
        process.env.SECRET
    );
    const attendeeUrl = api.administration.join(req.cookies.user, meetingID, attendeePW);
    res.json({ status: "go", level: user.level, url: attendeeUrl });
}

///////////// admin section //////////////////

exports.getUsersBoarding = function(req, res) {
    users.find({ level: 2 }, '_id boardingRoom', function(err, boardingUsers) {
        res.json(boardingUsers);
    });
}

exports.sendUser2MainRoom = function(req, res) {
    users.findByIdAndUpdate(req.query.id, { level: 3 }, () => {
        res.status(200);
    });
}