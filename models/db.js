const Sequelize = require('sequelize');
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

db.user.findOrCreate({
	where: {user: "admin"},
	defaults: {
		name: "Mr. Admin",
		email: "admin@admin.com",
		role: "admin",
		tel: "0351155156157",
		address: "Av. Administrador 777",
		password: "admin123"
	}
})
	.then(result => {
		if (result[1]) {
			console.log("admin fue creado");
		} else {
			console.log("admin ya existe");
		}
	})

sequelize.sync();

module.exports = db;