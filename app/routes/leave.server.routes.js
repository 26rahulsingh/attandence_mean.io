'use strict';

module.exports = function(app) {
	var leave = require('../../app/controllers/leave.server.controller');

	app.route('/leave')
	  .get(leave.list)
	  .put(leave.update)
	  .post(leave.create);
	  
};