const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const config = require('../config/config').bcrypt;
const {host, port, database, user, pass, dialect} = require('../config/config').db;

const sequelize = new Sequelize(`${dialect}://${user}:${pass}@${host}:${port}/${database}`);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = sequelize.import("user.js");
db.product = sequelize.import("product.js");
db.order = sequelize.import("order.js");

db.user.hasMany(db.order);
db.order.belongsTo(db.user);
db.order.belongsToMany(db.product, {through: "orderProduct"});
db.product.belongsToMany(db.order, {through: "orderProduct"});

sequelize.sync().then(res => {
	bcrypt.hash("admin123", config.rounds).then(pass => {
		db.user.findOrCreate({
			where: {user: "admin"},
			defaults: {
				name: "Mr. Admin",
				email: "admin@admin.com",
				role: "admin",
				tel: "0351155156157",
				address: "Av. Administrador 777",
				password: pass
			}
		})
			.then(result => {
				if (result[1]) {
					console.log("admin fue creado");
				} else {
					console.log("admin ya existe");
				}
			})
			.catch(err => {
				console.error("Error creando usuario",err);
			});
	})
		.catch(err => {
			console.error("Error de codificación",err);
		});

	if (process.env.dbfill) {
		db.user.bulkCreate([
			{
				user: "pedro",
				name: "Pedro Picapiedra",
				email: "pedropica@pica.com",
				tel: "0351155200675",
				address: "Av. Piedra dura 612",
				password: "SIN_PASSWORD_HACER_PUT"
			},{
				user: "brunito",
				name: "Bruno Diaz",
				email: "batimail@batidomain.com",
				tel: "0351155456098",
				address: "Calle Oculta 25",
				password: "SIN_PASSWORD_HACER_PUT"
			},{
				user: "jose",
				name: "Jose Rodriguez",
				email: "joser@mail.com",
				tel: "0351155781429",
				address: "Av. Simple 123",
				password: "SIN_PASSWORD_HACER_PUT"
			}
		])
			.then(us => {
				db.product.bulkCreate([
					{
						name: "Choripan",
						img: "https://image.freepik.com/foto-gratis/choripan-sandwich-tradicional-argentino-salsa-chorizo-chimichurri-mesa-madera_123827-1422.jpg",
						price: "35"
					},{
						name: "Pizza Especial",
						img: "https://media-cdn.tripadvisor.com/media/photo-s/0e/0a/27/05/pizza-especial-salsa.jpg",
						price: "250"
					},{
						name: "Hamburguesa",
						img: "https://cocina-casera.com/wp-content/uploads/2016/11/hamburguesa-queso-receta.jpg",
						price: "200"
					}
				])
					.then(pr => {
						db.order.bulkCreate([
							{
								paying: "Efectivo",
								userId: us[0].id,
							},{
								paying: "Tarjeta",
								userId: us[1].id,
							},{
								paying: "Debito",
								userId: us[2].id,
							}
						])
							.then(data => {
								data.forEach((or, index) => {
									or.setProducts([pr[index].id]);
								});
							})
							.catch(err => {
								console.error("Error insertando pedidos", err);
							});
					})
					.catch(err => {
						console.error("Error insertando productos",err);
					})
			})
			.catch(err => {
				console.error("Error insertando usuarios", err);
			});
	}
})

module.exports = db;