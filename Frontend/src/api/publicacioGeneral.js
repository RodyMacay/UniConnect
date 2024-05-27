import axios from "./axios";

export const CrearPublicacion = (datos) => axios.post("/publicaciones/crearPublicacion", datos)

export const Comentario = (datos) => axios.post("/publicaciones/agregarComentario", datos)

export const ObtenerPublicaciones = () => axios.get('/publicaciones/obtenerPublicaciones')
