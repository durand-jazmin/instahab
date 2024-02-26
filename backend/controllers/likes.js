import { likeReel, hasLikedReel, unlikeReel } from '../db/likes.js';

const likeReelController = async (req, res, next) => {
  try {
    const { reelId } = req.params;
    const { userId } = req;

    await likeReel(userId, reelId);

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

const hasLikedReelController = async (req, res, next) => {
  try {
    const { reelId } = req.params;
    const { userId } = req.params;

    const hasLiked = await hasLikedReel(userId, reelId);

    res.json({ hasLiked });
  } catch (error) {
    next(error);
  }
};

export { likeReelController, unlikeReelController, hasLikedReelController };
