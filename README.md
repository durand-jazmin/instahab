# DESCRIPCIÓN
#
## Implementar una API que permita publicar fotos (añadiendo o no textos) y que otras personas puedan verlas.
#
# USUARIOS ANÓNIMOS:
#
## Ver las últimas fotos publicadas por otros usuarios
#
## Ver el perfil de un usuario con su galería de fotos
# **GET /user/:id** Devuelve información de usuario
## Buscar fotos (por su texto descriptivo)
#
# Login:
# **POST /login**  Login de usuario (devuelve token)
#
# Registro
# **POST /user**  Registro de usuario
# id,email,password,created_at
# POSTS
# id,user,text,image,created_at


# USUARIOS REGISTRADOS PUEDEN ADEMÁS:
#
## ● Hacer una publicación de una foto (la foto debe ajustarse automáticamente a un tamaño máximo y unas proporciones establecidas por la plataforma). 
# node process.js --inputDir=images --outputDir=result --watermark=hab.png --resize=500

# Y añadirle una descripción. 
# **POST /**  Permite crear un post (necesita cabecera con token)
#
## ● Hacer/Quitar un “like” a una foto
#
## ● Opcional:
## ○ Gestión del perfil (cambios en los datos de registro)
## ○ Comentar una foto (no se permiten comentarios a comentarios)
#
## Modulos de npm 
# -minimist
# -chalk
# - sharp
# - bcrypt
# - dotenv
# - express
# - express-fileupload
# - jsonwebtoken
# - morgan
# - mysql2
# - nanoid
# Para desarrollo
# eslint
# nodemon
# prettier