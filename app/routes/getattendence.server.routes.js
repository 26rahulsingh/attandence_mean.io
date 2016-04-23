'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	 var getattendence = require('../../app/controllers/getattendence.server.controller');

		app.route('/getattendence')
	  	.post(getattendence.list)
	  	.put(getattendence.read);
};