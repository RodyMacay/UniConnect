import  { useEffect, useState } from 'react';
import { ObtenerPublicaciones, Comentario } from '../api/publicacioGeneral';
import Layout from '../components/layout';
import { Link } from 'react-router-dom';
import { myperfil } from '../api/auth';

const VerPublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [comentarModalVisible, setComentarModalVisible] = useState(false);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [perfil, setperfil] = useState(null)
  
  
  useEffect(() => {
    const obtenerPublicaciones = async () => {
      try {
        const response = await ObtenerPublicaciones();
        const dataPublicacion = response.data;
        setPublicaciones(dataPublicacion);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      }
    };
    const ObtenerPerfil = async () => {
      try {
        const res = await myperfil.get('/ver')
        console.log(res.data)
        const perfilData= res.data
        setperfil(perfilData)
      }catch (error) {
        console.error('Error al obtener el perfil')
      }
    }
    obtenerPublicaciones();
    ObtenerPerfil ()
  }, []);

  const imageURL = perfil?.imagenPerfil ? perfil.imagenPerfil : null;

  const handleComentarClick = (publicacion) => {
    setPublicacionSeleccionada(publicacion);
    setComentarModalVisible(true);
  };

  const handleCloseModal = () => {
    setComentarModalVisible(false);
    setPublicacionSeleccionada(null);
    setNuevoComentario('');
  };

  const handleAgregarComentario = async () => {
    try {
      if (publicacionSeleccionada && nuevoComentario.trim() !== '') {
        const datos = {
          publicacionId: publicacionSeleccionada._id,
          contenido: nuevoComentario
        };

        const response = await Comentario(datos);

        setPublicaciones(prevPublicaciones => 
          prevPublicaciones.map(pub => 
            pub._id === publicacionSeleccionada._id
              ? { ...pub, comentarios: [...pub.comentarios, response.data.comentario] }
              : pub
          )
        );
        console.log(response)

        handleCloseModal();
      }
    } catch (error) {
      console.error('Error al agregar el comentario:', error);
    }
  };
  return (
    <Layout>
      <div  className="cont min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-semibold ml-3 mb-4">Inicio</h2>
          <div className="mb-4 ml-3">
          <div className="flex items-center space-x-4 mb-4 ml-3">
        {imageURL && (
          <img
            src={imageURL}
            alt="Imagen de perfil"
            className="w-12 h-12 rounded-full mt-2"
          />
        )}
        <Link to="/publicar">
          <input
            className="bg-gray-100 border border-gray-300 rounded py-2 px-4 w-50 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="¿Qué te inspira hoy?"
          />
        </Link>
      </div>
          </div>
          <ul className="space-y-6">
            {publicaciones.map((publicacion) => (
              <li
                key={publicacion._id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                 <span className="text-gray-600">Subido por: {publicacion.nombreAutor}</span>
                <h3 className="text-xl font-semibold mb-2">{publicacion.titulo}</h3>
                <p className="text-gray-700">{publicacion.contenido}</p>
                {publicacion.imagen && (
                  <img
                    src={publicacion.imagen}
                    alt={`Imagen de ${publicacion.titulo}`}
                    className="mt-4 rounded-lg"
                  />
                )}
                <div className="mt-4">
                  <button
                    onClick={() => handleComentarClick(publicacion)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    Comentar
                  </button>
                </div>
                {publicacion.comentarios.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-semibold mb-1">Comentarios:</h4>
                    <ul className="list-disc pl-6">
                      {publicacion.comentarios.map((comentario) => (
                        
                        <li key={comentario._id} className="text-gray-600">
                          <strong>{comentario.nombreAutor}:</strong> {comentario.contenido}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
  
      {/* Modal para agregar comentario */}
      {comentarModalVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-4">Agregar Comentario</h2>
            <div className="mb-4">
              <textarea
                placeholder="Escribe tu comentario..."
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              onClick={handleAgregarComentario}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Agregar Comentario
            </button>
            <button
              onClick={handleCloseModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded ml-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
  
  
};

export default VerPublicaciones;
