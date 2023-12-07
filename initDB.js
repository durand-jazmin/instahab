var dotenv = require('dotenv');
var mysql = require('mysql2/promise');

dotenv.config();

var MYSQL_HOST = process.env.MYSQL_HOST;
var MYSQL_USER = process.env.MYSQL_USER;
var MYSQL_PASS = process.env.MYSQL_PASS;
var MYSQL_DB = process.env.MYSQL_DB;

function createTable() {
  mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DB, // Utiliza la base de datos que acabas de crear
  }).then(function(connection) {
    // Consulta SQL para crear la tabla 'users'
    var createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        birthDate DATE NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Ejecutar la consulta para crear la tabla 'users'
    connection.query(createTableQuery)
      .then(function() {
        console.log('Tabla "users" creada correctamente.');
        connection.end(); // Cerrar la conexión
      })
      .catch(function(error) {
        console.error('Error al crear la tabla:', error);
      });

//Consulta SQL para crear la tabla 'posts'

 var createTableQuery = `
 CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  text VARCHAR(280) NOT NULL,
  image VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
`;

// Ejecutar la consulta para crear la tabla 'posts'
connection.query(createTableQuery)
 .then(function() {
   console.log('Tabla "posts" creada correctamente.');
   connection.end(); // Cerrar la conexión
 })
 .catch(function(error) {
   console.error('Error al crear la tabla:', error);
 });


  }).catch(function(error) {
    console.error('Error al conectar a MySQL:', error);
  });
}
// Llamar a la función para crear la tabla
createTable();

