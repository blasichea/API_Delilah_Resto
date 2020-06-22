const db = require('../models/db');

setTimeout(function() {

	db.user.findOrCreate({
		where: {user: "admin"},
		defaults: {
			name: "Mr. Admin",
			email: "admin@admin.com",
			role: "admin",
			tel: "0351155156157",
			address: "Av. Administrador 777",
			password: "admin123"
		}
	})
		.then(result => {
			if (result[1]) {
				console.log("admin fue creado");
			} else {
				console.log("admin ya existe");
			}
		})

	if (process.env.dbfill) {
		db.user.bulkCreate([
			{
				user: "pedro",
				name: "Pedro Picapiedra",
				email: "pedropica@pica.com",
				tel: "0351155200675",
				address: "Av. Piedra dura 612",
				password: "vilma24"
			},{
				user: "brunito",
				name: "Bruno Diaz",
				email: "batimail@batidomain.com",
				tel: "0351155456098",
				address: "Calle Oculta 25",
				password: "b4t1cl4v3"
			},{
				user: "jose",
				name: "Jose Rodriguez",
				email: "joser@mail.com",
				tel: "0351155781429",
				address: "Av. Simple 123",
				password: "lavoyarecordar"
			}
		]);
		db.product.bulkCreate([
			{
				name: "Choripan",
				img: "https://image.freepik.com/foto-gratis/choripan-sandwich-tradicional-argentino-salsa-chorizo-chimichurri-mesa-madera_123827-1422.jpg",
				price: "35"
			},{
				name: "Pizza Especial",
				img: "https://media-cdn.tripadvisor.com/media/photo-s/0e/0a/27/05/pizza-especial-salsa.jpg",
				price: "250"
			},{
				name: "Hamburguesa",
				img: "https://cocina-casera.com/wp-content/uploads/2016/11/hamburguesa-queso-receta.jpg",
				price: "200"
			}
		]);
		db.order.bulkCreate([
			{
				paying: "Efectivo",
				userId: 2,
			},{
				paying: "Tarjeta",
				userId: 3,
			},{
				paying: "Debito",
				userId: 4,
			}
		])
			.then(data => {
				data.forEach((or, id) => {
					or.setProducts([id+1]);
				});
			})
			.catch(err => {
				console.error("Error al insertar pedidos", err);
			});
		
	}
}, 5000);