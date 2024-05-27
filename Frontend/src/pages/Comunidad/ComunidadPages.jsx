import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useComunity } from "../../contexts/comunidadContexts";

const ComunidadPages = () => {
  const { Comunidad, comunidades, unirseComunidad, ObtenerUnaComunidad} = useComunity();
  const navegate = useNavigate();
 

  const JoinCommunity = async(id) => {
    await unirseComunidad(id);
    navegate("/comunidad");
  };

  const viewCommunity = (id) => {
    ObtenerUnaComunidad(id)
    navegate("/comunidad-view")
  }

  useEffect(() => {
    Comunidad();
    console.log(user);
  }, []);

  

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Comunidades</h1>
  
        <button
          onClick={() => navegate("/add-comunidad")}
          className="bg-indigo-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Crear Comunidad
        </button>
      </div>
      {comunidades && comunidades.length > 0 ? (
        comunidades.map((comunidad) => (
          <div key={comunidad._id} className=" bg-slate-900 border p-4 mb-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-white">
              {comunidad.nombre_comunidad}
            </h2>
            <h3 className="text-lg font-medium mb-2 text-white">
              {comunidad.nombre_creador}
            </h3>
            <p className=" mb-2 text-white">
              {comunidad.publicaciones.length > 0
                ? `${comunidad.publicaciones.length} publicaciones`
                : "0 publicaciones"}
            </p>
            <p className="mb-2 text-white">{comunidad.descripcion}</p>
            <p className="mb-2 text-white">
              {comunidad.miembros.length > 0
                ? `${comunidad.miembros.length} miembros`
                : "0 miembros"}
            </p>
            <p className="text-blue-500">{comunidad.categoria}</p>
            {comunidad.miembros.includes(user._id) ? (
              <button
                onClick={() => viewCommunity(comunidad._id)}
                className="mt-2 bg-indigo-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none "
              >
                Ingresar a la comunidad
              </button>
            ) : (
              <button
                onClick={() => JoinCommunity(comunidad._id)}
                className="mt-2 bg-indigo-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Unirse a la comunidad
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No hay comunidades disponibles</p>
      )}
    </div>
  );
};

export default ComunidadPages;
