import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, ref, uploadBytes, getDownloadURL } from '../Firebase/firebase'; // Ajusta la ruta si es diferente
import { Perfil } from '../api/auth';
import Layout from '../components/layout';

const CrearPerfil = () => {
  const navigate = useNavigate();
  const [perfilData, setPerfilData] = useState({
    nombrePerfil: '',
    edad: '',
    ubicacion: '',
    biografia: '',
    imagenPerfil: null,
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setPerfilData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = event => {
    const imageFile = event.target.files[0];
    setPerfilData(prevData => ({ ...prevData, imagenPerfil: imageFile }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {

      // Sube la imagen a Firebase Storage y obtiene la URL
      const profileData = {
        nombrePerfil: perfilData.nombrePerfil,
        edad: perfilData.edad,
        ubicacion: perfilData.ubicacion,
        biografia: perfilData.biografia,
      };
      if (perfilData.imagenPerfil) {
        const imageRef = ref(storage, `images/${perfilData.imagenPerfil.name}`);
        await uploadBytes(imageRef, perfilData.imagenPerfil);

        const imageUrl = await getDownloadURL(imageRef);
        profileData.imagenPerfil = imageUrl; // Agrega la URL de la imagen en lugar de la imagen misma
        console.log(profileData)
        console.log(imageUrl)
      }

      const response = await Perfil(profileData); // Envía los datos en formato JSON
      const data = response.data;
      console.log(data.mensaje); // Mensaje de éxito

      // Realiza otras acciones después de crear el perfil, como redirigir
      navigate('/perfil');
    } catch (error) {
      console.error('Error al crear el perfil', error);
    }
  };
  return (
    <Layout>
      <div className="cont4 bg-white min-h-screen py-8 ml-6">
        <h2 className="text-lg font-medium mb-4">Crear Nuevo Perfil</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombrePerfil"
            placeholder="Nombre del Perfil"
            value={perfilData.nombrePerfil}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={perfilData.edad}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="ubicacion"
            placeholder="Ubicación"
            value={perfilData.ubicacion}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            name="biografia"
            placeholder="Biografía"
            value={perfilData.biografia}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded text-black"
          />
          <input
            type="file"
            accept="image/*"
            name="imagenPerfil"
            onChange={handleImageChange}
            className="w-full mb-2 p-2 border rounded
              file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
           file:bg-violet-50 file:text-violet-700
           hover:file:bg-violet-100"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Crear Perfil
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CrearPerfil;
