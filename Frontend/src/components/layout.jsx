import  { useEffect, useState } from 'react';
import Hamburguesa from './MenuHamburguesa';
import ChatGlobal from '../components/ChatGlobal';
import { TwitterFollowCard } from '../components/TwitterFollowCard';
import { ObtenerTodosPerfiles, Perfil } from '../api/auth';

const Layout = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const perfiles = async () => {
      try {
        const response = await ObtenerTodosPerfiles();
        const data = response.data;
        setUsuarios(data.map(perfil => perfil.nombrePerfil));
      } catch (error) {
        console.error("Error al obtener usuarios", error);
      }
    };

    perfiles();
  }, []);
  return (
    <div className="flexbg-blue-500 h-screen">
      <div className="flex-1 max-w-3xl mx-auto p-10 border-r border-gray-300">
        {children}
      </div>
      <div className="fixed bottom-0 right-0 m-4">
        <div className="max-h-80 overflow-y-auto">
          <div style={{ maxWidth: '250px' }}>
            <ChatGlobal />
          </div>
        </div>
      </div>
      <div className="fixed top-48 right-0 transform -translate-y-1/2 p-1 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto z-10">
        <div className="text-center mb-4">

          <h2 className="text-xl font-semibold">Usuarios a seguir en Unniconet</h2>
        </div>
        {usuarios.map((nombrePerfil, index) => (
          <TwitterFollowCard
            key={index}
            userName={nombrePerfil}
            initialisFollowing={false}
          />
        ))}
      </div>
      <div className="absolute top-4 left-4">
        <Hamburguesa />
      </div>
    </div>
  );
};

export default Layout;

