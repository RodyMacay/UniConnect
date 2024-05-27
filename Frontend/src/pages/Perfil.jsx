import  { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { myperfil } from '../api/auth';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaGithub, FaDiscord } from 'react-icons/fa'

function Perfil() {
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await myperfil.get('/ver');
        const perfilData = response.data;
        setPerfil(perfilData);
      } catch (error) {
        console.error('Error al obtener el perfil', error);
      }
    };

    obtenerPerfil();
  }, []);

  const imageURL = perfil?.imagenPerfil ? perfil.imagenPerfil : null;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-slate-400">
        {perfil ? (
          <>
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-3xl font-semibold text-white">
                @{perfil.nombrePerfil} <span className="text-gray-500"></span>
              </h2>
            </div>
            {imageURL && (
              <img
                src={imageURL}
                alt="Imagen de perfil"
                className="w-32 h-32 rounded-full mt-4"
              />
            )}
            <p className="mt-4 text-white">{perfil.biografia}</p>
            <div className="mt-4">
              <p className="text-white">
                <span className="font-semibold">Ubicación:</span> {perfil.ubicacion}
              </p>
              <p className="text-white">
                <span className="font-semibold">Edad:</span> {perfil.edad}
              </p>
              {/* Agrega aquí otros campos de perfil que quieras mostrar */}
            </div>
            <div className="mt-8">
            <div className="main flex flex-col gap-0.5 items-center">
      <div className="up flex flex-row gap-0.5">
        <button className=" w-24 h-24 flex items-center justify-center outline-none border-none bg-white rounded-full shadow-md transition-transform ease-in-out hover:scale-110 hover:bg-pink-500">
          <FaInstagram className="instagram text-pink-500 text-4xl transition-colors ease-in-out hover:text-white" />
        </button>
        <button className=" w-24 h-24 flex items-center justify-center outline-none border-none bg-white rounded-full shadow-md transition-transform ease-in-out hover:scale-110 hover:bg-blue-500">
          <FaTwitter className="twitter text-blue-500 text-4xl transition-colors ease-in-out hover:text-white" />
        </button>
      </div>
      <div className=" flex flex-row gap-0.5">
        <button className=" w-24 h-24 flex items-center justify-center outline-none border-none bg-white rounded-full shadow-md transition-transform ease-in-out hover:scale-110 hover:bg-black">
          <FaGithub className="github text-gray-500 text-4xl transition-colors ease-in-out hover:text-white" />
        </button>
        <button className=" w-24 h-24 flex items-center justify-center outline-none border-none bg-white rounded-full shadow-md transition-transform ease-in-out hover:scale-110 hover:bg-purple-500">
          <FaDiscord className="discord text-purple-500 text-4xl transition-colors ease-in-out hover:text-white" />
        </button>
      </div>
    </div>
              <Link to="/editar-perfil" className="text-white hover:underline">
                Editar Perfil
              </Link>

            </div>
          </>
        ) : (
          <div className="text-center">
            <Link to="/crear-perfil" className="text-blue-300 hover:underline">
              ¡Completa tu perfil!
            </Link>
            <p className="mt-4 text-gray-900">Cargando perfil...</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Perfil;
