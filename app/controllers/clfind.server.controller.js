'use strict';

/**
 * Module dependencies.
 */
	var mongoose = require('mongoose'),
	nodemailer = require('nodemailer'),
    errorHandler = require('./errors.server.controller'),
    User = mongoose.model('User'),
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
    var today=date.getDate();
    console.log('today',today);
     var today1=date1.getDate();
    console.log('today1',today1);
    console.log('today2',today1+1);
	// 	var d1= date.toISOString();
 // //console.log('date new', date);

 //       var newdate1 = d1.toString().slice(0, 10);
 //       //console.log('date new', date);
 //        console.log('newdate1', newdate1);
 //       var d2= date1.toISOString();


 //       var newdate2 = d2.toString().slice(0, 10);
 //       console.log('newdate2', newdate2);
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

       if(today==today1||today==today1+1)
       {

        Leave.find({userid:mongoose.Types.ObjectId(userid),leavetype:'SL','monthdata.year':year,'monthdata.month':month}, function(err, result) {
            if(err){
                console.log(err);
            }else{
                if(result==''){
                    console.log('newleave call');
                    newleave.save(function(err,result){
                            if(err){
                             console.log(err);
                            }else{
                                senddata(userid);
                             
                            }
                      });


                }else{
                    console.log('result',result);
                    console.log('sl exclede');
                    res.json({'msg':'sl exclede'})
                }
            }

        })
        }else{
            console.log('not for future use');
        res.json({'msg':'you are not permited for leave'})
       }



         	function senddata(userid){
    	console.log("send mail call");
    	//console.log('objectid',objectid);
    	//console.log('leavelenght',leavelenght);
    	console.log('date',date);
    	User.find({_id:mongoose.Types.ObjectId(userid)},function(err,result){
    		if(err){
    			console.log("err",err);
    		}else{
    			var displayname=result[0].displayName;
    			//console.log('my userid',userid);
    			//console.log(result[0].password);
    		
   var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vikasmahajan2424@gmail.com',//result[0].email, // Your email id
            pass: '7354642424'//result[0].password // Your password
        }
    });
   var msg = 'Name '+displayname+'<br>date '+date+'<br>';
   var mailOptions = {
    from: 'vikasmahajan2424@gmail.com',//result[0].email, // sender address
    to: 'vishalnashani24@gmail.com', // list of receivers
    subject: 'For Sick Leave', // Subject line
    text:displayname ,// // plaintext body
    html:  msg 
            };

    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        //res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({'msg': 'succesfully leave apply1','info':info.response});
    };
});
    }

     });
     //})
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