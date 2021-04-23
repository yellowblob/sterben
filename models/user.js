// File: ./models/user.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstContact: Number,
    lastRequest: Number,
    active: Boolean,
    boarded: Boolean,
    enteredMain: Boolean,
    boardingRoom: String
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('user', userSchema);