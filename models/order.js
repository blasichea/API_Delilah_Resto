module.exports = (sequelize, DataTypes) => {

	var Order = sequelize.define('order', {
		status: DataTypes.STRING,
		time: DataTypes.DATE,
		detail: DataTypes.TEXT,
		paying: DataTypes.STRING
	});

	return Order;
}