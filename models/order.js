module.exports = (sequelize, DataTypes) => {
	var state = ["Nuevo", "Preparando", "Enviado", "Entregado", "Cancelado"];
	var pay = ["Cash", "Card", "Virtual", "Debit"];
	
	var Order = sequelize.define('order', {
		status: {
			type: DataTypes.ENUM,
			values: state,
			defaultValue: "Nuevo"
		},
		time: {
			type: DataTypes.DATE,
			defaultValue: sequelize.NOW
		},
		detail: DataTypes.TEXT,
		paying: {
			type: DataTypes.ENUM,
			values: pay
		}
	});

	return Order;
}