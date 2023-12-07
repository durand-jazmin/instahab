var express = require('express');
var app = express();

// Endpoint para ver las últimas fotos
app.get('/api/results/latest', function(req, res) {
  // Lógica para obtener las últimas fotos desde tu sistema de almacenamiento de fotos
  // Esto podría implicar acceder a una base de datos o a un sistema de archivos

  // Por ahora, vamos a simular datos de ejemplo
  var latestPhotos = [
    { imagePath: path.join(imagesDir, 'foto1.jpg'), description: 'Last photo' },
    { imagePath: path.join(imagesDir, 'foto2.jpg'), description: 'Penultimate photo' }
  ];

  // Enviar las últimas fotos como respuesta
  res.json({ photos: latestPhotos });
});

var path = require('path');

// Función para obtener rutas relativas de imágenes
function getImagePaths(imagesDir, imageNames) {
  return imageNames.map(function(imageName) {
    return path.join(imagesDir, imageName);
  });
}

// Directorio donde se encuentran las imágenes
var imagesDir = path.join(__dirname, 'images');

// Nombres de archivos de imagen
var imageNames = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg']; // Agrega los nombres de tus imágenes

// Obtener rutas relativas de las imágenes
var imagePaths = getImagePaths(imagesDir, imageNames);

// Mostrar las rutas de las imágenes
imagePaths.forEach(function(imagePath, index) {
  console.log('Ruta de la imagen ' + (index + 1) + ': ' + imagePath);
});

// Escuchar en un puerto
var PORT = 3000;
app.listen(PORT, function() {
  console.log('Servidor iniciado en el puerto ' + PORT);
});
// Comentario al finalizar el proceso
console.log('Proceso finalizado. Saliendo...');

// Salir del programa
process.exit(0);