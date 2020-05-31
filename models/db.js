const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://acamica:AcamicA%232020@localhost:3306/delilah_resto');
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

sequelize.sync();

module.exports = db;