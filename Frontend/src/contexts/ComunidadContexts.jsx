import { createContext, useContext, useEffect, useState } from "react";
import {
  CreateCommunity,
  DeleteCommunity,
  getAllComunidad,
  GetOneCommunity,
  JoinCommunity,
  UpdtCommunity,
} from "../api/comunidad";
import { CreatePublication, GetAllPublication } from "../api/publicaciones";

export const Comunidades = createContext();

export const useComunity = () => {
  const context = useContext(Comunidades);
  if (!context)
    return console.log("useComunity debe estar dentro de un comunidadProvider");
  return context;
};

export const ComunidadProvider = ({ children }) => {
  const [comunidades, setComunidad] = useState([]);
  const [unacomunidad, setUnacomunidad] = useState([]);
  const [publicacion, setPublicacion] = useState([]);
  const [error, setError] = useState(null);

  const Comunidad = async () => {
    try {
      const res = await getAllComunidad();
      setComunidad(res.data);
      console.log(comunidades);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const CreateComunidad = async (values) => {
    try {
      const res = await CreateCommunity(values);
      console.log(res.data);
      return { error1: false };
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
      return { error1: true };
    }
  };

  const unirseComunidad = async (id) => {
    try {
      const res = await JoinCommunity(id);
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  const ObtenerUnaComunidad = async (id) => {
    try {
      const res = await GetOneCommunity(id);
      setUnacomunidad([res.data]);
      console.log(unacomunidad);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  const CreatePublicacion = async (values, id) => {
    try {
      const res = await CreatePublication(values, id);
      console.log(res.data);
      setPublicacion(res.data);
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  const EliminarComunidad = async (id) => {
    try {
      const res = await DeleteCommunity(id);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ActualizarComunidad =  (values, id) => {
    try {
      console.log(values)
      
      const res = UpdtCommunity(values, id)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerPublicaciones = async (id) => {
    try {
      const res = await GetAllPublication(id);
      setPublicacion(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPublicacion([]); // Limpia las publicaciones al cambiar de comunidad
  }, [unacomunidad]);

  return (
    <Comunidades.Provider
      value={{
        Comunidad,
        comunidades,
        CreateComunidad,
        error,
        unirseComunidad,
        ObtenerUnaComunidad,
        unacomunidad,
        CreatePublication,
        EliminarComunidad,
        ActualizarComunidad,
        publicacion,
        obtenerPublicaciones,
      }}
    >
      {children}
    </Comunidades.Provider>
  );
};