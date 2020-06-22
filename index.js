const express = require('express');
const bodyParser = require('body-parser');
const config = require("./config/config").server;

var app = express();

app.use(bodyParser.json());

app.use('/', require('./routes/signRoutes'));
app.use('/adm', require('./routes/admRoutes'));
app.use('/user', require('./routes/userRoutes'));

/* SERVIDOR ESCUCHANDO */
app.listen(config.port, () => {
	console.log('Servidor Iniciado:', config.port);
});