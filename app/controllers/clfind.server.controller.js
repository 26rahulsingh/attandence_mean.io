'use strict';

/**
 * Module dependencies.
 */
	var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    //Punchin = mongoose.model('Punchin'),
    Leave = mongoose.model('Leave'),
    _ = require('lodash');

/**
 * Create a Category
 */
exports.create = function(req, res) {
		var userid=req.body.userid;
		var date =new Date(req.body.date);
		var leavetype=req.body.leavetype;
		var date1=new Date();
		console.log('userid',userid);
		console.log('date',date);
		console.log('leavetype',leavetype);
		console.log('date1',date1);
		var d1= date.toISOString();
 //console.log('date new', date);

       var newdate1 = d1.toString().slice(0, 10);
       //console.log('date new', date);
        console.log('newdate1', newdate1);
       var d2= date1.toISOString();


       var newdate2 = d2.toString().slice(0, 10);
       console.log('newdate2', newdate2);
       var month1=date.getMonth();
		//console.log(userid);
		//console.log('date is',date);
		//console.log( leavetype);
		var month=month1+1;
		console.log('month',month);
		var year=date.getFullYear();
		var newleave=new Leave({
	    	userid:userid,
	    	date:date,
	    	leavetype:leavetype,
	    	monthdata:[{month:month,year:year}],
	    	leavestauts:'grant',
	    	status:'Absent'
	   
	    });

       if(newdate1==newdate2)
       {
       	newleave.save(function(err,result){
							if(err){
								console.log(err);
		    					
		    				}else{
		    						//senddata();
		    					//console.log('result',result);
		    					res.json({'msg':'succesfully leave apply1'});
		    					//senddata(userid);
		    				}
		   				 });
		
       	


       }else{
       	res.json({'msg':'you are not permited for leave'})
       }

		
	   

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
    
};