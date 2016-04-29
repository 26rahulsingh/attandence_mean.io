'use strict';

module.exports = function(app) {
   var holiday = require('../../app/controllers/holiday.server.controller');

//<<<<<<< HEAD
	  // app.route('/holiday')
	  //   .get(holiday.list)
	//  .post(holiday.create);
	//   //.put(punchin.update);
	 // app.route('/holiday/:filename')
	 // 	.get(holiday.read);
	
	
	 app.route('/holiday')
		.post(holiday.create);
//=======
	app.route('/holiday')
	  .get(holiday.list)
	//   .post(holiday.create);
	//   //.put(punchin.update);
	// app.route('/holiday/:filename')
	// 	.get(holiday.read);
	
	
	// app.route('/holiday')
	// 	.post(holiday.create);
//>>>>>>> 0f60b988c0ce09ba7a41c6b81847c2f710fa91cd
};