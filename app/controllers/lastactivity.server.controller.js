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
		console.log(userid);

		Punchin.aggregate([{$match:{userid:mongoose.Types.ObjectId(userid)}},{$sort:{date:-1}}],function(err,result){
            if(err){
                console.log(err);
            }else{
                
                    //,{$sort:{date:-1}}
                    //console.log("result aaaaaaa",result);
                    if (result=='') {
                        res.json(result)

                    }else{
                    var lasttimein=result[0].timein;
                    var date=result[0].date;
                    var lasttimeout=result[0].timeout;
                    console.log('new result',result);
                    console.log('lasttimein',lasttimein);
                    console.log('date',date);
                    res.json({'lasttimein':lasttimein,'lasttimeout':lasttimeout,'date':date});
                }
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