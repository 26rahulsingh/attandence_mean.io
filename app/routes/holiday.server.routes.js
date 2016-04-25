'use strict';

module.exports = function(app) {
   var holiday = require('../../app/controllers/holiday.server.controller');

	// app.route('/holiday')
	//   .get(holiday.list)
	//   .post(holiday.create);
	//   //.put(punchin.update);
	app.route('/holiday/:filename')
		.get(holiday.read);
	
	
	app.route('/holiday')
		.post(holiday.create);
};