const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('./jwt/token');
const config = require("./config").server;

var app = express();

app.use(bodyParser.json());

app.use('/', require('./routes/signRoutes'));
app.use('/adm', require('./routes/admRoutes'));
/* app.use('/user', require('./routes/userRoutes')); */

var token = jwt.codToken(16);
console.log(token);
var user = jwt.decToken(token);
console.log(user);

/* SERVIDOR ESCUCHANDO */
app.listen(config.port, () => {
	console.log('Servidor Iniciado');
});