import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema({
  contenido: { type: String, required: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }, // Referencia al autor del comentario
  fechaCreacion: { type: Date, default: Date.now },
  nombreAutor: { type: String, ref: "Usuario.nombre", required: true } // Nuevo campo para almacenar el nombre del autor
});

const publicacionSchema = new mongoose.Schema({
  contenido: { type: String, required: true },
  imagen: { type: String }, // Almacena el nombre del archivo de la imagen si es necesario
  fechaCreacion: { type: Date, default: Date.now },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }, // Referencia al autor de la publicación
  nombreAutor: { type: String, ref: "Usuario.nombre", required: true },
  comentarios: [comentarioSchema], // Campo para almacenar los comentarios
});

export const Publicacion = mongoose.model("PublicacionGeneral", publicacionSchema);
