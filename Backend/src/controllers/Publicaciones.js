import { Perfil } from '../models/perfil.js';
import { Publicacion } from '../models/publicacionPrincipal.js'; // Importa el modelo de publicación
import { Usuario } from '../models/usuario.js'; // Importa el modelo de usuario

export const crearPublicacion = async (req, res) => {
  try {
    const { contenido, imagen} = req.body;

    const usuarioAutenticado = req.usuario;
    const autorPublicacion = await Perfil.findOne({ usuario: usuarioAutenticado.id });

    if (!autorPublicacion) {
      return res.status(400).json({ mensaje: 'Perfil de usuario no encontrado' });
    }

    const nuevaPublicacionData = {
      contenido,
      autor: usuarioAutenticado.id,
      imagen,
      nombreAutor: autorPublicacion.nombrePerfil
    };

 /*    if (imagen) {
      nuevaPublicacionData.imagen = imagen.filename;
    }
 */
    const nuevaPublicacion = await Publicacion.create(nuevaPublicacionData);

    res.status(201).json({ mensaje: 'Publicación creada exitosamente', publicacion: nuevaPublicacion });
  } catch (error) {
    console.error('Error al crear la publicación', error);
    res.status(500).json({ mensaje: 'Error al crear la publicación' });
  }
};


export const obtenerTodasLasPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.find().populate('autor', 'nombreUsuario'); // Popula el campo 'autor' con el nombre del usuario

    res.status(200).json(publicaciones);
  } catch (error) {
    console.error('Error al obtener las publicaciones', error);
    res.status(500).json({ mensaje: 'Error al obtener las publicaciones' });
  }
};


export const agregarComentario = async (req, res) => {
  try {
    const { publicacionId, contenido } = req.body;
    const usuarioAutenticado = req.usuario;
    console.log(usuarioAutenticado)

    // Verificar si el usuario está autenticado
    if (!usuarioAutenticado || !usuarioAutenticado.id) {
      return res.status(400).json({ mensaje: 'Usuario no autenticado' });
    }

    // Buscar la publicación a la que se agregará el comentario
    const publicacion = await Publicacion.findById(publicacionId);

    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada' });
    }

    // Obtener el perfil del autor del comentario
    const autorComentario = await Perfil.findOne({ usuario: usuarioAutenticado.id });

    if (!autorComentario) {
      return res.status(400).json({ mensaje: 'Perfil de usuario no encontrado' });
    }

    // Crear el nuevo comentario con el nombre del autor
    const nuevoComentario = {
      contenido,
      autor:usuarioAutenticado.id,
      nombreAutor: autorComentario.nombrePerfil // Cambia "nombrePerfil" por el campo correcto en tu modelo de perfil
      
    };

    // Agregar el comentario a la lista de comentarios de la publicación
    publicacion.comentarios.push(nuevoComentario);

    // Guardar la publicación actualizada con el nuevo comentario
    await publicacion.save();

    res.status(201).json({ mensaje: 'Comentario agregado con éxito', comentario: nuevoComentario });
  } catch (error) {
    console.error('Error al agregar el comentario:', error);
    res.status(500).json({ mensaje: 'Error al agregar el comentario' });
  }
};
