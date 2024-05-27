import { Router } from "express";
import { validateDate } from "../middleware/validateData.js";
import { Comunidad } from "../models/comunidad.js";
import { Usuario } from "../models/usuario.js";
import { usersValidate } from "../schemas/authValidate.js";

const router = Router();

// Ruta para ver y editar el perfil del usuario
router.get("/users/:id",async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Usuario.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    res.status(500).json({ error: "Error al obtener el perfil del usuario" });
  }
});

router.post("/users", validateDate(usersValidate),async (req, res) => {
  const { nombre, correo } = req.body;

  try {
    // Crear el usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
    });

    // Devolver el usuario creado
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const updatedUser = await Usuario.findByIdAndUpdate(
      id,
      { nombre },
      { new: true }
    );
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error al actualizar el perfil del usuario:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar el perfil del usuario" });
  }
});

// Cambiar o actualizar contraseña

// Ruta para ver las comunidades a las que pertenece un usuario
router.get("/users/:id/comunidades", async (req, res) => {
  const { id } = req.params; 
  console.log(id)

  // Validar que el usuario autenticado sea el mismo
  // Para esto se puede usar el id guardado en el token JWT

  try {
    const user = await Usuario.findById(id);
    console.log(user)

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Paginación
    const page = req.query.page || 1;
    const limit = 5;

    const comunidades = await Usuario.findById(id).populate({
      path: "Comunidad",
      select: "nombre descripcion", // Poblar campos
      options: {
        limit, // Resultados por página
        skip: (page - 1) * limit, // Saltear resultados
      },
    });

    console.log(comunidades)

    res.json(comunidades);
  } catch (error) {
    // Manejar error específico de populate
    if (error) {
      return res.status(500).json({ error: "Error al poblar comunidades" });
    }

    res.status(500).json({ error: "Error al obtener comunidades" });
  }
});

export default router;
