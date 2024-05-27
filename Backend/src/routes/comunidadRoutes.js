import { Router } from "express";
import { Comunidad } from "../models/comunidad.js";
import { Usuario } from "../models/usuario.js";
import { Publicacion } from "../models/publicacion.js";
import Auth from "../models/auth.js";
import { validateDate } from "../middleware/validateData.js";
import { comunidadValidation, publicacionValidation } from "../schemas/authValidate.js";
const router = Router();

// Rutas de comunidades

router.post("/comunidades", validateDate(comunidadValidation), async (req, res) => {
  const { nombre_comunidad, descripcion, categoria } = req.body;

  try {
    // Verificar si ya existe una comunidad con el mismo nombre
    const comunidadExistente = await Comunidad.findOne({ nombre_comunidad });

    if (comunidadExistente) {
      return res.status(400).json({ message: ["Ya existe una comunidad con este nombre"] });
    }
    // Obtener el usuario autenticado
    const usuarioCreador = req.usuario;
    console.log(usuarioCreador)

    const auth = await Auth.findById(usuarioCreador.id)
    console.log(auth)
    const {usuario} = auth
    const user = await Usuario.findById(usuario)

    user.esAdmin = true;

    // Guardar los cambios en el usuario
    await user.save();

    const nuevaComunidadData = {
      nombre_comunidad,
      descripcion,
      categoria,
      creador: usuarioCreador._id,
      nombre_creador: user.nombre,
    };

    const nuevaComunidad = await Comunidad.create(nuevaComunidadData);

    // Inicializar la propiedad comunidadesCreadas si no está definida
    if (!usuarioCreador.comunidadesCreadas) {
      usuarioCreador.comunidadesCreadas = [];
    }

    // Agregar la comunidad a la lista de comunidades creadas por el usuario
    usuarioCreador.comunidadesCreadas.push(nuevaComunidad._id);

    // await usuarioCreador.save();

    res.status(201).json(nuevaComunidad);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la comunidad" });
  }
});


// Ruta para ver comunidades

router.get("/comunidades", async(req,res) => {
  try {
    const comunidad = await Comunidad.find()

    if(!comunidad) return res.status(402).json({message: ["No existen comunidades"]})

    res.json(comunidad)
    
  } catch (error) {
    res.status(402).json({message: ["Error al obtener comunidades"]})
  }
})

// Ruta para ver una comunidad

router.get("/comunidades/:idCommunity", async (req, res) => {
  const { idCommunity } = req.params;

  try {
    const comunidad = await Comunidad.findById(idCommunity);

    if (!comunidad) {
      return res.status(404).json({ message: "Comunidad no encontrada" });
    }

    res.json(comunidad);
  } catch (error) {
    console.error(error.data);
    res.status(500).json({ message: "Error en el servidor" });
  }
});


