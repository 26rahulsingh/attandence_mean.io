'use strict';

module.exports = function(app) {
	var clfind = require('../../app/controllers/clfind.server.controller');

	app.route('/clfind')
	  
	  //.put(leave.update)
	  .post(clfind.create);
	  
};