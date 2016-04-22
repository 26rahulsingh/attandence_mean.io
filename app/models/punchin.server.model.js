'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Punchin Schema
 */
var PunchinSchema = new Schema({
	// Punchin model fields   
	// ...
		userid:Schema.Types.ObjectId,
        date:Date,
        timein:String,
        timeout:String,
        ipaddress:String,
        status:String
	
});

mongoose.model('Punchin', PunchinSchema);