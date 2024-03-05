import {
  createReel,
  getAllReels,
  getReelById,
  deleteReelById,
} from '../db/reels.js';
import { generateError, createPathIfNotExists } from '../helpers.js';
import path from 'path';
import sharp from 'sharp';
import { nanoid } from 'nanoid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getReelsController = async (req, res, next) => {
  try {
    const reels = await getAllReels();

    res.send({
      status: 'ok',
      data: reels,
    });
  } catch (error) {
    next(error);
  }
};

const newReelController = async (req, res, next) => {
  try {
    if (!req.files) {
      throw generateError(
        'No se ha seleccionado ninguna imagen.',
        400
      );
    }

    const { text } = req.body;

    if (text === undefined || text === null || (typeof text === 'string' && text.length > 100)) {
      throw generateError(
        'El texto debe ser menor de 100 caracteres',
        400
      );
    }

    const maxSize = 7 * 1024 * 1024; // 7MB in bytes

    if (req.files.image.size > maxSize) {
      throw generateError(
        'La imagen es demasiado grande. Por favor, seleccione una imagen de menos de 7MB.',
        400
      );
    }

    // Creo el path del directorio uploads
    const uploadsDir = path.join(__dirname, '../uploads');

    // Creo el directorio si no existe
    await createPathIfNotExists(uploadsDir);

    // Procesar la imagen
    const image = sharp(req.files.image.data);
    image.resize(500);

    // Guardo la imagen con un nombre aleatorio en el directorio uploads
    const imageFileName = `${nanoid(24)}.jpg`;

    await image.toFile(path.join(uploadsDir, imageFileName));

    const id = await createReel(req.userId, text, imageFileName);

    const reel = await getReelById(id);

    res.send({
      status: 'ok',
      data: reel,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleReelController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reel = await getReelById(id);

    res.send({
      status: 'ok',
      data: reel,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReelController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Conseguir la información del reel que quiero borrar
    const reel = await getReelById(id);

    // Comprobar que el usuario del token es el mismo que creó el reel
    if (req.userId !== reel.user_id) {
      throw generateError(
        'Estás intentando borrar un reel que no es tuyo',
        401
      );
    }

    // Borrar el reel
    await deleteReelById(id);

    res.send({
      status: 'ok',
      message: `El reel con id: ${id} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getReelsController,
  newReelController,
  getSingleReelController,
  deleteReelController,
};
