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
	var date =new Date();
		
		var month1=date.getMonth();
		
		var month=month1+1;
		//console.log('zzzzzzzzzzzzzzzzzzzzzzzzzz',month);
		var year=date.getFullYear();
		
	  Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'false'},{userid:1,date:1,_id:0}, function(err, result) {
     		 			//console.log("helolo");

		  		if (err){
		   		throw err;
				}else{
					if(month==1){
					Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',monthdata:{$in:[{year:year,month:1},{year:year-1,month:10},{year:year-1,month:12},{year:year-1,month:11}]}}, function(err, result1) {
                         if(err){
                         	console.log(err);
                         }else{

                         	//console.log('result',result);
                         	//console.log('resultlength',result1.length);
                         	res.json({'result':result,'resultlength':result1.length});
                         }
					});
				}

					if(month==2){
					Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',monthdata:{$in:[{year:year,month:1},{year:year,month:2},{year:year-1,month:12},{year:year-1,month:11}]}}, function(err, result1) {
                         if(err){
                         	console.log(err);
                         }else{

                         	//console.log('result',result);
                         	//console.log('resultlength',result1.length);
                         	res.json({'result':result,'resultlength':result1.length});
                         }
					});
				}

				if(month==3){
					Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',monthdata:{$in:[{year:year,month:1},{year:year,month:3},{year:year,month:2},{year:year-1,month:12}]}}, function(err, result1) {
                         if(err){
                         	console.log(err);
                         }else{

                         	//console.log('result',result);
                         	//console.log('resultlength',result1.length);
                         	res.json({'result':result,'resultlength':result1.length});
                         }
					});
				}

				if(month>3){
					Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant','monthdata.year':year,'monthdata.month':{$in:[month-1,month-2,month-3,month]}}, function(err, result1) {
                         if(err){
                         	console.log(err);
                         }else{
                         	//console.log('call')
                         	console.log('result',result);
                         	console.log('resultlength',result1.length);
                         	res.json({'result':result,'resultlength':result1.length});
                         }
					});
				}


				//res.json({'result':result});
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
			 var day=d.getDate();
			 console.log('day',day+1);
             var firstDay = new Date(y, m, 2);
             var endday=new Date(y,m,day+2);
             console.log('endday',endday);
             var endday1=endday.toISOString().slice(0,10);
             console.log('endday1',endday1);
             console.log('firstDay',firstDay);

             var lastday = new Date(y, m+1 , 1);

             var startday=firstDay.toISOString().slice(0,10);
			 console.log('startday',startday);
     		 Punchin.find({userid:mongoose.Types.ObjectId(userid),date:{$gte:startday,$lte:lastday}},{date:1,status:1,timein:1,_id:0,timeout:1}, function(err, result) {
     		 			//console.log("helolo");

		  		if (err){
		   		throw err;
				}else{
					var result1=result;
					console.log('result1',result1);
					 Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',date:{$gte:startday,$lte:lastday}},{date:1,status:1,_id:0}, function(err, result) {
					 	if(err){
					 		throw err;
					 	}else{
					 		var result2=result;
					 		 //var result3=result1+result2;
					 		 console.log('result2',result2);
					 		res.json({'result1':result1,'result2':result2});
					 		//res.json({"result3":result3});
					 	}
					 });

				//res.json({"result":result});
		  		}
			});

};