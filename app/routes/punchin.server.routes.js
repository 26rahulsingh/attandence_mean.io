'use strict';

module.exports = function(app) {
	var punchin = require('../../app/controllers/punchin.server.controller');

	app.route('/punchin')
	  .get(punchin.list)
	  .post(punchin.create)
	  .put(punchin.update);
};