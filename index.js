const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('./jwt/token');
const path = require('path');
const db = require('./models/db');

var app = express();

app.use(bodyParser.json());

/* app.use('/sign', require('./routes/signRoutes')); */
app.use('/adm', require('./routes/admRoutes'));
/* app.use('/user', require('./routes/userRoutes')); */

var token = jwt.codToken(16);
console.log(token);
var user = jwt.decToken(token);
console.log(user);

/* SERVIDOR ESCUCHANDO */
app.listen(3000, () => {
	console.log('Servidor Iniciado');
});