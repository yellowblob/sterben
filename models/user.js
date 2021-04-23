// File: ./models/user.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
    sessionStart: Number,
    lastRequest: Number,
    active: {type: Boolean, default: true},
    boarded: {type: Boolean, default: false},
    enteredMain: {type: Boolean, default: false},
    boardingRoom: String
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('user', userSchema);