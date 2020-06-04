var router = require('express').Router();
const db = require('./models/db');
const jwt = require('./jwt/token');

router.use(function(req, res, next) {
	/* CHEQUEAR ADMIN */
});


router.get('/users', function(req, res) {
	/* VER TODOS LOS USERS */
});


router.route('/users/:id')
	/* CRUD USERS */
	.get(function(req, res) {

	})
	.post(function(req, res) {
		
	})
	.put(function(req, res) {
		
	})
	.delete(function(req, res) {
		
	});


router.get('/products', function(req, res) {
	/* VER TODOS LOS PRODUCTS */
});


router.route('/products/:id')
/* CRUD PRODUCTS */
.get(function(req, res) {

})
.post(function(req, res) {
	
})
.put(function(req, res) {
	
})
.delete(function(req, res) {
	
});