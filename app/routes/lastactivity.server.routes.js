'use strict';

module.exports = function(app) {
	var lastactivity = require('../../app/controllers/lastactivity.server.controller');

	app.route('/lastactivity')
	  .post(lastactivity.create);
};