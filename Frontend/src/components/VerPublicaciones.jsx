import { useEffect, useState } from "react";
import { useComunity } from "../contexts/comunidadContexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";

const VerPublicaciones = ({ idComunidad }) => {
  const { obtenerPublicaciones, publicacion } = useComunity();
  const [publicacionesEnComunidad, setPublicacionesEnComunidad] = useState([]);

  useEffect(() => {
    obtenerPublicaciones(idComunidad);
  }, [idComunidad]);

  useEffect(() => {
    setPublicacionesEnComunidad(publicacion);
  }, [publicacion]);

  return (
    <div className="m-7 ">
      {publicacionesEnComunidad.length > 0 ? (
        publicacionesEnComunidad.map((publication) => (
          <div key={publication._id} className="border p-4 mb-4 rounded-lg ">
            <h3 className="text-lg font-semibold">{publication.titulo}</h3>
            <p className="text-gray-600 mb-2">{publication.contenido}</p>
            <div className="flex items-center justify-between ">
              <div className="flex items-center space-x-2 ">
                <p className="text-gray-500">
                  Autor:{" "}
                  {publication.autor ? publication.autor.nombre : "Anónimo"}
                </p>
                <p className="text-gray-500">
                  Archivada: {publication.archivada ? "Sí" : "No"}
                </p>
                <button className="flex items-center space-x-1 text-blue-500">
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-1 text-blue-500">
                  <FontAwesomeIcon icon={faComment} />
                  <span>Comentario</span>
                </button>
              </div>
              <p className="text-gray-500 ">{publication.meGusta.length} Likes</p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay publicaciones disponibles</p>
      )}
    </div>
  );
};

export default VerPublicaciones;
