'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Holiday Schema
 */
var HolidaySchema = new Schema({
	// Holiday model fields   
	// ...
	 	date:String,
        day:String,
        holidayname:String
});

mongoose.model('Holiday', HolidaySchema);