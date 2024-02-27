import { getConnection } from './getPool.js';

const likeReel = async (user_id, reel_id) => {
  let connection;

  try {
    connection = await getConnection();
    const [[reel]] = await connection.query('SELECT * FROM reels WHERE id = ?', [reel_id]);

    if (!reel) {
      throw new Error(`El reel con id ${reel_id} no existe en la tabla reels`);
    }

    await connection.query('INSERT INTO likes (user_id, reel_id) VALUES (?, ?)', [user_id, reel_id]);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const hasLikedReel = async (user_id, reel_id) => {
  let connection;

  try {
    connection = await getConnection();
    const [[result]] = await connection.query('SELECT * FROM likes WHERE user_id = ? AND reel_id = ?', [user_id, reel_id]);
    return result ? true : false;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const unlikeReel = async (user_id, reel_id) => {
  let connection;

  try {
    connection = await getConnection();
    await connection.query('DELETE FROM likes WHERE user_id = ? AND reel_id = ?', [user_id, reel_id]);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

export { likeReel, hasLikedReel, unlikeReel };
