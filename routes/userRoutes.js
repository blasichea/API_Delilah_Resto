var router = require('express').Router();
const db = require('../models/db');
const jwt = require('../jwt/token');

router.use(function(req, res, next) {
	if(!req.headers.token) {
		res.status(401);
		return res.json("Se requiere Token");
	}
	
	var id = jwt.decToken(req.headers.token).user;
	/* caduco?? */
	db.user.findByPk(id)
		.then(us => {
			req.user = us;
		})
	
	next();
});


router.route('/info')
	
	.get(function(req, res) {
		res.json({
			user: req.user.user,
			name: req.user.name,
			email: req.user.email,
			tel: req.user.tel,
			address: req.user.address
		});
	})

	.put(function(req, res) {
		const { password } = req.body;

		if (!password) {
			res.status(400);
			return res.json({mensaje: "Falta nuevo password"});
		}

		db.user.update({password: password}, {where:{id: req.user.id}})
			.then(us => {
				if (us === 0) {
					res.status(400);
					return res.json({mensaje: "No se actualizaron datos"});
				}

				res.json({mensaje: "Actualización exitosa"});
			})
			.catch(err => {
				console.error("Error actualizando datos", err);
			});
	})


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


/* RUTAS PARA HACER PEDIDOS */

module.exports = router;