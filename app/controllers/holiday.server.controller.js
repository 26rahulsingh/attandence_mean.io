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