'use strict';

/**
 * Module dependencies.
 */
	var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Punchin = mongoose.model('Punchin'),
    _ = require('lodash');

/**
 * Create a Category
 */
exports.create = function(req, res) {
		var userid=req.body.userid;
        var d=new Date();
        var date =d.toISOString();
		var ipaddress=req.body.ipaddress;
		var t1=d.getHours();
		var t2=d.getMinutes();
		var timein=t1+':'+t2;
		
		console.log(userid);
		console.log(timein);
		console.log(ipaddress);
		console.log(date);
		var punchin=new Punchin({
	    	userid:userid,
	    	date:date,
	    	timein:timein,
	    	timeout:false,
	    	ipaddress:ipaddress,
	    	status:'Present'

	    
	    });
	    punchin.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(punchin);
		}
	});
	   


	// Punchin.save(function(err) {
	// 	if (err) {
	// 		return res.status(400).send({
	// 			message: errorHandler.getErrorMessage(err)
	// 		});
	// 	} else {
	// 		res.status(201).json(category);
	// 	}
	// });
};

/**
 * Show the current Category
 */
exports.read = function(req, res) {

};

/**
 * Update a Category
 */
exports.update = function(req, res) {
			var userid=req.body.userid;
			var d=new Date();
			var date =d.toISOString();
			console.log('date new',date);
			var t1=d.getHours();
			var t2=d.getMinutes();
			var timeout=t1+':'+t2;
		
			 var newdate=date.toString().slice(0,10);
			 console.log('newdate',newdate);
			 console.log('timeout',timeout);
			 Punchin.update({userid:mongoose.Types.ObjectId(userid),date:{ '$gte': newdate}},{$set:{timeout:timeout}},function(err){
		    	if(err){
		    		res.json({message:'data not saved'+err});
		    	}else{
		    		res.json({message:'update succesfully'});
		    	}
		    }) ;
		
			

};

/**
 * Delete an Category
 */
exports.delete = function(req, res) {

};

/**
 * List of Categories
 */
exports.list = function(req, res) {
    Punchin.find().exec(function(err, result) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(result);
        }
    });
};