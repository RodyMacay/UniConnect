import Publicaciones from "../components/Publicacion";
import { useComunity } from "../contexts/comunidadContexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../iconos/iconConfig";
import { useState } from "react";
import  CreatePostForm from "../../src/pages/Comunidad/publicaciones/CreatePublication";

import VerPublicaciones from "../components/VerPublicaciones";
import { useNavigate, useLocation } from "react-router-dom";



const Community = () => {
  const navegate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const { unacomunidad } = useComunity();

  const toggleCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  const handleRefresh = () => {
    navegate("/comunidad"); 
    window.location.reload();
  };

  return (
    <>
      { Array.isArray(unacomunidad) && unacomunidad.length > 0 ? (unacomunidad.map((comunidad) => (
        <div key={comunidad._id} className="mb-6">
          <button onClick={handleRefresh}>Regresar</button>
          <div className="border p-4 m-5 flex justify-center rounded-lg">
            <h3 className="text-4xl font-bold">
              {comunidad.nombre_comunidad}
            </h3>
          </div>
          <div className="border p-4 bg-white rounded-lg shadow-md m-7">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              {comunidad.nombre_comunidad}
            </h3>
            <p className="text-gray-600 mb-4">{comunidad.descripcion}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2 12s5.333-8 10-8 10 8 10 8-5.333 8-10 8-10-8-10-8z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-blue-500">
                  Creado por: <span className=" text-zinc-900 ml-2">{comunidad.nombre_creador}</span>
                </h3>
              </div>
              <p className="text-gray-500">
                {comunidad.miembros.length > 0
                  ? `${comunidad.miembros.length} miembros`
                  : "0 miembros"}
              </p>
            </div>
          </div>
          <Publicaciones showCreatePost={showCreatePost} toggleCreatePost={toggleCreatePost}/>
            {showCreatePost && < CreatePostForm idComunidad={comunidad._id}/>}
          <VerPublicaciones idComunidad={comunidad._id}/>
        </div>
      ))) : (
        <div className="flex justify-center items-center h-screen bg-gray-200 text-xl font-bold text-gray-700">
          <FontAwesomeIcon
            icon="sad-tear"
            className="text-4xl text-gray-500 mb-4"
          />
          <p className="text-lg text-gray-500">No hay comunidad para mostrar</p>
        </div>
      )}
    </>
  );
};


export default Community;