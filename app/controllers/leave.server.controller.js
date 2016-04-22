'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
 nodemailer = require('nodemailer'),
 errorHandler = require('./errors.server.controller'),
    Leave = mongoose.model('Leave'),
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
		//console.log('date is',date);
		//console.log( leavetype);
		var month=month1+1;
		//console.log(month);
		var year=date.getFullYear();
		//console.log(year);
		var newleave=new Leave({
	    	userid:userid,
	    	date:date,
	    	leavetype:leavetype,
	    	monthdata:[{month:month,year:year}],
	    	leavestauts:'false',
	    	status:'Absent'
	   
	    }); 

			// holidaydata.find({date:date},function(err,result){
			// 	if(err){
			// 		console.log(err);
			// 	}else{
			// 		if(result===''){
			// 			//console.log("leave apply");
					

	    //chek for month1
				if(month==1){
					console.log('month 1 called');
			Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant','monthdata.year':year,'monthdata.month':month}, function(err, result) {
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
		    						//senddata();
		    					//console.log('result',result);
		    					res.json({'msg':'succesfully leave apply1','result':result});
		    					
		    				}
		   				 });
			    }else{
                       //console.log("month is",month);
                       //console.log("year is",year);
		   	Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',monthdata:{$in:[{year:year,month:1},{year:year-1,month:10},{year:year-1,month:12},{year:year-1,month:11}]}}, function(err, result) {
     		 	//console.log('monyh',month);
		 		if (err){
		   		throw err;
				}else{
					//response=JSON.stringify({result});  
						//console.log("result2",response);
						//console.log("rfesult length",result.length);
						console.log('result0',result[0]);
						if(result.length<4){
							console.log('result.length',result.length);
							newleave.save(function(err,result){
							if(err){
								console.log(err);
		    					
		    				}else{
		    					console.log('hi');
		    					res.json({'msg':'succesfully leave apply2'});
		    					
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
			Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant','monthdata.year':year,'monthdata.month':month}, function(err, result) {
     		 	
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
		    					res.json({'msg':'succesfully leave apply1'});
		    					
		    				}
		   				 });
			    }else{
                       //console.log("month is",month);
                       //console.log("year is",year);
		  	Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',monthdata:{$in:[{year:year,month:1},{year:year,month:2},{year:year-1,month:12},{year:year-1,month:11}]}}, function(err, result) {
     		 	//console.log("monyh",month);
     		 			if (err){
		   		throw err;
				}else{
					//response=JSON.stringify({result});  
						//console.log("result2",response);
						//console.log("rfesult length",result.length);
						if(result.length<4){
							newleave.save(function(err,result){
							if(err){
								throw err;
		    					
		    				}else{
		    					//console.log("save here2");
		    					res.json({'msg':'succesfully leave apply2'});
		    					
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
			Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant','monthdata.year':year,'monthdata.month':month}, function(err, result) {
     		 	
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
		    					res.json({'msg':'succesfully leave apply1'});
		    					
		    				}
		   				 });
			    }else{
                       //console.log("month is",month);
                       //console.log("year is",year);
			Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant',monthdata:{$in:[{year:year,month:1},{year:year,month:3},{year:year,month:2},{year:year-1,month:12}]}}, function(err, result) {
     		 	//console.log("monyh",month);
		  		if (err){
		   		throw err;
				}else{
					//response=JSON.stringify({result});  
						//console.log("result2",response);
						//console.log("rfesult length",result.length);
						if(result.length<4){
							newleave.save(function(err,result){
							if(err){
								throw err;
		    					
		    				}else{
		    					res.json({'msg':'succesfully leave apply2'});
		    					
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
	   		Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant','monthdata.year':year,'monthdata.month':month}, function(err, result) {
     		 	
		  		if (err){
		   		throw err;
				}else{
			    //console.log(result);
			    if(result==''){
			    	newleave.save(function(err,result){
							if(err){
								throw err;
		    					
		    				}else{
		    					//senddata();
		    					//console.log("all call");
		    					//console.log("result",result);
		    					res.json({'msg':'succesfully leave apply1'});
		    					
		    				}
		   				 });
			    }else{
                       //console.log("month is",month);
                       //console.log("year is",year);
			Leave.find({userid:mongoose.Types.ObjectId(userid),leavestauts:'grant','monthdata.year':year,'monthdata.month':{$in:[month-1,month-2,month-3,month]}}, function(err, result) {
     		 	//console.log("monyh",month);
		  		if (err){
		   		throw err;
				}else{
					//response=JSON.stringify({result});  
						//console.log("result2",response);
						//console.log("rfesult length",result.length);
						if(result.length<4){
							newleave.save(function(err,result){
							if(err){
								throw err;
		    					
		    				}else{
		    					res.json({'msg':'succesfully leave apply2'});
		    					
		    				}
		   				 });	

						}else{
							//console.log("you are not permited for leave all");
							res.json({'msg':'CL exceded'});
						}
					      
					     
					}
			});

                  
		            
			    }
		  		}
			});
	    }

		//}
					//else{
						//console.log("this day is holiday");
						//console.log(result);
						//res.json({'msg':'this day is holiday'});
					//}
				//}
			//});
	    

};

//router.post('/sendmail',function(req,res){
//     	function senddata(){
//     	console.log("send mail call");
//     	// console.log(userid);
//     	// logintable.find({_id:mongoose.Types.ObjectId(userid)},function(err,result){
//     	// 	if(err){
//     	// 		console.log("err",err);
//     	// 	}else{
//     	// 		console.log(result[0].email);
//     	// 		console.log(result[0].password);
    		
//     var transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: 'vikasmahajan2424@gmail.com',//result[0].email, // Your email id
//             pass: '7354642424'//result[0].password // Your password
//         }
//     });
   
//    var mailOptions = {
//     from: 'vikasmahajan2424@gmail.com',//result[0].email, // sender address
//     to: 'vishalnashani24@gmail.com', // list of receivers
//     subject: 'Email Example', // Subject line
//     text:'welcome vikas mahajan login header hiiiiii'//, // plaintext body
//     // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         console.log(error);
//         //res.json({yo: 'error'});
//     }else{
//         console.log('Message sent: ' + info.response);
//         //res.json({yo: info.response});
//     };
// });
//    // }

//     //})
//     //})
// }







/**
 * Show the current Leave
 */
exports.read = function(req, res) {

};

/**
 * Update a Leave
 */
exports.update = function(req, res) {
	var userid = req.body.userid;
 //var leavestauts=req.body.leavestauts;
 var d = new Date(req.body.d);

 var date = d.toISOString();
 console.log('date new', date);

 var newdate = date.toString().slice(0, 10);
 console.log('newdate', newdate);



 console.log(userid);

 Leave.update({ userid: mongoose.Types.ObjectId(userid), date: { '$gte': newdate } }, { $set: { leavestauts: 'grant' } }, function(err) {
     if (err) {
         res.json({ message: 'data not saved' + err });
     } else {
         res.json({ message: 'update succesfully' });
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
	 Leave.find().exec(function(err, result) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(result);
        }
    });

};