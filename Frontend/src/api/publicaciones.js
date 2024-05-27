import axios from "./axios";

export const CreatePublication = (publication, id) => axios.post(`/comunidad/comunidades/${id}/publicaciones`, publication)

export const GetAllPublication = (id) => axios.get(`/comunidad/comunidades/${id}/publicaciones`)