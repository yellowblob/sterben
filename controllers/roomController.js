const rooms = require('../models/room');

const bbb = require('bigbluebutton-js');
const http = bbb.http

exports.reloadRooms = function(req, res) {
    rooms.deleteMany({}, function(err, result) {
        console.log(err);
    });
    const api = bbb.api(
        process.env.HOST,
        process.env.SECRET,
    );
    const meetingsUrl = api.monitoring.getMeetings();
    http(meetingsUrl).then((result) => {
        for (let i = 0; i < result.meetings.length; i++) {
            room = result.meetings[i];
            if (room.isBreakout === true) {
                rooms.create({ meetingID: room.meetingID, attendeePW: room.attendeePW, meetingName: room.meetingName });
            }
        }
    });
    res.json({ "status": "go" })
}

exports.openRooms = function(req, res) {
    rooms.updateMany({}, { occupied: false }, () => {});
    res.json({ "status": "go" })
}