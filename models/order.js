module.exports = (sequelize, DataTypes) => {
	var state = ["Nuevo", "Preparando", "Enviado", "Entregado", "Cancelado"];
	var pay = ["Efectivo", "Tarjeta", "Virtual", "Debito"];
	
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
		paying: {
			type: DataTypes.ENUM,
			values: pay,
			defaultValue: "Efectivo"
		}
	});

	return Order;
}