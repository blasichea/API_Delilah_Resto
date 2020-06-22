var router = require('express').Router();
const db = require('../models/db');
const jwt = require('../jwt/token');

router.use(function(req, res, next) {
	if(!req.headers.token) {
		res.status(401);
		return res.json("Se requiere Token");
	}
	var payload = jwt.decToken(req.headers.token);
	if (!payload) return res.json("token invalido");

	if (!(payload.role === "admin")) return res.json("Acceso denegado");

	req.user = payload;
	next();
})


router.get('/users', function(req, res) {
	db.user.findAll()
		.then(us => {
			res.json(us);
		})
		.catch(err => {
			console.error("Error al obtener lista de usuarios", err);
		});
});


router.route('/users/:id')

	.get(function(req, res) {
		var id = req.params.id;
		db.user.findByPk(id)
			.then(us => {
				if (!us) {
					res.status(400);
					return res.json("No se encontro usuario");
				}
				res.json(us);
			})
			.catch(err => {
				console.error("No se pudo obtener el usuario", err);
			})
	})

	.put(function(req, res) {
		const {user, name, email, role, tel, address, password} = req.body;
		var id = req.params.id;
		var newRec = {};

		if (user) newRec.user = user;
		if (name) newRec.name = name;
		if (email) newRec.email = email;
		if (role) newRec.role = role;
		if (tel) newRec.tel = tel;
		if (address) newRec.address = address;
		if (password) newRec.password = password;

		db.user.update(newRec, {where: {id: id}})
			.then(us => {
				if (us === 0) {
					res.status(400);
					return res.json({mensaje: "no se actualizaron datos"});
				}
				res.json({mensaje: "Actualización exitosa"});
			})
			.catch(err => {
				console.error("Error al modificar usuario", err);
			});
	})

	.delete(function(req, res) {
		var id = req.params.id;
		db.user.destroy({where: {id: id}})
			.then(us => {
				if (!us) {
					res.status(400);
					return res.json("No se encontro usuario");
				}
				res.json({mensaje:"Se borro usuario"});
			})
			.catch(err => {
				console.error("Error al eliminar usuario", err);
			});
	});

/* 	RUTAS DE PRODUCTOS */

router.route('/products')

	.get(function(req, res) {
		db.product.findAll()
			.then(pr => {
				res.json(pr);
			})
			.catch(err => {
				console.error("Error al obtener lista de productos", err);
			});
	})

	.post(function(req, res) {
		const {name, img, price} = req.body;
		if (!name || !img || !price) {
			res.status(400);
			return res.json({mensaje: "Información insuficiente"});
		}

		db.product.create({
			name,
			img,
			price
		})
			.then(result => {
				res.json(result);
			})
			.catch(err => {
				console.error("Error al crear producto", err);
			});
	});


router.route('/products/:id')

	.get(function(req, res) {
		var id = req.params.id;
		db.product.findByPk(id)
			.then(pr => {
				if (!pr) {
					res.status(404);
					return res.json({mensaje: "Producto no encontrado"});
				}

				res.json(pr);
			})
			.catch(err => {
				console.error("Error buscando producto", err);
			});
	})
	
	.put(function(req, res) {
		const {name, img, price} = req.body;
		var id = req.params.id;
		var newRec = {};

		if (name) newRec.name = name;
		if (img) newRec.img = img;
		if (price) newRec.price = price;

		db.product.update(newRec, {where: {id: id}})
			.then(pr => {
				if (!pr) {
					res.status(404);
					return res.json({mensaje: "Producto no encontrado"});
				}
				res.json(pr);
			})
			.catch(err => {
				console.error("Error al modificar producto", err);
			});
	})
	
	.delete(function(req, res) {
		var id = req.params.id;
		db.product.destroy({where: {id: id}})
			.then(del => {
				if (!pr) {
					res.status(404);
					return res.json({mensaje: "Producto no encontrado"});
				}
				res.json({mensaje:"Se borro producto"});
			})
			.catch(err => {
				console.error("Error al eliminar producto", err);
			});
	});


/* 	RUTAS DE PEDIDOS */

router.route('/orders')

	.get(function(req, res) {
		db.order.findAll({ include: [ db.user, db.product ] })
			.then(or => {
				res.json(or);
			})
			.catch(err => {
				console.error("Error al obtener lista de pedidos", err);
			});
	})


	router.route('/orders/:id')

		.get(function(req, res) {
			var id = req.params.id;

			db.order.findByPk(id, { include: [ db.user ] })
				.then(or => {
					if (!or) {
						res.status(400);
						return res.json("No se encontro pedido");
					}
					res.json(or);
				})
				.catch(err => {
					console.error("Error buscando orden", err);
				});
		})

		.put(function(req, res) {
			const { status } = req.body;
			var id = req.params.id;
			var newRec = {};

			if (status) newRec.status = status;

			db.order.findByPk(id)
				.then(or => {
					if (!or) {
						res.status(404);
						return res.json({mensaje: "Pedido no encontrado"});
					}
					or.update(newRec)
						.then(result => {
							if (result === 0) {
								return res.json({mensaje: "No se actualizó el pedido"});
							}
							res.json(or);
						})
				})
				.catch(err => {
					console.error("Error al modificar producto", err);
				});
		})

		.delete(function(req, res) {
			var id = req.params.id;
			db.order.destroy({where: {id: id}})
				.then(del => {
					if (!or) {
						res.status(404);
						return res.json({mensaje: "Pedido no encontrado"});
					}
					res.json({mensaje:"Se borro pedido"});
				})
				.catch(err => {
					console.error("Error al eliminar pedido", err);
				});
		});

module.exports = router;