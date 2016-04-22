'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Leave Schema
 */
var LeaveSchema = new Schema({
	// Leave model fields   
	// ...
	 userid:Schema.Types.ObjectId,
        date:Date,
        leavetype:String,
        monthdata:Array,
        leavestauts:String,
        status:String
});

mongoose.model('Leave', LeaveSchema);