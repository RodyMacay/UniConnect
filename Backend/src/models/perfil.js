import mongoose from "mongoose";

const perfilSchema = new mongoose.Schema({
  nombrePerfil: { type: String, required: true },
  edad: { type: Number },
  ubicacion: { type: String },
  imagenPerfil: { type: String, required: true}, // Aquí puedes almacenar el nombre del archivo de la imagen
  biografia: { type: String },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }, // Referencia al usuario
});

export const Perfil = mongoose.model("PerfilUser", perfilSchema);
