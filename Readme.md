# API Rest: Delilah Resto

## Descripción
Es una API que proporciona almacenaje persistente y la interacción con datos de *productos*, *pedidos* y *usuarios*  

* * *  

## Instalación
Clonar el repositorio e ingresar al nuevo directorio.  
Ejecutar:  

		npm install

* * *

## Configuración

Antes de comenzar a usarla debemos configurar los datos de la base de datos.  
Esto se puede hacer modificando el archivo **"package.json"** o dentro del directorio **"config"** el archivo **"config.js"**  
  
Archivo **"package.json"**  

	"config": {
		"svrport": "3003",	<== "puerto de escucha del servidor"
		"dbport": "3306",	<== "puerto de base de datos"
		"dbuser": "root",	<== "usuario de base de datos"
		"dbpass": "",		<== "contraseña del usuario de base de datos"
		"dbname": "resto"	<== "nombre de base de datos"
	}

Esta configuración también se puede realizar desde consola.  
Ejecutando: ***npm config set resto: < variable > < valor >***

	$> npm config set resto:svrport 3003
	$> npm config set resto:dbport 3306
	$> npm config set resto:dbuser "root"
	$> npm config set resto:dbpass "root123"
	$> npm config set resto:dbname "delilah_resto"
- La configuración de **"package.json"** tendrá efecto **solo** cuando utilicemos **"npm script"**, o sea ejecutando por ej: *"npm start"*  
  
Archivo **"config.js"**  

	var config = {
		jwt: {
			key: "4ndr35170"
		},
		db: {
			host: "localhost",
			port: process.env.npm_package_config_dbport ||"3306",
			database: process.env.npm_package_config_dbname || "delilah_resto",
			user: process.env.npm_package_config_dbuser || "acamica",
			pass: process.env.npm_package_config_dbpass || "AcamicA.2020",
			dialect: "mysql"
		},
		server: {
			port: process.env.npm_package_config_svrport || "3000"
		}
	}

	module.exports = config;

- En este archivo también se encuentra para configurar el **key** que utilizará *Jsonwebtoken*  

**NOTA:** el usuario de la base de datos debe tener permisos para crear *"base de datos"*, *"tablas"* y realizar todas las acciones sobre ellas.  

* * *

## Ejecución

Una vez que están todos los valores de configuración deseados podemos incializar la base de datos, cargar algunos datos de prueba y luego ejecutar el servidor.  

### Inicializar base de datos
Se puede inicializar sin datos, solo con el usuario **"admin"** o cargar con datos de prueba.  

Para cargar datos, ejecutar:  

	dbfill=true npm run config

Sin datos, ejecutar:  

	npm run config

Ahora ya está creada la base y las tablas necesarias.  

- El usuario administrador es **"admin"** y su contraseña es **"admin123"**  
- Los otros usuarios "NO tienen password" se les puede poner una haciendo PUT.  


### Ejecutar servidor
Ahora si está todo listo para iniciar el servidor.  
Ejecutar:

	npm start