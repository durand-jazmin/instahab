# Simple Instagram API

Este ejercicio consiste en crear una API que simule el funcionamiento de una aplicación similar a Instagram.

## Instalar

- Crear una base de datos vacía en una instancia de MySQL local.
- Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.
- Ejecutar `node db/initDB` para crear las tablas necesarias en la base de datos anteriormente creada.
- Ejecutar `npm run dev` o `npm start` para lanzar el servidor.

## Entidades

- User:
  - id
  - email
  - password
  - created_at
- Reel:
  - id
  - user
  - text
  - image 
  - created_at


Usuarios:

- **POST /user** Registro de usuario
- **GET /user/:id** Devuelve información de usuario
- **GET /user/** Devuelve información del usuario del token (necesita cabecera con token)
- **POST /login** Login de usuario (devuelve token)

Tweets:

- **POST /** Permite crear un reel (necesita cabecera con token)
- **GET /** Lista todos los reels
- **GET /tweet/:id** Devuelve un reel
- **DELETE /tweet/:id** Borra un reel solo si eres quien lo creó (necesita cabecera con token)

