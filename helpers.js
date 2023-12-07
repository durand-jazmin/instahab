var fs = require('fs');

// Función que comprueba si una ruta existe en el disco
function pathExists(path) {
  try {
    fs.accessSync(path);
  } catch (error) {
    throw new Error('La ruta ' + path + ' no existe');
  }
}

// Función que crea una ruta en el disco si no existe o arroja un error
function createPathIfNotExists(path) {
  try {
    fs.accessSync(path);
  } catch (error) {
    try {
      fs.mkdirSync(path, { recursive: true });
    } catch (error) {
      throw new Error('Error al crear la ruta ' + path + ': ' + error.message);
    }
  }
}

// Función para generar un error personalizado
var generateError = function(message, status) {
  var error = new Error(message);
  error.httpStatus = status;
  return error;
};

module.exports = {
  pathExists: pathExists,
  createPathIfNotExists: createPathIfNotExists,
  generateError: generateError
};
// Comentario al finalizar el proceso
console.log('Proceso finalizado. Saliendo...');

// Salir del programa
process.exit(0);