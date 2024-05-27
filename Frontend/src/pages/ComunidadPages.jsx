import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UpdateComunidad from "../components/Updatecommunity";

import { useComunity } from "../contexts/comunidadContexts";
import { useAuth } from "../contexts/authContexts";
import Layout from "../components/layout";

const ComunidadPages = () => {
  const { Comunidad, comunidades, unirseComunidad, ObtenerUnaComunidad, EliminarComunidad } =
    useComunity();
  const navegate = useNavigate();
  const { user, logaut } = useAuth();

  const JoinCommunity = async (id) => {
    await unirseComunidad(id);
    navegate("/comunidad");
  };

  const viewCommunity = (id) => {
    ObtenerUnaComunidad(id);
    navegate("/comunidad-view");
  };

  const DeleteCommunity = async (id) => {
    await EliminarComunidad(id);
    navegate("/comunidad"); // Redirige a /comunidad después de eliminar
    window.location.reload();
  }

  useEffect(() => {
    Comunidad();
    console.log(user.usuario.esAdmin);
  }, []);

  return (
    <Layout>

    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Comunidades</h1>
        {/* <button
          onClick={() => {
            logaut();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Salir
        </button> */}
        <button
          onClick={() => navegate("/add-comunidad")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Crear Comunidad
        </button>
      </div>
      {comunidades && comunidades.length > 0 ? (
        comunidades.map((comunidad) => (
          <div key={comunidad._id} className="border p-4 mb-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              {comunidad.nombre_comunidad}
            </h2>
            <h3 className="text-lg font-medium mb-2">
              {comunidad.nombre_creador}
            </h3>
            <p className="text-gray-600 mb-2">
              {comunidad.publicaciones.length > 0
                ? `${comunidad.publicaciones.length} publicaciones`
                : "0 publicaciones"}
            </p>
            <p className="mb-2">{comunidad.descripcion}</p>
            <p className="mb-2">
              {comunidad.miembros.length > 0
                ? `${comunidad.miembros.length} miembros`
                : "0 miembros"}
            </p>
            <p className="text-blue-500">{comunidad.categoria}</p>
            {comunidad.miembros.includes(user._id) ? (
              <button
                onClick={() => viewCommunity(comunidad._id)}
                className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Ingresar a la comunidad
              </button>
            ) : (
              <button
                onClick={() => JoinCommunity(comunidad._id)}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Unirse a la comunidad
              </button>
            )}
            {user.usuario.esAdmin && comunidad.nombre_creador === user.usuario.nombre && (
              <Link to="/comunidad">
              <button onClick={() => {DeleteCommunity(comunidad._id)}}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Eliminar comunidad
              </button>
              </Link>
            )}
            {user.usuario.esAdmin && comunidad.nombre_creador === user.usuario.nombre && (
              <UpdateComunidad idComunidad={comunidad._id}/>
            )}
          </div>
        ))
      ) : (
        <p>No hay comunidades disponibles</p>
      )}
    </div>
    </Layout>
  );
};

export default ComunidadPages;