var router = require('express').Router();
const db = require('../models/db');
const jwt = require('../jwt/token');

router.use(function(req, res, next) {
	if(!req.headers.token) {
		res.status(401);
		res.json("Se requiere Token");
	}
	var id = jwt.decToken(req.headers.token);
	/* caduco?? */
	db.user.findByPk(id)
		.then(us => {
			req.user = us;
		})
	
	next();
});


router.get('/products', function(req, res) {
	db.product.findAll()
		.then(pr => {
			res.json(pr);
		});
});


router.get('/products/:id', function(req, res) {
	db.product.findByPk(req.params.id)
		.then(pr => {
			res.json(pr);
		});
});


module.exports = router;