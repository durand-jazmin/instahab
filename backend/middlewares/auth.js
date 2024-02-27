import jwt from 'jsonwebtoken';
import { generateError } from'../helpers.js';

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError('Falta la cabecera de Authorization', 401);
    }
    let token;

    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError('Token incorrecto', 401);
    }
    req.userId = token.id;
    next();
  } catch (error) {
    next(error);
  }
};

export { authUser };
