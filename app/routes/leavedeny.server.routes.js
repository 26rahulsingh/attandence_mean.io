'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var leavedeny = require('../../app/controllers/leavedeny.server.controller');

	app.route('/leavedeny')
	  
	  .post(leavedeny.delete);
	  //.post(leave.create);
};