 'use strict';

// // /**
// //  * Module dependencies.
// //  */
// // var should = require('should'),
// // 	mongoose = require('mongoose'),
// // 	User = mongoose.model('User'),
// // 	Punchin = mongoose.model('Punchin');

// // /**
// //  * Globals
// //  */
// // var user, punchin;

// // /**
// //  * Unit tests
// //  */
// // describe('Punchin Model Unit Tests:', function() {
// // 	beforeEach(function(done) {
// // 		user = new User({
// // 			firstName: 'Full',
// // 			lastName: 'Name',
// // 			displayName: 'Full Name',
// // 			email: 'test@test.com',
// // 			username: 'username',
// // 			password: 'password'
// // 		});

// // 		user.save(function() { 
// // 			punchin = new Punchin({
// // 				// Add model fields
// // 				// ...
// // 			});

// // 			done();
// // 		});
// // 	});

// // 	describe('Method Save', function() {
// // 		it('should be able to save without problems', function(done) {
// // 			return punchin.save(function(err) {
// // 				should.not.exist(err);
// // 				done();
// // 			});
// // 		});
// // 	});

// // 	afterEach(function(done) { 
// // 		Punchin.remove().exec();
// // 		User.remove().exec();

// // 		done();
// // 	});
// // });

// 'use strict';

// /**
//  * Module dependencies.
//  */
// var should = require('should'),
// 	mongoose = require('mongoose'),
// 	Punchin = mongoose.model('Punchin');

// /**
//  * Unit tests
//  */
// describe('Punchin Model', function() {

// 	describe('Saving', function() {
// 		it('saves new record');

// 		it('throws validation error when name is empty');

// 		it('throws validation error when name longer than 15 chars');
		
// 		it('throws validation error for duplicate category name');
// 	});

// });