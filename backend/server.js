import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import {
  newUserController,
  getUserController,
  getUserReelsController,
  getMeController,
  loginController,
} from './controllers/users.js';

import {
  getReelsController,
  newReelController,
  getSingleReelController,
  deleteReelController,
} from './controllers/reels.js';

import {
  isLikedController,
  unlikeReelController,
hasLikedController
} from './controllers/likes.js';

import { authUser } from './middlewares/auth.js';

dotenv.config();

const app = express();

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('./uploads'));

// Rutas de usuario
app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.get('/user/:id/reels', getUserReelsController);
app.get('/user', authUser, getMeController);
app.post('/login', loginController);

// Rutas de reels
app.post('/', authUser, newReelController);
app.get('/', getReelsController);
app.get('/reel/:id', getSingleReelController);
app.delete('/reel/:id', authUser, deleteReelController);

//Rutas de likes
app.post('/reels/:reelId/like', authUser, isLikedController);
app.delete('/reels/:reelId/like', authUser, unlikeReelController);
app.get('/reels/:reelId/hasLiked/:userId', hasLikedController);

// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// Middleware de gestión de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT} `);
});
