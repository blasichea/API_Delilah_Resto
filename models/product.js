module.exports = (sequelize, DataTypes) => {

	var Product = sequelize.define('product', {
		name: DataTypes.STRING,
		img: DataTypes.STRING,
		price: DataTypes.INTEGER
	});

	return Product;
}