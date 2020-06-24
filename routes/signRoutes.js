var router = require('express').Router();
const bcrypt = require('bcrypt');
const config = require('../config/config').bcrypt;
const jwt = require('../jwt/token');
const db = require ('../models/db');

router.post('/login', function(req, res) {
	const {email, user, password} = req.body;
	var usr;

	if (!user) {
		if (!email) {
			res.status(400);
			res.json({mensaje: "Falta usuario o email"});
		} else {
			usr = db.user.findOne({ where: {email: email} });
		}
	} else {
		usr = db.user.findOne({ where: {user: user} });
	}
	
	usr
		.then(us => {
			if (!us) {
				res.status(400);
				return res.json({mensaje: "Usuario o contraseña incorrectos"});
			}
			bcrypt.compare(password, us.password)
				.then(pass => {
					if (!pass) {
						res.status(400);
						return res.json({mensaje: "Usuario o contraseña incorrectos"});
					}
		
					var token = jwt.codToken({
						id: us.id,
						role: us.role
					});
					if (!token) {
						res.status(500);
						return res.json("Error al crear token");
					}
					res.json({
						user: us.user,
						userId: us.id,
						token: token
					});
				})
		})
		.catch(err => {
			res.status(500);
			res.json("Hubo un error, intenta de nuevo");
			console.error("Error en proceso Login", err);
		});
});


router.post('/signup', function(req, res) {
	const {user, name, email, tel, address, password} = req.body;
	console.log ({user,name,email,tel});
	if(!(user && name && email && tel && address && password)) {
		res.status(400);
		return res.json({mensaje: "Información insuficiente"});
	}
	db.user.findOne({ where: {user: user} })
		.then(us => {
			if (us) {
				res.status(400);
				res.json({mensaje: "El usuario ya existe"});
			} else {
				db.user.findOne({ where: {email: email} })
					.then(em => {
						if (em) {
							res.status(400);
							res.json({mensaje: "El email ya existe"});
						}
						bcrypt.hash(password, config.rounds).then(pass => {
							db.user.create({
								user,
								name,
								email,
								tel,
								address,
								password: pass
							})
								.then(result => {
									res.json(result);
								})
								.catch(err => {
									res.status(500);
									console.error("Error al crear usuario", err);
								});
						})
					})
			}
		})
		.catch(err => {
			res.status(500);
			res.json("Hubo un error, intenta de nuevo");
			console.error("Error al crear usuario", err);
		});
});


router.post('/refresh', function(req, res) {
	if(!req.headers.authorization) {
		res.status(401);
		return res.json("Se requiere Token");
	}
	var auth = req.headers.authorization.split(" ")[1];
	var payload = jwt.decToken(auth);
	if (!payload) {
		res.status(400);
		return res.json("Token invalido");
	}
	var token = jwt.codToken(payload);
	res.json({token: token})
});


module.exports = router;