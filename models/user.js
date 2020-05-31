module.exports = (sequelize, DataTypes) => {

	var User = sequelize.define('user', {
		user: DataTypes.STRING,
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		tel: DataTypes.STRING,
		address: DataTypes.STRING,
		password: DataTypes.STRING
	});

	return User;
}