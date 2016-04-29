'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
 nodemailer = require('nodemailer'),
 errorHandler = require('./errors.server.controller'),
    Leave = mongoose.model('Leave'),
    User = mongoose.model('User'),
    //Holiday=mongoose.model('Holiday'),
    holidaydata = mongoose.model('holidaydata'),
    _ = require('lodash');

/**
 * Create a Leave
 */
exports.create = function(req, res) {
//console.log('fdgvhb');
		var userid=req.body.userid;
		var date =new Date(req.body.date);
		var leavetype=req.body.leavetype;
		//var leavestauts=req.body.leavestauts;
		var month1=date.getMonth();
		//console.log(userid);
		console.log('date is',date);
		//console.log( leavetype);
		var month=month1+1;
		//console.log(month);
		var year=date.getFullYear();

 //var date1= date.toISOString();
 //console.log('date new', date);

// var newdate = date1.toString().slice(0, 10);

 		var newleave=new Leave({
	    	userid:userid,
	    	date:date,
	    	leavetype:leavetype,
	    	monthdata:[{month:month,year:year}],
	    	leavestauts:'false',
	    	status:'Absent'
	   
	    }); 


			// Holiday.find({date:newdate},function(err,result){
			// 	if(err){
			// 		console.log(err);
			// 	}else{
			// 		if(result==''){
			// 			console.log("holiday call",date);
			// 			console.log('result',result)
			// 		//"leavetype" : "sl",

			// holidaydata.find({date:date},function(err,result){
			// 	if(err){
			// 		console.log(err);
			// 	}else{
			// 		if(result==''){
			// 			console.log("holiday call",date);
			// 			console.log('result',result)
					
// >>>>>>> 0f60b988c0ce09ba7a41c6b81847c2f710fa91cd

	    //chek for month1
				if(month==1){
					console.log('month 1 called');
			Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',leavetype:'CL','monthdata.year':year,'monthdata.month':month}, function(err, result) {
     		 	console.log('leave call');
		  		if (err){
		   		throw err;
				}else{
			    //console.log(result);
			    if(result==''){
			    	console.log('result',result);
			    	newleave.save(function(err,result){
							if(err){
								console.log(err);
		    					
		    				}else{
		    					console.log('new result',result._id);
		    					var objectid=result._id;
		    					console.log('objectid',objectid)

		    					console.log('newcall');
		    					var leavelenght=0;
		    					senddata(objectid,leavelenght);
		    						//senddata();
		    					//console.log('result',result);
		    					//res.json({'msg':'succesfully leave apply1','result':result});
		    					//senddata(userid);
		    				}
		   				 });
			    }else{
                       //console.log("month is",month);
                       //console.log("year is",year);
		   	Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',leavetype:'CL',monthdata:{$in:[{year:year,month:1},{year:year-1,month:10},{year:year-1,month:12},{year:year-1,month:11}]}}, function(err, result) {
     		 	//console.log('monyh',month);
		 		if (err){
		   		throw err;
				}else{
					//response=JSON.stringify({result});  
						//console.log("result2",response);
						//console.log("rfesult length",result.length);
						var leavelenght=result.length
						console.log('result0',result[0]);
						if(result.length<4){
							console.log('result.length',result.length);
							newleave.save(function(err,result){
							if(err){
								console.log(err);
		    					
		    				}else{
		    					//console.log('hi');
		    					//res.json({'msg':'succesfully leave apply2'});
		    					console.log('new second call');
		    					console.log('new result',result._id);
		    					var objectid=result._id;
		    					console.log('objectid',objectid)

		    					senddata(objectid,leavelenght);
		    				}
		   				 });	

						}else{
							res.json({'msg':'CL exceded'});
						}
					      
					     
					}
			});

                  
		            
			    }
		  		}
			});
	    

		}// end for month1

              //check for month2
				if(month==2){
					console.log('month 2 called');
			Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',leavetype:'CL','monthdata.year':year,'monthdata.month':month}, function(err, result) {
     		 	
		  		if (err){
		   		throw err;
				}else{
			    //console.log(result);
			    if(result==''){
			    	newleave.save(function(err,result){
							if(err){
		    					throw err;
		    				}else{

		    					console.log('new result',result._id);
		    					var objectid=result._id;
		    					console.log('objectid',objectid)

		    					console.log('newcall');
		    					var leavelenght=0;
		    					senddata(objectid,leavelenght);
		    					//console.log("result",result);
		    					//res.json({'msg':'succesfully leave apply1'});
		    					//senddata(userid);
		    				}
		   				 });
			    }else{
                       //console.log("month is",month);
                       //console.log("year is",year);
		  	Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',leavetype:'CL',monthdata:{$in:[{year:year,month:1},{year:year,month:2},{year:year-1,month:12},{year:year-1,month:11}]}}, function(err, result) {
     		 	//console.log("monyh",month);
     		 			if (err){
		   		throw err;
				}else{
					//response=JSON.stringify({result});  
						//console.log("result2",response);
						//console.log("rfesult length",result.length);
						var leavelenght=result.length
						if(result.length<4){
							newleave.save(function(err,result){
							if(err){
								throw err;
		    					
		    				}else{
		    					//console.log("save here2");
		    					//res.json({'msg':'succesfully leave apply2'});
		    					console.log('new second call');
		    					console.log('new result',result._id);
		    					var objectid=result._id;
		    					console.log('objectid',objectid)

		    					senddata(objectid,leavelenght);
		    				}
		   				 })	;

						}else{
							//console.log("you are not permited for leave2");
							res.json({'msg':'CL exceded'});
						}
					      
					     
					}
			});

                  
		            
			    }
		  		}
			});
	    

		}// end for month2

				//check for month3
				if(month==3){
					console.log('month 3 called');
			Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',leavetype:'CL','monthdata.year':year,'monthdata.month':month}, function(err, result) {
     		 	
		  		if (err){
		   		throw err;
				}else{
			    //console.log(result);
			    if(result==''){
			    	newleave.save(function(err,result){
							if(err){
								throw err;
		    					
		    				}else{
		    					//console.log("result",result);
		    					//res.json({'msg':'succesfully leave apply1'});
		    					//senddata(userid);
		    					console.log('new result',result._id);
		    					var objectid=result._id;
		    					console.log('objectid',objectid)

		    					console.log('newcall');
		    					var leavelenght=0;
		    					senddata(objectid,leavelenght);
		    				}
		   				 });
			    }else{
                       //console.log("month is",month);
                       //console.log("year is",year);
			Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',leavetype:'CL',monthdata:{$in:[{year:year,month:1},{year:year,month:3},{year:year,month:2},{year:year-1,month:12}]}}, function(err, result) {
     		 	//console.log("monyh",month);
		  		if (err){
		   		throw err;
				}else{
					//response=JSON.stringify({result});  
						//console.log("result2",response);
						//console.log("rfesult length",result.length);
						var leavelenght=result.length
						if(result.length<4){
							newleave.save(function(err,result){
							if(err){
								throw err;
		    					
		    				}else{
		    						console.log('new second call');
		    					console.log('new result',result._id);
		    					var objectid=result._id;
		    					console.log('objectid',objectid)

		    					senddata(objectid,leavelenght);
		    					//res.json({'msg':'succesfully leave apply2'});
		    					
		    				}
		   				 });	

						}else{
							//console.log("you are not permited for leave");
							res.json({'msg':'CL exceded'});
						}
					      
					     
					}
			});

                  
		            
			    }
		  		}
			});
	    

		}//end for month3

                 if(month>3){
              console.log('all call');
              //console.log(month);
	   		Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',leavetype:'CL','monthdata.year':year,'monthdata.month':month}, function(err, result) {
     		 	
		  		if (err){
		   		throw err;
				}else{
			    //console.log(result);
			    if(result==''){
			    	newleave.save(function(err,result){
							if(err){
								throw err;
		    					
		    				}else{
		    					console.log('new result',result._id);
		    					var objectid=result._id;
		    					console.log('objectid',objectid)

		    					console.log('newcall');
		    					var leavelenght=0;
		    					senddata(objectid,leavelenght);
		    					//console.log("all call");
		    					//console.log("result",result);
		    					//res.json({'msg':'succesfully leave apply1'});
		    					
		    				}
		   				 });
			    }else{
                       //console.log("month is",month);
                       //console.log("year is",year);
			Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',leavetype:'CL','monthdata.year':year,'monthdata.month':{$in:[month-1,month-2,month-3,month]}}, function(err, result) {
     		 	//console.log("monyh",month);
		  		if (err){
		   		throw err;
				}else{
					//response=JSON.stringify({result});  
						console.log("result2",result);
						console.log("rfesult length",result.length);
						var leavelenght=result.length
						if(result.length<4){
							newleave.save(function(err,result){
							if(err){
								throw err;
		    					
		    				}else{
		    					console.log('new second call');
		    					console.log('new result',result._id);
		    					var objectid=result._id;
		    					console.log('objectid',objectid)

		    					senddata(objectid,leavelenght);
		    					//res.json({'msg':'succesfully leave apply2'});
		    					
		    				}
		   				 });	

						}else{
							console.log("you are not permited for leave all");
							res.json({'msg':'CL exceded'});
						}
					      
					     
					}
			});

                  
		            
			    }
		  		}
			});
	    }

		// }
		// 			else{
		// 				console.log("this day is holiday");
		// 				console.log(result);
		// 				res.json({'msg':'this day is holiday'});
		// 			}
		// 		}
		// 	});

			//routename/userid/date/length
			//router.post('/sendmail',function(req,res){
    	function senddata(objectid,leavelenght){
    	console.log("send mail call");
    	console.log('objectid',objectid);
    	console.log('leavelenght',leavelenght);
    	//console.log('date',date);
    	User.find({_id:mongoose.Types.ObjectId(userid)},function(err,result){
    		if(err){
    			console.log("err",err);
    		}else{
    			var displayname=result[0].displayName;
    			console.log('my userid',userid);
    			//console.log(result[0].password);
    		
   var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vikasmahajan2424@gmail.com',//result[0].email, // Your email id
            pass: '7354642424'//result[0].password // Your password
        }
    });
   var msg = 'Name '+displayname+'<br>length '+leavelenght+'<br><a href= "http://localhost:3000/#/admin/'+objectid+'/">GRANT</a><br><a href="http://localhost:3000/#/admin/'+objectid+'/">DENY</a>';
   var mailOptions = {
    from: 'vikasmahajan2424@gmail.com',//result[0].email, // sender address
    to: 'vishalnashani24@gmail.com', // list of receivers
    subject: 'For Leave', // Subject line
    text:displayname ,// // plaintext body
    html:  msg 
            };

    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        //res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({'msg': 'succesfully leave apply','info':info.response});
    };
});
    }

     });
     //})
 }


	    

};

/**
 * Show the current Leave
 */
exports.read = function(req, res) {

};

/**
 * Update a Leave
 */
exports.update = function(req, res) {
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
 	

 Leave.update({ _id: mongoose.Types.ObjectId(ObjectId) },{$set:{leavestauts:'grant'}}, function(err) {
     if (err) {
         res.json({ message: 'data not saved' + err });
     } else {
     	console.log('update succesfully');
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
    subject: ' Leave grant', // Subject line
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
        //console.log('Message sent: ' + info.response);
        res.json({'msg': 'succesfully leave apply','info':info.response});
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
 * Delete an Leave
 */
exports.delete = function(req, res) {

};

/**
 * List of Leaves
 */
exports.list = function(req, res) {
	
};