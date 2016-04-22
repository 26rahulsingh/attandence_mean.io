'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
    Holiday = mongoose.model('Holiday'),
    _ = require('lodash');

/**
 * Create a Holiday
 */
exports.create = function(req, res) {

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