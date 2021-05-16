// File: ./models/user.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var adminSchema = new Schema({
	ticketId: String,
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('admin', adminSchema);