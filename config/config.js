var config = {
	jwt: {
		key: "4ndr35170"
	},
	db: {
		host: "localhost",
		port: process.env.npm_package_config_dbport ||"3306",
		database: process.env.npm_package_config_dbname || "delilah_resto",
		user: process.env.npm_package_config_dbuser || "acamica",
		pass: process.env.npm_package_config_dbpass || "AcamicA.2020",
		dialect: "mysql"
	},
	server: {
		port: process.env.npm_package_config_svrport || "3000"
	}
}

module.exports = config;