import { Router } from "express";
import { CreateToken } from "../libs/jwt.js";
import { Usuario } from "../models/usuario.js";
import bcrypt from "bcryptjs";
import Auth from "../models/auth.js";
import {
  loginValidate,
  registerValidate,
  usersValidate,
} from "../schemas/authValidate.js";
import { validateDate } from "../middleware/validateData.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

const router = Router();

// Rutas de auth
router.post(
  "/auth/registrar",
  validateDate(registerValidate),
  async (req, res) => {
    const { correo, contraseña, nombre } = req.body;

    console.log(correo);
    try {
      // Verificar que no exista el email
      const existeEmail = await Auth.findOne({ correo });

      if (existeEmail) {
        return res.status(400).json({ error: ["El email ya está en uso"] });
      }

      // Crear el usuario en la colección Usuario

      const nuevoUsuario = new Usuario({
        nombre,
        correo,
      });

      const usuarioCreado = await nuevoUsuario.save();

      // Hashear el password
      const hashedPassword = await bcrypt.hash(contraseña, 10);

      // Crear el registro en la colección Auth
      const nuevoAuth = new Auth({
        correo,
        contraseña: hashedPassword,
        usuario: usuarioCreado._id,
      });

      const usuarioSaved = await nuevoAuth.save();
      const token = await CreateToken({ id: usuarioSaved._id });
      // Corregir la configuración de la cookie
      res.cookie("token", token, {
        sameSite: "none",
        secure: true,
        httpOnly: false,
      });

      res.json(usuarioSaved);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  }
);

router.post("/auth/login", validateDate(loginValidate), async (req, res) => {
  const { correo, contraseña } = req.body;
  console.log(correo);
  try {
    const userFound = await Auth.findOne({ correo }).populate("usuario");
    console.log(userFound);
    if (!userFound)
      return res.status(400).json({ error: ["Usuario no encontrado"] });
    const comparePassword = await bcrypt.compare(
      contraseña,
      userFound.contraseña
    ); // me devuelve true o false
    console.log(comparePassword);
    if (!comparePassword)
      return res.status(400).json({ error: ["Contraseña incorrecta"] });

    const token = await CreateToken({ id: userFound._id });
    console.log(token);
    res.cookie("token", token),
      { sameSite: "none", secure: true, httpOnly: false };
    console.log(userFound);
    res.json(userFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/auth/logout", (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
});

router.get("/auth/verify", async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No autorizado" });
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const usuarioEncontrado = await Auth.findById(user.id).populate("usuario");

    if (!usuarioEncontrado)
      return res.status(401).json({ message: "No autorizado" });

    res.json({
      id: usuarioEncontrado,
      usuario: usuarioEncontrado.usuario,
      correo: usuarioEncontrado.correo,
    });
  });
});

export default router;