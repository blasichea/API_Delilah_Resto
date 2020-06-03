const jwt = require('jsonwebtoken');
const secreto = '4ndr35170';

var token = {};

token.codToken = function(userId) {
	var key = jwt.sign({user: userId}, secreto);
	return key;
};

token.decToken = function(tkn) {
	var decode = jwt.verify(tkn, secreto);
	return decode;
};

module.exports = token;