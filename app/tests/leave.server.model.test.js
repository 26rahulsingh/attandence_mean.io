// 'use strict';

// /**
//  * Module dependencies.
//  */
// var should = require('should'),
// 	mongoose = require('mongoose'),
// 	User = mongoose.model('User'),
// 	Leave = mongoose.model('Leave');

// /**
//  * Globals
//  */
// var user, leave;

// /**
//  * Unit tests
//  */
// describe('Leave Model Unit Tests:', function() {
// 	beforeEach(function(done) {
// 		user = new User({
// 			firstName: 'Full',
// 			lastName: 'Name',
// 			displayName: 'Full Name',
// 			email: 'test@test.com',
// 			username: 'username',
// 			password: 'password'
// 		});

// 		user.save(function() { 
// 			leave = new Leave({
// 				// Add model fields
// 				// ...
// 			});

// 			done();
// 		});
// 	});

// 	describe('Method Save', function() {
// 		it('should be able to save without problems', function(done) {
// 			return leave.save(function(err) {
// 				should.not.exist(err);
// 				done();
// 			});
// 		});
// 	});

// 	afterEach(function(done) { 
// 		Leave.remove().exec();
// 		User.remove().exec();

// 		done();
// 	});
// });