// Ruta para unirse a una comunidad
router.post("/comunidades/:id/unirse", async (req, res) => {
  const { id } = req.params; // Id de la comunidad
  const idUsuario = req.usuario.id; // Supongamos que el ID del usuario está en req.user

  try {
    // Buscar la comunidad por su id
    const comunidad = await Comunidad.findById(id).populate();
    if (!comunidad) {
      return res.status(404).json({ mensaje: "Comunidad no encontrada" });
    }

     // Verificar si el id del usuario ya está en la lista de miembros
     if (comunidad.miembros.includes(idUsuario)) {
      return res.status(400).json({ message: ["Ya eres miembro de esta comunidad"] });
    }

    // Agregar el id del usuario a los miembros de la comunidad
    comunidad.miembros.push(idUsuario);

    // Guardar los cambios en la comunidad
    await comunidad.save();

    res.json({
      mensaje: "Te has unido a la comunidad " + comunidad.nombre_comunidad,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al unirse a la comunidad" });
  }
});

//Ruta para unirse a una comunidad
// router.post("/comunidades/:idUsuario/:idComunidad/unirse", async (req, res) => {
//   const { idUsuario } = req.params; // ID del usuario que quiere unirse
//   const { idComunidad } = req.params; // ID de la comunidad a la que quiere unirse
//   console.log(req.body);

//   try {
//     // Buscar la comunidad por su id
//     const comunidad = await Comunidad.findById(idComunidad);
//     console.log(comunidad);

//     if (!comunidad) {
//       return res.status(404).json({ mensaje: "Comunidad no encontrada" });
//     }

//     const usuario = await Usuario.findById(idUsuario);

//     if (!usuario) {
//       return res.status(404).json({ mensaje: "Usuario no encontrado" });
//     }

//     console.log(usuario);

//     // Agregar el id del usuario a los miembros de la comunidad
//     comunidad.miembros.push(idUsuario);

//     // Guardar los cambios en la comunidad
//     await comunidad.save();

//     res.json({
//       mensaje: "Te has unido a la comunidad " + comunidad.nombre_comunidad,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ mensaje: "Error al unirse a la comunidad" });
//   }
// });

// Obtener los miembros de una comunidad con sus nombres
router.get("/comunidades/:idComunidad/miembros", async (req, res) => {
  const { idComunidad } = req.params; // ID de la comunidad

  try {
    // Buscar la comunidad por su id
    const comunidad = await Comunidad.findById(idComunidad);

    if (!comunidad) {
      return res.status(404).json({ mensaje: "Comunidad no encontrada" });
    }

    // Obtener los detalles de los miembros de la comunidad
    const miembrosConNombres = [];
    for (const idUsuario of comunidad.miembros) {
      const usuario = await Usuario.findById(idUsuario);
      if (usuario) {
        miembrosConNombres.push({ idUsuario, nombreUsuario: usuario.nombre });
      }
    }

    res.json({ miembros: miembrosConNombres });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener los miembros de la comunidad" });
  }
});

//dejar comunidada
router.post("/comunidades/:comunidadId/dejar", async (req, res) => {
  try {
    const comunidadId = req.params.comunidadId;
    const usuarioId =  req.usuario.id;

    const comunidad = await Comunidad.findById(comunidadId);

    console.log(comunidad);
    console.log(usuarioId);
    if (!comunidad) {
      return res.status(404).json({ error: "Comunidad no encontrada" });
    }

    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    comunidad.miembros.pull(usuarioId);
    await comunidad.save();

    // Eliminar la referencia de la comunidad en la lista de comunidades a las que el usuario pertenece
    await Usuario.findByIdAndUpdate(usuarioId, {
      $pull: { comunidadesMiembro: comunidadId },
    });

    res.json(comunidad);
  } catch (error) {
    res.status(500).json({ error: "Error al dejar la comunidad" });
  }
});

// Eliminar comunidad:
router.delete("/comunidades/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar que el usuario es admin
    const comunidad = await Comunidad.findById(id);

    if (!comunidad) {
      return res.status(404).json({ mensaje: "Comunidad no encontrada" });
    }

    const usuario = await Usuario.findOne({ nombre: comunidad.nombre_creador });

    if (!usuario || !usuario.esAdmin) {
      return res.status(401).json({ mensaje: "No autorizado" });
    }

    // Eliminar la comunidad
    await Comunidad.findByIdAndDelete(id);

    res.json({ mensaje: "Comunidad eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// actualizar 

router.put("/comunidades/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre_comunidad, descripcion } = req.body;

  console.log(nombre_comunidad)

  try {
    // Verificar que el usuario es admin
    const comunidad = await Comunidad.findById(id);

    console.log(comunidad)

    if (!comunidad) {
      return res.status(404).json({ mensaje: "Comunidad no encontrada" });
    }

    const usuario = await Usuario.findOne({ nombre: comunidad.nombre_creador });

    if (!usuario || !usuario.esAdmin) {
      return res.status(401).json({ mensaje: "No autorizado" });
    }

    // Actualizar la comunidad utilizando findByIdAndUpdate
    const updatedComunidad = await Comunidad.findByIdAndUpdate(
      id,
      { nombre_comunidad, descripcion },
      { new: true } // Esto devuelve la versión actualizada de la comunidad
    );

    console.log(updatedComunidad)

    res.json(updatedComunidad );
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});




//  Crear publicación en comunidad
router.post("/comunidades/:id/publicaciones", validateDate(publicacionValidation),async (req, res) => {
  const { titulo, contenido } = req.body;
  const { id } = req.params;
  console.log(titulo);
  console.log(contenido);

  const comunidad = await Comunidad.findById(id);

  const usuario1 = await Auth.findById(req.usuario.id)
  
  const usuarios = await Usuario.findById(usuario1.usuario)
  console.log(usuarios)

  if (!comunidad)
    return res.status(402).json({ message: "No existe comunidad" });

  try {
    const nuevaPublicacion = new Publicacion({
      titulo,
      contenido,
      autor: usuarios._id,
      nombreAutor: usuarios.nombre,
      comunidad: id,
      nombreComunidad: comunidad.nombre_comunidad,
    });

    comunidad.publicaciones.push(nuevaPublicacion._id);

    await comunidad.save();

    const publicacionCreada = await nuevaPublicacion.save();

    res.json(publicacionCreada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// 2. Obtener una publicacion de comunidad
router.get("/comunidades/:id/publicacion", async (req, res) => {
  const { id } = req.params;

  try {
    const publicaciones = await Publicacion.findById(id)
      .populate("autor", "nombre")
      .sort({ createdAt: -1 })
      .limit(10);
    if (!publicaciones)
      return res.status(402).json({ message: ["No existen publicaciones"] });
    res.json(publicaciones);
    console.log(publicaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

router.get("/comunidades/:id/publicaciones", async (req, res) => {
  const { id } = req.params;

  try {
    const publicaciones = await Publicacion.find({ comunidad: id })
      .populate("autor", "nombre")
      .sort({ createdAt: -1 })
      .limit(10);

    if (!publicaciones)
      return res.status(402).json({ message: ["No existen publicaciones"] });

      console.log(publicaciones)

    res.json(publicaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// 3. Ver comunidades de un usuario
router.get("/usuarios/:id/comunidades", async (req, res) => {
  const { id } = req.params;
  console.log(req.usuario);
  try {
    const comunidades = await Comunidad.find({
      $or: [{ creador: id }, { miembros: id }],
    });

    console.log(comunidades);

    if (!comunidades) {
      return res.status(404).json({ mensaje: "Comunidad no encontrada" });
    }

    if (comunidades.length === 0)
      return res
        .status(404)
        .json({ mensaje: "El usuario no está en ninguna comunidad" });

    res.json(comunidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});
0;

// Eliminar miembro de una comunidad
router.delete(
  "/comunidades/:idComunidad/miembros/:idUsuario",
  async (req, res) => {
    const { idComunidad, idUsuario } = req.params;

    const usuario = await Usuario.findById(idUsuario);

    if (!usuario)
      return res.status(202).json({ message: ["Usuario no encontrado"] });

    console.log(usuario.esAdmin);

    if (usuario.esAdmin) {
      return res.status(401).json({ error: "No autorizado" });
    }

    try {
      const comunidad = await Comunidad.findById(idComunidad);

      if (!comunidad)
        return res.status(202).json({ message: ["Comunidad no encontrada"] });

      console.log(comunidad);

      console.log(req.usuario.id);
      const comunidadNew1 = comunidad.miembros.pull(req.usuario.id);

      console.log(comunidadNew1);

      const CumunidadNew = await comunidad.save();

      res.json(CumunidadNew);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error en el servidor" });
    }
  }
);

// Eliminar publicación:
router.delete("/publicaciones/:id", async (req, res) => {
  // Obtener ID de publicación
  const { id } = req.params;

  // Verificar que el usuario es el autor
  const publicacion = await Publicacion.findById(id);

  if (!publicacion) {
    return res.status(404).json({ mensaje: "Publicación no encontrada" });
  }

  if (publicacion.autor.toString() !== req.usuario.id) {
    return res.status(401).json({ error: "No autorizado" });
  }

  const comunidad = await Comunidad.findById(publicacion.comunidad);

  if (!comunidad) {
    return res.status(404).json({ mensaje: "Comunidad no encontrada" });
  }

  comunidad.publicaciones.pull(id);

  await comunidad.save();

  // Eliminar la publicación
  await Publicacion.findByIdAndDelete(id);

  res.json({ mensaje: "Publicación eliminada" });
});

export default router;