import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditarPerfilForm({ perfil, onUpdate }) {
  const navigate = useNavigate();
  const [nombrePerfil, setNombrePerfil] = useState(perfil.nombrePerfil);
  const [edad, setEdad] = useState(perfil.edad);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate({ nombrePerfil, edad });
    navigate('/perfil');
  };

  return (
    <form className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white" onSubmit={handleSubmit}>
      <label className="mb-4">
        Nombre de Perfil:
        <input
          className="bg-slate-800 text-white border border-gray-400 rounded-md py-2 px-3 mt-1 w-64 focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          value={nombrePerfil}
          onChange={(e) => setNombrePerfil(e.target.value)}
        />
      </label>
      <label className="mb-4">
        Edad:
        <input
          className="bg-slate-800 text-white border border-gray-400 rounded-md py-2 px-3 mt-1 w-20 focus:outline-none focus:ring focus:border-blue-300"
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
      </label>
      {/* Agrega aquí otros campos de edición */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        type="submit"
      >
        Guardar Cambios
      </button>
    </form>
  );
}

export default EditarPerfilForm;
