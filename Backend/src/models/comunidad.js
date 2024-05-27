import mongoose from "mongoose";

const comunidadSchema = new mongoose.Schema({
  nombre_comunidad: { type: String, required: true },
  descripcion: { type: String, required: true },
  creador: { type: mongoose.Schema.ObjectId,ref: "Usuario"}, // Referencia al usuario que creó la comunidad
  nombre_creador: { type: String },
  miembros: [{ type: mongoose.Schema.ObjectId, ref: "Usuario" }], // Referencias a los usuarios miembros de la comunidad
  fechaCreacion: { type: Date, default: Date.now },
  publicaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Publicacion" }], // Referencias a las publicaciones en la comunidad
  categoria: { type: String, required: true },
}, {timestamps: true});

export const Comunidad = mongoose.model("Comunidad", comunidadSchema);
 