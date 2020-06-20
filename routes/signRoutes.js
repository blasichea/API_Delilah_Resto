var router = require('express').Router();
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
			if (!us || !(us.password === password)) {
				res.status(400);
				return res.json({mensaje: "Usuario o contraseña incorrectos"});
			}

			var token = jwt.codToken({
				id: us.id,
				role: us.role
			});
			res.json({
				user: us.user,
				userId: us.id,
				token: token
			});
		})
		.catch(err => {
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

						db.user.create({
							user,
							name,
							email,
							tel,
							address,
							password
						})
							.then(result => {
								res.json(result);
							});
					});
			}
		})
		.catch(err => {
			console.error("Error al crear usuario", err);
		});
});


module.exports = router;