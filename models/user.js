// File: ./models/user.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
	ticketId: String,
    sessionStart: Number,
    lastRequest: Number,
    active: {type: Boolean, default: true},
    level: {type: Number, default: 0},
    prevLevel: {type: Number, default: 0},
    boardingRoom: String,
    playbackTime: Number,
    playbackTime2: Number,
    videoId: String
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('user', userSchema);