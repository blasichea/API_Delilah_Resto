var router = require('express').Router();
const db = require('../models/db');
const jwt = require('../jwt/token');

router.use(function(req, res, next) {
	if(!req.headers.token) {
		res.status(401);
		return res.json("Se requiere Token");
	}
	
	var payload = jwt.decToken(req.headers.token);
	if (!payload) return res.json("Token invalido");

	db.user.findByPk(payload.id)
		.then(us => {
			if (!us) {
				res.status(404);
				return res.json("No se encontro usuario");
			}
			req.user = us;
			next();
		})
		.catch(err => {
			console.error("Error al procesar usuario", err);
		});
});


router.route('/info')
	
	.get(function(req, res) {
		const { id, user, name, email, role, tel, address } = req.user;
		res.json({
			id,
			user,
			name,
			email,
			role,
			tel,
			address
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


/* 	RUTAS PARA VER PRODUCTOS */
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
router.route('/orders')

	.get(function(req, res) {
		db.order.findAll({
			where: {userId: req.user.id},
			include: [ db.product ]
		})
			.then(or => {
				res.json(or);
			})
			.catch(err => {
				console.error("Error al obtener lista de pedidos", err);
			});
	})

	.post(function(req, res) {
		const { paying, products } = req.body;

		if (!(paying && products)) {
			res.status(400);
			return res.json({mensaje: "Datos insuficientes"});
		}
		var userId = req.user.id;
		db.order.create({
			paying,
			userId
		})
			.then(or => {
				or.setProducts(products)
					.then(result => {
						res.json(or);
					});
			})
			.catch(err => {
				console.error("Error al generar pedido",err);
			});
	});

module.exports = router;