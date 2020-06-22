const mysql = require('mysql2/promise');
const {host,port, database, user, pass} = require('./config').db;



mysql.createConnection({
    host: host || "127.0.0.1",
    port: port || "3306",
	user: user || "acamica",
	password: pass || "AcamicA.2020"
})
	.then( connection => {
		connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`)
			.then((res) => {
				console.log("Base de datos creada con exito");
				process.exit(0);
			})
	})
	.catch(err => {
		console.error("Error creando base de datos", err);
	});