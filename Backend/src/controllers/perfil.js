
import { Perfil } from '../models/perfil.js';

export const crearPerfil = async (req, res) => {
  try {
    const { nombrePerfil, edad, ubicacion, biografia, imagenPerfil } = req.body;

    const usuarioAutenticado = req.usuario;

    const nuevoPerfilData = {
      nombrePerfil,
      edad,
      ubicacion,
      biografia,
      usuario: usuarioAutenticado.id,
      imagenPerfil, // Utiliza la URL de la imagen directamente
    };

    // Crear el nuevo perfil en la base de datos
    const nuevoPerfil = await Perfil.create(nuevoPerfilData);
    
    // Enviar el perfil creado como respuesta
    res.status(201).json({ mensaje: 'Perfil creado exitosamente', perfil: nuevoPerfil });
  } catch (error) {
    console.error('Error al crear el perfil', error);
    res.status(500).json({ mensaje: 'Error al crear el perfil' });
  }
};



export const obtenerPerfil = async (req, res) => {
  try {
    // Obtén los datos del perfil desde la base de datos
    const perfil = await Perfil.findOne({ usuario: req.usuario.id });

    if (!perfil) {
      return res.status(404).json({ mensaje: 'Perfil no encontrado' });
    }

    res.status(200).json(perfil);
  } catch (error) {
    console.error('Error al obtener el perfil', error);
    res.status(500).json({ mensaje: 'Error al obtener el perfil' });
  }
};

export const obtenerTodosPerfil = async (req, res) => {
  try {
    const perfiles = await Perfil.find()
    res.status(200).json(perfiles);
   /*  console.log(perfiles) */
  } catch (error) {
    console.error('Error al obtener los perfiles', error);
    res.status(500).json({ mensaje: 'Error al obtener los perfiles' });
  }
};

export const actualizarPerfil = async (req, res) => {
  const { nombrePerfil, edad } = req.body;
  const iduser = req.usuario
  console.log(iduser)
  try {
    const perfil = await Perfil.findOneAndUpdate(
      { usuario: iduser.id }, 
      { $set: { nombrePerfil, edad} },
      { new: true }
    );
    if (!perfil) {
      return res.status(404).json({ mensaje: 'Perfil no encontrado' });
    }
    res.status(200).json(perfil);
  } catch (error) {
    console.error('Error al actualizar el perfil', error);
    res.status(500).json({ mensaje: 'Error al actualizar el perfil' });
  }
};
