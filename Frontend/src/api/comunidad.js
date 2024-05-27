import axios from "./axios";

export const getAllComunidad = () => axios.get("/comunidad/comunidades")

export const CreateCommunity = (community) => axios.post("/comunidad/comunidades", community)

export const JoinCommunity = (id) => axios.post(`/comunidad/comunidades/${id}/unirse`)

export const GetOneCommunity = (id) => axios.get(`/comunidad/comunidades/${id}`)

export const DeleteCommunity = (id) => axios.delete(`/comunidad/comunidades/${id}`)


export const UpdtCommunity = (values, id) => axios.put(`/comunidad/comunidades/${id}`, values)