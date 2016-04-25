'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
    Holiday = mongoose.model('Holiday'),
     multer  =   require('multer'),
    _ = require('lodash');

/**
 * Create a Holiday
 */
exports.create = function(req, res) {
    //holiday store ten api start
        //var multer  =   require('multer');
        //var fs = require('fs');
        //var csv = require('fast-csv');
        var storage =   multer.diskStorage({
            destination: function (req, file, callback) {
            callback(null, './uploads');
            },
            filename: function (req, file, callback) {
            callback(null, file.originalname );
            }
            });
        var upload = multer({ storage : storage}).single('holiday.file');
        res.json('file uploaded');

    //     /*router.get('/',function(req,res){
    //     res.sendFile(__dirname + "/index.html");
    //     });*/

    //    // router.post('/holiday',function(req,res){
    //     var dataArr = [];
    //     upload(req,res,function(err) {
    //     if(err) {
    //         return res.end("Error uploading file.");
    //     }
    //     //res.end("File is uploaded");
    //     fs.createReadStream('./uploads/holiday.csv')
    //     .pipe(csv())
    //     .on('data',function(data){
    //         console.log("datais",data);
    //         var json ={
    //                 date:data[0],
    //                 day:data[1],
    //                 holidayname:data[2]

    //             }

    //             //console.log(json);
    //             dataArr.push(json);
            
    //     })
    //     .on('end',function(data){
    //         console.log("value is",data);
    //         saveData(0);
    //     })



    // });
    // function saveData(argument) {
    //     //console.log('dataArr',dataArr);
    //     var i =argument;
    //     if (i<dataArr.length) {
    //         console.log(i,dataArr[i]);
    //         holidaydata.create(dataArr[i],function(err,result){
    //             if(err){
    //                 console.log(err);
    //             }else{
    //                 console.log(result+" "+i);
    //                 i++;
    //                 saveData(i);
    //             }

    //         });
            
    //     }else{
    //         res.send("data save");
    //     }
        
    // }
    // });  */ //holiay store ten api end


};

/**
 * Show the current Holiday
 */
exports.read = function(req, res) {

};

/**
 * Update a Holiday
 */
exports.update = function(req, res) {

};

/**
 * Delete an Holiday
 */
exports.delete = function(req, res) {

};

/**
 * List of Holidays
 */
exports.list = function(req, res) {
	 Holiday.find().exec(function(err, result) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(result);
        }
    });

};