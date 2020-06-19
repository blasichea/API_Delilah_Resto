const jwt = require('jsonwebtoken');
const secret = require('../config/config').jwt.key;

var token = {};

token.codToken = function(payload) {
	try {
		var key = jwt.sign({data: payload}, secret, {expiresIn: 60*15});
	} catch (error) {
		console.error("Error al crear Token", error.message);
		return null;
	}
	return key;
};

token.decToken = function(tkn) {
	try {
		var payload = jwt.verify(tkn, secret);
	} catch (error) {
		console.error("Token invalido", error.message);
		return null;
	}
	return payload.data;
};

module.exports = token;