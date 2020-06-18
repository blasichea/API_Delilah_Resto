const jwt = require('jsonwebtoken');
const secret = '4ndr35170';

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
	try {
		var payload = jwt.verify(tkn, secret);
	} catch (error) {
		console.error("Token invalido", error.message);
	}
	
	return payload.data;
};

token.refresh = function(refTkn) {
	try {
		var payload = jwt.verify(refTkn, secret);
		var newToken = jwt.sign({data: payload.data}, secret, {expiresIn: 60*15});
	} catch (error) {
		console.error("Token invalido", error.message);
	}

	return newToken;
};

module.exports = token;