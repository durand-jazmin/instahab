import { hasLiked, isLiked, unlikeReel,updateLikes } from '../db/likes.js';

const isLikedController = async (req, res, next) => {
  try {
    const { reelId } = req.params;
    const { userId } = req;

    await isLiked(userId, reelId);

    res.status(201).json({ message: 'Reel liked' });
  } catch (error) {
    if (error.message === 'El usuario ya ha dado like a este reel') {
      res.status(409).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

const unlikeReelController = async (req, res, next) => {
  try {
    const { reelId } = req.params;
    const { userId } = req;

    await unlikeReel(userId, reelId);

    res.json({ message: 'Reel unliked' });
  } catch (error) {
    if (error.message === 'El usuario no ha dado like a este reel') {
      res.status(404).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

const hasLikedController = async (req, res, next) => {
  try {
    const { reelId } = req.params;
    const { userId } = req.params;

    const hasLiked = await isLiked(userId, reelId);

    res.json({ isLiked: hasLiked });
  } catch (error) {
    next(error);
  }
};
const updateLikesController = async (req, res, next) => {
  try {
    const { reelId } = req.params;
       await updateLikes(reelId);

    res.status(200).send({
      status: 'ok',
      message: 'Likes actualizados correctamente',
    });
  } catch (error) {
    next(error);
  }
};
const createLikeController = async (req, res, next) => {
  try {
    
    const { reelId } = req.params; 
    const { userId } = req;

    await createLike(userId, reelId);

    res.status(201).json({ message: 'El like ha sido creado exitosamente' });
  } catch (error) {

    console.error('Error al crear el like:', error);
    next(error); 
  }
};
 
export { createLikeController,hasLikedController, unlikeReelController, isLikedController,updateLikesController };
