import axios from "./axios";

export const AuthLogin = (user) => axios.post("/api/auth/login", user)

export const AuthRegister = (user) => axios.post("/api/auth/registrar", user)

export const verifyToken = () => axios.get('/api/auth/verify')

export const Perfil = (profileData) => axios.post("/perfil/crearPerfil", profileData)

export const ActualizarPerfil = (datos) => axios.put('/perfil/actualizarPerfil', datos)

export const ObtenerTodosPerfiles = () => axios.get('/perfil/perfiles')

export const myperfil = axios.create({
    baseURL: 'http://localhost:5000/perfil',
    withCredentials: true
  });
  export const actualizarPerfil = axios.create({
    baseURL: 'http://localhost:5000/perfil',
    withCredentials: true
  });
  export const Logaut = axios.create({
    baseURL: 'http://localhost:5000/auth',
    withCredentials: true
  });