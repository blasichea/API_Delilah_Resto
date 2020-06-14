const jwt = require('jsonwebtoken');
const secret = '4ndr35170';

var token = {};

token.codToken = function(userId) {
	try {
		var key = jwt.sign({data: {user: userId}}, secret, {expiresIn: 60*15});
		var keyRefresh = jwt.sign({data: {user: userId}}, secret, {expiresIn: 60*60*12});
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