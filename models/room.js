// File: ./models/user.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var roomSchema = new Schema({
	meetingID: String,
    attendeePW: String,
    meetingName: String,
    occupied: {type: Boolean, default: true},
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('room', roomSchema);