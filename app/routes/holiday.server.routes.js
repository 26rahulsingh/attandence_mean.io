'use strict';

module.exports = function(app) {
   var holiday = require('../../app/controllers/holiday.server.controller');

	app.route('/holiday')
	  .get(holiday.list)
	  .post(holiday.create);
	  console.log('in route0');
	  //.put(punchin.update);
};