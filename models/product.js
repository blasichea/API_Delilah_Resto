module.exports = (sequelize, DataTypes) => {

	var Product = sequelize.define('product', {
		name: DataTypes.STRING,
		img: {
			type: DataTypes.STRING,
			validate: {
				isUrl: true
			}
		},
		price: {
			type: DataTypes.STRING,
			validate: {
				isNumeric: true
			}
		}
	});

	return Product;
}