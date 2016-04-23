'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
 errorHandler = require('./errors.server.controller'),
    Punchin = mongoose.model('Punchin'),
    Leave = mongoose.model('Leave'),
    _ = require('lodash');

/**
 * Create a Getattendence
 */
exports.create = function(req, res) {

};

/**
 * Show the current Getattendence
 */
exports.read = function(req, res) {
	var userid=req.body.userid;
	  Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'false'},{userid:1,date:1,_id:0}, function(err, result) {
     		 			//console.log("helolo");

		  		if (err){
		   		throw err;
				}else{
				res.json({'result':result});
		  		}
			});


};

/**
 * Update a Getattendence
 */
exports.update = function(req, res) {

};

/**
 * Delete an Getattendence
 */
exports.delete = function(req, res) {

};

/**
 * List of Getattendences
 */
exports.list = function(req, res) {
			var userid=req.body.userid;
			console.log(userid);
			var d=new Date();
			var date =d.toISOString();
			console.log('date new',date);
			
		
			 var newdate=date.toString().slice(0,10);
			 console.log('newdate',newdate);
			 var   y = d.getFullYear();
			 var  m = d.getMonth();
             var firstDay = new Date(y, m, 1);
             console.log('firstDay',firstDay);

             var startday=firstDay.toISOString().slice(0,10);
			 console.log('startday',startday);
     		 Punchin.find({userid:mongoose.Types.ObjectId(userid),date:{$gte:startday,$lte:newdate}},{date:1,status:1,timein:1,_id:0}, function(err, result) {
     		 			//console.log("helolo");

		  		if (err){
		   		throw err;
				}else{
					var result1=result;
					console.log('result1',result1);
					 Leave.find({userid:mongoose.Types.ObjectId(userid),date:{$gte:startday,$lte:newdate}},{date:1,status:1,_id:0}, function(err, result) {
					 	if(err){
					 		throw err;
					 	}else{
					 		var result2=result;
					 		// var result3=result1+result2;
					 		res.json({'result1':result1,'result2':result2});
					 		//res.json({"result3":result3});
					 	}
					 });

				//res.json({"result":result});
		  		}
			});

};