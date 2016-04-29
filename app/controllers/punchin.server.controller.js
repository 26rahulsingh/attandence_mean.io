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

		var month1=d.getMonth();
		
		var month=month1+1;
		//console.log('zzzzzzzzzzzzzzzzzzzzzzzzzz',month);
		var year=d.getFullYear();
		
		console.log(userid);
		console.log(timein);
		console.log(ipaddress);
		console.log(date);
		console.log('month',month);
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
			//res.status(201).json(punchin);
			Punchin.aggregate([{$match:{userid:mongoose.Types.ObjectId(userid)}},{$sort:{date:-1}}],function(err,result){
								if(err){
									console.log(err);
								}else{
									
										//,{$sort:{date:-1}}
										//console.log("result aaaaaaa",result);
										var lasttimein=result[0].timein;
										var date=result[0].date;
										var lasttimeout=result[0].timeout;
										console.log('new result',result);
									    console.log('lasttimein',lasttimein);
									    console.log('date',date);
//<<<<<<< HEAD
										//res.json({'lasttimein':lasttimein,'date':date});


										if(month==1){
					Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',leavetype:'CL',monthdata:{$in:[{year:year,month:1},{year:year-1,month:10},{year:year-1,month:12},{year:year-1,month:11}]}}, function(err, result1) {
                         if(err){
                         	console.log(err);
                         }else{

                         	//console.log('result',result);
                         	//console.log('resultlength',result1.length);
                         	 res.json({'lasttimein':lasttimein,'date':date,'resultlength':result1.length});
                         	//res.json({'result':result,'resultlength':result1.length});
                         }
					});
				}

					if(month==2){
					Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',leavetype:'CL',monthdata:{$in:[{year:year,month:1},{year:year,month:2},{year:year-1,month:12},{year:year-1,month:11}]}}, function(err, result1) {
                         if(err){
                         	console.log(err);
                         }else{

                         	//console.log('result',result);
                         	console.log('resultlength',result1.length);
                         	  	res.json({'lasttimein':lasttimein,'date':date,'resultlength':result1.length});
                         	//res.json({'result':result,'resultlength':result1.length});
                         }
					});
				}

				if(month==3){
					Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',leavetype:'CL',monthdata:{$in:[{year:year,month:1},{year:year,month:3},{year:year,month:2},{year:year-1,month:12}]}}, function(err, result1) {
                         if(err){
                         	console.log(err);
                         }else{

                         	//console.log('result',result);
                         	console.log('resultlength',result1.length);
                         	  	res.json({'lasttimein':lasttimein,'date':date,'resultlength':result1.length});
                         	//res.json({'result':result,'resultlength':result1.length});
                         }
					});
				}

				if(month>3){
					Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',leavetype:'CL','monthdata.year':year,'monthdata.month':{$in:[month-1,month-2,month-3,month]}}, function(err, result1) {
                         if(err){
                         	console.log(err);
                         }else{
                         	console.log('call');
                         	
                         	//console.log('result',result);
                         	console.log('resultlength',result1.length);
                         	res.json({'lasttimein':lasttimein,'date':date,'resultlength':result1.length});
                         	//res.json({'result':result,'resultlength':result1.length});
                         }
					});
				}




//=======
										//res.json({'lasttimein':lasttimein,'lasttimeout':lasttimeout,'date':date});
//>>>>>>> 0f60b988c0ce09ba7a41c6b81847c2f710fa91cd

								}
							});

		}
	});
	   

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
		    		//res.json({message:'update succesfully'});
		    		Punchin.aggregate([{$match:{userid:mongoose.Types.ObjectId(userid)}},{$sort:{date:-1}}],function(err,result){
						if(err){
							console.log(err);
						}else{
							
								//,{$sort:{date:-1}}
								//console.log("result aaaaaaa",result);
								var lasttimein=result[0].timein;
								var date=result[0].date;
								var lasttimeout=result[0].timeout;
								console.log('new result',result);
							    console.log('lasttimein',lasttimein);
							    console.log('date',date);
								res.json({'lasttimein':lasttimein,'lasttimeout':lasttimeout,'date':date});

						}
					});

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