const jwt = require('jsonwebtoken');
const secret = require('../config').jwt.key;

var token = {};

token.codToken = function(payload) {
	try {
		var key = jwt.sign({data: payload}, secret, {expiresIn: 60*15});
	} catch (error) {
		console.error("Error al crear Token", error.message);
	}
	return {token: key, refresh: keyRefresh};
};

token.decToken = function(tkn) {
	var decode = jwt.verify(tkn, secret);
	return decode;
};

module.exports = token;