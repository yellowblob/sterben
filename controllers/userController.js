const users = require('../models/user');

const bbb = require('bigbluebutton-js');
const http = bbb.http

const levelmap = require("./levelmap.json");
const html = require("../views/html.json")

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
                        .json({ status: "go", level: user.level, html: html[1] });
                    user.save();
                }
            });
        } else {
            res.json({ status: "go", level: 0, html: html[0] });
        }
    } else {
        users.findById(req.cookies.user, function(err, user) {
            user.lastRequest = Date.now();
            // send user to boarding queue if cookie is present
            if (user.level === 0) {
                user.level = 1;
            }
            //send user to boarding queue if reloaded while boarding
            if (req.query.reload && user.level === 2) {
                user.level = 1;
            }
            user.save(() => {
                let level = user.level;
                switch (level) {
                    case 1:
                        boarding_queue(req, res, user);
                        break;
                    case 2:
                        boarding_room(req, res, user);
                        break;
                    case 3:
                        wait_before_bus(req, res, user);
                        break;
                    case 4:
                        bus_journey(req, res, user);
                        break;
                    case 5:
                        scan_questionnaire(req, res, user);
                        break;
                    case 6:
                        cemetry(req, res, user);
                        break;
                    case 7:
                        after_talk(req, res, user);
                        break;
                    default:
                        res.status(404);
                }
            });

        });
    }
}

// ******* 1 boarding queue ******* //
function boarding_queue(req, res, user) {
    if (req.query.reload) {
        res.json({ status: "go", level: user.level, html: html[1] });
    } else {
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
                            res.json({ status: "go", level: user.level, url: attendeeUrl, html: html[user.level] });
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
    if (levelChange(user)) {}
}

// ******* 2 boarding room ******* //
function boarding_room(req, res, user) {
    res.json({ status: "wait", level: user.level });
    if (levelChange(user)) {}
}

// ******* 3 Waiting in front of the bus ******* //
function wait_before_bus(req, res, user) {
    users.countDocuments((err, count) => {
        let userCount = count;
        users.countDocuments({ level: 3 }, (err, count) => {
            let boardingCount = count;
            if (levelChange(user)) {
                res.json({ status: "go", level: user.level, html: html[user.level], users: userCount, boarded: boardingCount });
            } else {
                res.json({ status: "wait", level: user.level, users: userCount, boarded: boardingCount });
            }

        });
    });
}


// ******* 4 Bus Journey ******* //
function bus_journey(req, res, user) {
    if (levelChange(user) || req.query.reload) {
        res.json({ status: "go", level: user.level, html: html[user.level] })
    } else {
        user.playbackTime = req.query.playbackTime;
        user.save();
        res.json({ status: "wait", level: user.level })
    }
}

// ******* 5 questionnaire ******* //
function questionnaire(req, res, user) {
    if (levelChange(user) || req.query.reload) {
        res.json({ status: "go", level: user.level, html: html[user.level] })
    } else {
        user.playbackTime = req.query.playbackTime;
        user.save();
        res.json({ status: "wait", level: user.level })
    }
}

function after_talk(req, res, user) {
    const meetingID = process.env.MEETING_ID;
    const attendeePW = process.env.ATTENDEE_PW;
    const api = bbb.api(
        process.env.HOST,
        process.env.SECRET
    );
    const attendeeUrl = api.administration.join(req.cookies.user, meetingID, attendeePW);
    res.json({ status: "go", level: user.level, url: attendeeUrl });
}

function levelChange(user) {
    if (user.level != user.prevLevel) {
        user.prevLevel = user.level;
        user.save();
        return true;
    } else {
        return false;
    }
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

exports.startJourney = function(req, res) {
    console.log("startJourney");
    users.updateMany({ active: true }, { level: 4 }, function(err, res) {});
    res.json({ status: "go" });
}