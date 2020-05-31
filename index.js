const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

var app = express();

app.use(bodyParser.json());



/* SERVIDOR ESCUCHANDO */
app.listen(3000, () => {
	console.log('Servidor Iniciado');
});