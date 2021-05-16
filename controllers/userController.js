const users = require('../models/user');
const rooms = require('../models/room');
const ejs = require('ejs');

const bbb = require('bigbluebutton-js');
const http = bbb.http

const levelmap = require("./levelmap.json");
const html = require("../views/html.json")
const help = require("../views/help.json")

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
                    user.level = user.level === 0 ? 1 : user.level;
                    res
                        .cookie('user', user._id, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true, SameSite: "strict" })
                        .json({ status: "go", level: user.level, html: html[1], help: help[1] });
                    user.save();
                }
            });
        } else {
            res.json({ status: "go", level: 0, html: html[0], help: help[0] });
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
            if (req.query.playback) {
                if (user.level < 5) {
                    user.level = 5;
                } else {
                    user.level = 7;
                }
            }
            if (req.query.videoId) {
                user.level = 6;
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
        res.json({ status: "go", level: user.level, html: html[user.level], help: help[user.level] });
    } else {
        users.find({ sessionStart: { $lt: user.sessionStart }, level: 1, active: true }, function(err, queue) {
            if (queue.length === 0) {
                rooms.findOne({ occupied: false }, (err, room) => {
                    if (room) {
                        room.occupied = true;
                        room.save();
                        const api = bbb.api(
                            process.env.HOST,
                            process.env.SECRET,
                        );
                        const attendeeUrl = api.administration.join(user.name, room.meetingID, room.attendeePW);
                        user.level = 2;
                        res.json({ status: "go", level: user.level, url: attendeeUrl, html: html[user.level], help: help[user.level] });
                        user.boardingRoom = room.meetingName;
                        user.boardingRoomId = room.meetingID;
                        user.save();
                    } else {
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
            if (levelChange(user) || req.query.reload) {
                res.json({ status: "go", level: user.level, html: html[user.level], users: userCount, boarded: boardingCount, help: help[user.level] });
            } else {
                res.json({ status: "wait", level: user.level, users: userCount, boarded: boardingCount });
            }

        });
    });
}


// ******* 4 Bus Journey ******* //
function bus_journey(req, res, user) {
    let change = levelChange(user);
    if (change || req.query.reload) {
        let reload = req.query.reload && !change ? true : false;
        console.log(reload);
        let playbackTime = user.playbackTime ? user.playbackTime : 0;
        res.json({ status: "go", level: user.level, html: html[user.level], playbackTime: playbackTime, help: help[user.level], reload: reload });
    } else {
        user.playbackTime = req.query.playbackTime;
        user.save();
        res.json({ status: "wait", level: user.level })
    }
}

// ******* 5 questionnaire ******* //
function scan_questionnaire(req, res, user) {
    if (levelChange(user) || req.query.reload) {
        res.json({ status: "go", level: user.level, html: html[user.level], help: help[user.level] });
    } else {

    }
}

// ******* 6 cemetry ******* //
function cemetry(req, res, user) {
    if (req.query.videoId) {
        user.videoId = req.query.videoId;
        user.prevLevel = user.level;
        user.save();
        let reload = req.query.reload ? true : false;
        res.json({ status: "go", level: user.level, html: html[user.level], videoId: user.videoId, name: user.name, help: help[user.level] });

    } else if (req.query.reload) {
        let reload = req.query.reload ? true : false;
        res.json({ status: "go", level: user.level, html: html[user.level], videoId: user.videoId, reload: reload, name: user.name, help: help[user.level] });
    } else {
        user.playbackTime = req.query.playbackTime;
        user.playbackTime2 = req.query.playbackTime2;
        res.json({ status: "wait", level: user.level });
        user.save();
    }
}

// ******* 7 after talk ******* //
function after_talk(req, res, user) {
    const meetingID = process.env.MEETING_ID;
    const attendeePW = process.env.ATTENDEE_PW;
    const api = bbb.api(
        process.env.HOST,
        process.env.SECRET
    );
    const attendeeUrl = api.administration.join(user.name, meetingID, attendeePW);
    let html = "";
    console.log(attendeeUrl);
    ejs.renderFile('views/7_after_talk.ejs', { attendeeUrl: attendeeUrl }, function(err, str) {
        console.log(err);
        console.log(str);
        html = str;
    });
    res.json({ status: "go", level: user.level, url: attendeeUrl, html: html, help: help[user.level] });
}

function levelChange(user) {
    if (user.level != user.prevLevel) {
        user.prevLevel = user.level;
        user.save(() => {
            return true;
        })
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
    users.findById(req.query.id, (err, user) => {
        user.level = 3;
        user.save();
        rooms.findOne({ meetingID: user.boardingRoomId }, (err, room) => {
            room.occupied = false;
            room.save();
            res.json({ status: "go" });
        });
    });
}

exports.startJourney = function(req, res) {
    console.log("startJourney");
    users.updateMany({ active: true }, { level: 4 }, function(err, res) {});
    res.json({ status: "go" });
}