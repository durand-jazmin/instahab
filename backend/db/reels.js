import { generateError } from '../helpers.js';
import { getConnection } from './getPool.js';

const deleteReelById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM reels WHERE id = ?
    `,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

const getReelById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT reels.id, reels.user_id, reels.text, reels.image, reels.created_at, users.email FROM reels LEFT JOIN users on reels.user_id = users.id WHERE reels.id = ?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`El reel con id: ${id} no existe`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const getReelsByUserId = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT reels.*, users.email FROM reels LEFT JOIN users on reels.user_id = users.id WHERE reels.user_id = ?
    `,
      [id]
    );

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const getAllReels = async () => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
    SELECT reels.id, reels.user_id, reels.text, reels.image, reels.created_at, users.email FROM reels LEFT JOIN users on reels.user_id = users.id ORDER BY reels.created_at DESC
    `);

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const createReel= async (userId, text, image = '') => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      INSERT INTO reels (user_id, text, image)
      VALUES(?,?,?)
    `,
      [userId, text, image]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

export { createReel, getAllReels, getReelById, getReelsByUserId, deleteReelById };