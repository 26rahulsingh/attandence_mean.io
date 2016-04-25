'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
    Holiday = mongoose.model('Holiday'),
    // multer  =   require('multer'),
    _ = require('lodash');
    var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);
 

/**
 * Create a Holiday
 */
exports.create = function(req, res) {
<<<<<<< HEAD
    console.log('create call');
    var part = req.files.filefield;
    console.log('part',part);
 
                var writeStream = gfs.createWriteStream({
                    filename: part.name,
                    mode: 'w',
                    content_type:part.mimetype
                });


                writeStream.on('close', function() {
                     return res.status(200).send({
                        message: 'Success'
                    });
                });
                
                writeStream.write(part.data);

                writeStream.end();
    
=======
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

>>>>>>> 8f945e9aca227db0f3fe9b9c197fb8de7c044678

};

/**
 * Show the current Holiday
 */
exports.read = function(req, res) {
    gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {

        if(files.length===0){
            return res.status(400).send({
                message: 'File not found'
            });
        }
    
        res.writeHead(200, {'Content-Type': files[0].contentType});
        
        var readstream = gfs.createReadStream({
              filename: files[0].filename
        });

        readstream.on('data', function(data) {
            res.write(data);
        });
        
        readstream.on('end', function() {
            res.end();        
        });

        readstream.on('error', function (err) {
          console.log('An error occurred!', err);
          throw err;
        });
    });

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