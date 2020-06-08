var router = require('express').Router();
const db = require('../models/db');
const jwt = require('../jwt/token');

router.use(function(req, res, next) {
	if(!req.headers.token) {
		res.status(401);
		res.json("Se requiere Token");
	}
	var id = jwt.decToken(req.headers.token);
	console.log(id);
	next();
})


router.get('/users', function(req, res) {
	/* VER TODOS LOS USERS */
	db.user.findAll()
		.then(us => {
			res.json(us);
		});
});

/*
router.route('/users/:id')

	.get(function(req, res) {

	})
	.post(function(req, res) {
		
	})
	.put(function(req, res) {
		
	})
	.delete(function(req, res) {
		
	});


router.get('/products', function(req, res) {
	
});


router.route('/products/:id')

	.get(function(req, res) {

	})
	.post(function(req, res) {
		
	})
	.put(function(req, res) {
		
	})
	.delete(function(req, res) {
		
	});
	
*/

module.exports = router;