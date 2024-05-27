import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, ref, uploadBytes, getDownloadURL } from '../Firebase/firebase'; // Ajusta la ruta si es diferente
import { CrearPublicacion } from '../api/publicacioGeneral';

const PublicacionComponent = () => {
  const navigate= useNavigate()
  const [Publicacion, setPublicacion] = useState({
    contenido: '',
    imagen: null,

  });

  const handleChange = event => {
    const { name, value } = event.target;
    setPublicacion(prevData => ({ ...prevData, [name]: value }));
  };
  
  const handleImageChange = event => {
    const imageFile = event.target.files[0];
    setPublicacion(prevData => ({ ...prevData, imagen: imageFile }));
  };
  
  const handleCrearPublicacion = async () => {
    try {
      const datos = {
        contenido: Publicacion.contenido
      };
      if (Publicacion.imagen){
        const imageRef = ref(storage, `images/${Publicacion.imagen.name}` )
        await uploadBytes (imageRef, Publicacion.imagen)
        const imgUrl = await getDownloadURL (imageRef)
        datos.imagen=imgUrl
        console.log(imgUrl)
        console.log(datos)
      }
      const response = await CrearPublicacion(datos);
      console.log(response.data.mensaje);
      navigate ('/publicacion')
    } catch (error) {
      console.error('Error al crear la publicación', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Crear Publicación</h2>
      <div className="mb-4">
        <textarea
          placeholder="¿Qué te inspira hoy?"
          name='contenido'
          value={Publicacion.contenido}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
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
      </div>
      <button
        onClick={handleCrearPublicacion}
        className="w-full mb-2 p-2 border rounded bg-violet-50 text-violet-700 hover:bg-violet-100"
      >
        Crear Publicación
      </button>
    </div>
  );
};

export default PublicacionComponent;
