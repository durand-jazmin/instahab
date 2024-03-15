import { getConnection } from './getPool.js';

const createLike = async (userId, reelId) => {
  let connection;

  try {
    connection = await getConnection();
    
    const [[existingLike]] = await connection.query('SELECT * FROM likes WHERE user_id = ? AND reel_id = ?', [userId, reelId]);

    if (existingLike) {
      throw new Error('El usuario ya ha dado like a este reel');
    }

    await connection.query('INSERT INTO likes (user_id, reel_id) VALUES (?, ?)', [userId, reelId]);

    await updateLikes(reelId);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const updateLikes = async (reel_id) => {
  let connection;

  try {
    connection = await getConnection();
    await connection.query('UPDATE reels SET likes = (SELECT COUNT(*) FROM likes WHERE reel_id = ?) WHERE id = ?', [reel_id, reel_id]);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};


const isLiked = async (userId, reelId) => {
  let connection;

  try {
    connection = await getConnection();

    // Verificar si ya existe un like del usuario en el reel
    const [[existingLike]] = await connection.query('SELECT * FROM likes WHERE user_id = ? AND reel_id = ?', [userId, reelId]);

    if (existingLike) {
      throw new Error('El usuario ya ha dado like a este reel');
    }

    // Insertar un nuevo like en la tabla likes
    await connection.query('INSERT INTO likes (user_id, reel_id) VALUES (?, ?)', [userId, reelId]);

    await updateLikes(reelId);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const hasLiked = async (user_id, reel_id) => {
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

    // Verificar si el usuario ha dado like al reel
    const [[existingLike]] = await connection.query('SELECT * FROM likes WHERE user_id = ? AND reel_id = ?', [user_id, reel_id]);

    if (!existingLike) {
      throw new Error('El usuario no ha dado like a este reel');
    }

    // Eliminar el like de la tabla likes
    await connection.query('DELETE FROM likes WHERE user_id = ? AND reel_id = ?', [user_id, reel_id]);

    await updateLikes(reel_id);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const updateLikes = async (reel_id) => {
  let connection;

  try {
    connection = await getConnection();
    await connection.query('UPDATE reels SET likes = (SELECT COUNT(*) FROM likes WHERE reel_id = ?) WHERE id = ?', [reel_id, reel_id]);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

export { createLike,isLiked, hasLiked, unlikeReel, updateLikes };
