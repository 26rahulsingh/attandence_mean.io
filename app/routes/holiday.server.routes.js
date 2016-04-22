'use strict';

module.exports = function(app) {
   var holiday = require('../../app/controllers/holiday.server.controller');

	app.route('/holiday')
	  .get(holiday.list)
	  .post(holiday.create);
	  //.put(punchin.update);
};