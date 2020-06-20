module.exports = (sequelize, DataTypes) => {
	var roles = ["admin", "user"];
	
	var User = sequelize.define('user', {
		user: {
			type: DataTypes.STRING,
			unique: true
		},
		name: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				isEmail:true
			}
		},
		role: {
			type: DataTypes.ENUM,
			values: roles
		},
		tel: DataTypes.STRING,
		address: DataTypes.STRING,
		password: DataTypes.STRING
	});

	return User;
}