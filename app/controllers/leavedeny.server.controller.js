'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Leave = mongoose.model('Leave'),
nodemailer = require('nodemailer'),
User = mongoose.model('User'),
    _ = require('lodash');

/**
 * Create a Leavedeny
 */
exports.create = function(req, res) {

};

/**
 * Show the current Leavedeny
 */
exports.read = function(req, res) {

};

/**
 * Update a Leavedeny
 */
exports.update = function(req, res) {

};

/**
 * Delete an Leavedeny
 */
exports.delete = function(req, res) {
	var ObjectId = req.body.ObjectId;
	console.log('ObjectId',ObjectId);
 
 Leave.find({_id: mongoose.Types.ObjectId(ObjectId)},function(err,result){
 	if (err) {
         res.json({ message: 'data not saved' + err });
 	}else{
 		console.log('result',result);
 		console.log(result[0].userid);
 		console.log(result[0].date);
 		var userid=result[0].userid;
 		var newdate=result[0].date;
 	

 Leave.remove({ _id: mongoose.Types.ObjectId(ObjectId) }, function(err) {
     if (err) {
         res.json({ message: 'data not saved' + err });
     } else {
     	console.log('remove succesfully');
     	//sendmail(userid,newdate);
     	console.log('userid',userid);
     	console.log('newdate',newdate);
     	sendmail(userid,newdate);

     	
        // res.json({ message: 'remove succesfully' });
 //     }
 // });

 // }
 // });
 function sendmail(userid,newdate){
    	console.log("send mail call");
    	console.log(userid);
    	//console.log('naw',newdate);
    	var date=newdate;
    	console.log('date',date);
    	User.find({_id:mongoose.Types.ObjectId(userid)},function(err,result){
    		if(err){
    			console.log("err",err);
    		}else{
    			var email=result[0].email;
    			console.log('email',email);
    			//console.log(result[0].password);
    		
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vikasmahajan2424@gmail.com',//result[0].email, // Your email id
            pass: '7354642424'//result[0].password // Your password
        }
    });
   //console.log('transporter',transporter);
   console.log('date new',date);

   var mailOptions = {
    from: 'vikasmahajan2424@gmail.com',//result[0].email, // sender address
    to: 'vishalnashani24@gmail.com', // list of receivers
    subject: ' Leave deny', // Subject line
    text:''+date //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };
    //console.log('mailOptions',mailOptions);

    transporter.sendMail(mailOptions, function(error, info){
    	console.log('transporetar call');
    if(error){
        console.log(error);
        //res.json({yo: 'error'});
    }else{
    	 //res.json({ message: 'remove succesfully' });
        console.log('Message sent: ' + info.response);
        res.json({'msg': ' leave deny','info':info.response});
    };
});
    console.log('transporetar end');
    }

     });
     //});
 }




    }
  });

  }
  });

};

/**
 * List of Leavedenies
 */
exports.list = function(req, res) {

};