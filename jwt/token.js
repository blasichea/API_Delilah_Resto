const jwt = require('jsonwebtoken');
const secret = '4ndr35170';

var token = {};

token.codToken = function(userId) {
	var key = jwt.sign({user: userId}, secret, {
		expiresIn: 3600
	});
	return key;
};

token.decToken = function(tkn) {
	var decode = jwt.verify(tkn, secret);
	return decode;
};

module.exports = token;