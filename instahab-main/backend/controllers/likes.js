import { hasLiked, isLiked, unlikeReel } from '../db/likes.js';

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

export { hasLikedController, unlikeReelController, isLikedController };