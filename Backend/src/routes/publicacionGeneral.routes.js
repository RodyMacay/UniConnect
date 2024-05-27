import express from 'express';
import { crearPublicacion, agregarComentario, obtenerTodasLasPublicaciones } from '../controllers/Publicaciones.js';
import { authRequired } from '../middleware/validateToken.js';

const router = express.Router();

// Ruta para crear una nueva publicación
router.post('/crearPublicacion', authRequired, crearPublicacion);

// Ruta para agregar un comentario a una publicación
router.post('/agregarComentario', authRequired, agregarComentario);

// Ruta para obtener todas las publicaciones
router.get('/obtenerPublicaciones', obtenerTodasLasPublicaciones);

export default router;
