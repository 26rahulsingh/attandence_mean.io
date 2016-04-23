'use strict';

module.exports = function(app) {
	var leave = require('../../app/controllers/leave.server.controller');

	app.route('/leave')
	  
	  .put(leave.update)
	  .post(leave.create);
	  
};