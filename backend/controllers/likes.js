import { hasLiked, isLiked, unlikeReel } from '../db/likes.js';

const isLikedController = async (req, res, next) => {
  try {
    const { reelId } = req.params;
    const { userId } = req;

    await isLiked(userId, reelId);

    res.status(201).json({ message: 'Reel liked' });
  } catch (error) {
    next(error);
  }
};

const unlikeReelController = async (req, res, next) => {
  try {
    const { reelId } = req.params;
    const { userId } = req;

    await unlikeReel(userId, reelId);

    res.json({ message: 'Reel unliked' });
  } catch (error) {
    next(error);
  }
};

const hasLikedController = async (req, res, next) => {
  try {
    const { reelId } = req.params;
    const { userId } = req.params;

    const hasLiked = await isLiked(userId, reelId);

    res.json({ isLiked });
  } catch (error) {
    next(error);
  }
};

export { hasLikedController, unlikeReelController, isLikedController };
