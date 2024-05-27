import express from 'express';
/* import multer from 'multer'; */
/* import { fileURLToPath } from 'url'; // Importa fileURLToPath
import path, { dirname } from 'path'; // Importa path y dirname */
import {  actualizarPerfil, crearPerfil, obtenerTodosPerfil } from '../controllers/perfil.js'; // Importa el controlador necesario
import { obtenerPerfil } from '../controllers/perfil.js';
import { authRequired } from '../middleware/validateToken.js';

const router = express.Router();

// Obtiene la ruta del archivo actual (perfil.routes.js)
/* const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 */
// Configura el almacenamiento de multer
/* const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads'); // Ruta completa del directorio de subida
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
}); */

/* const upload = multer({ storage: storage }); */

// Ruta para crear un nuevo perfil
router.post('/crearPerfil',authRequired, crearPerfil);
router.get('/ver',authRequired, obtenerPerfil)
router.get('/perfiles', obtenerTodosPerfil)
router.put('/actualizarPerfil', authRequired,actualizarPerfil)
/* router.put('/actualizarPerfil', authRequired, upload.single('imagenPerfil'), actualizarPerfil); */
// Otras rutas relacionadas con perfiles

export default router;
