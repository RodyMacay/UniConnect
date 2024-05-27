import mongoose, {model} from 'mongoose';

const publicacionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
  nombreAutor: {type: String},
  fechaPublicacion: { type: Date, default: Date.now },
  etiquetas: [{ type: String }],
  comentarios: [
    {
      texto: { type: String },
      autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
      fechaComentario: { type: Date, default: Date.now }
    }
  ],
  comunidad: { type: mongoose.Schema.Types.ObjectId, ref: 'Comunidad'},
  nombreComunidad: {type: String},
  meGusta: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  compartidoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  imagenAdjunta: { type: String },
  enlaceExterno: { type: String },
  visitas: { type: Number, default: 0 }, // Contador de visitas
  duracionLectura: { type: Number }, // Tiempo estimado de lectura en minutos
  archivada: { type: Boolean, default: false }, // Indica si la publicación está archivada
  destacada: { type: Boolean, default: false }, // Indica si la publicación está destacada
  // Otros atributos de la publicación
});

export const Publicacion = model('Publicacion', publicacionSchema);


