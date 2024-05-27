import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { ActualizarPerfil, myperfil } from '../api/auth';
/* import { Link } from 'react-router-dom'; */
import EditarPerfilForm from './FormEditarperfil';

function EditarPerfil() {
  const [perfil, setPerfil] = useState(null);

  const obtenerPerfil = async () => {
    try {
      const response = await myperfil.get('/ver');
      const perfilData = response.data;
      setPerfil(perfilData);
    } catch (error) {
      console.error('Error al obtener el perfil', error);
    }
  };

  useEffect(() => {
    obtenerPerfil();
  }, []);

  const actualizarPerfil = async (datosActualizados) => {
    try {
      await ActualizarPerfil(datosActualizados);
      obtenerPerfil();
      console.log(datosActualizados)

    } catch (error) {
      console.error('Error al actualizar el perfil', error);
    }
  };

  return (
    <Layout>
      {perfil ? (
        <div>
          <h2>Editar Perfil</h2>
          <EditarPerfilForm perfil={perfil} onUpdate={actualizarPerfil} />
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </Layout>
  );
}

export default EditarPerfil;
