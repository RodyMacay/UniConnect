import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  edad: { type: Number },
  ubicacion: { type: String },
  genero: { type: String, enum: ['Masculino', 'Femenino', 'Otro'] },
  imagenPerfil: { type: String }, // Enlace a la imagen de perfil
  biografia: { type: String },
  redesSociales: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
  },
  intereses: [{ type: String }],
  amigos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }], // Referencias a otros usuarios como amigos
  esAdmin: { type: Boolean, default: false }
});

export const Usuario = mongoose.model('Usuario', usuarioSchema);

