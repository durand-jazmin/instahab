var minimist = require("minimist");
var chalk = require("chalk");
var path = require("path");
var fs = require("fs/promises");
var sharp = require("sharp");

var helpers = require("./helpers");

console.log(chalk.green("Welcome to INSTAHAB v1.0"));
console.log();

// Esta función hace el trabajo de procesado
async function processImages(options) {
  try {
    var inputDir = options.inputDir;
    var outputDir = options.outputDir;
    var watermark = options.watermark;
    var resize = options.resize;

    var inputPath = path.resolve(__dirname, inputDir);
    var outputPath = path.resolve(__dirname, outputDir);
    var watermarkPath;

    if (watermark) {
      watermarkPath = path.resolve(__dirname, watermark);
    }

    // Leer los archivos de inputPath
    const inputFiles = await fs.readdir(inputPath);

    // Quedarme solo con los archivos que sean imágenes
    const imageFiles = inputFiles.filter((file) => {
      const validExtensions = [".jpg", ".jpeg", ".gif", ".png", ".webp"];

      return validExtensions.includes(path.extname(file).toLowerCase());
    });

    // Recorrer toda la lista de archivos y:
    // - Si existe "resize" redimensionar cada una de las imágenes
    // - Si existe "watermark" colocar el watermark en la parte inferior derecha de la imagen
    // - Guardar la imágen resultante en outputDir

    for (const imageFile of imageFiles) {
      console.log(chalk.blue(`Procesando imagen: ${imageFile}`));
      // Creamos la ruta completa de la imagen
      const imagePath = path.resolve(inputPath, imageFile);

      // Cargamos la imagen en sharp
      const image = sharp(imagePath);

      // Si existe resize hacemos el resize
      if (resize) {
        image.resize(resize);
      }

      // Si existe watermarkPath colocamos el watermark
      if (watermarkPath) {
        image.composite([
          {
            input: watermarkPath,
            top: 20,
            left: 20,
          },
        ]);
      }

      // Guardamos la imagen con otro nombre en outputPath
      await image.toFile(path.resolve(outputPath, `processed_${imageFile}`));

      console.log(
        chalk.green(
          `Todo finalizado, tus imágenes están en el directorio ${outputDir}`
        )
      );
    }
  } catch (error) {
    console.error(chalk.red(error.message));
    console.error(chalk.red("Comprueba que los argumentos sean correctos!"));
    process.exit(1);
  }
}

// Proceso los argumentos
var args = minimist(process.argv.slice(2));
var inputDir = args.inputDir;
var outputDir = args.outputDir;
var watermark = args.watermark;
var resize = args.resize;

// Si no existe inputDir o outputDir muestro error y salgo del programa
if (!inputDir || !outputDir) {
  console.error(
    chalk.red("Los argumentos --inputDir y --outputDir son obligatorios")
  );
  process.exit(1);
}

// Si no existe watermark y no existe resize muestro error y salgo del programa
if (!watermark && !resize) {
  console.error(
    chalk.red("Es necesario que exista un argumento --watermark o --resize")
  );
  process.exit(1);
}

// Todos los argumentos están correctos, seguimos
console.log(chalk.green("Procesando imágenes..."));
console.log();

processImages({ inputDir, outputDir, watermark, resize });
