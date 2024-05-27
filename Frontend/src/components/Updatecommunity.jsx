import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useComunity } from "../contexts/comunidadContexts";

const UpdateComunidad = ({ idComunidad }) => {
  const { ActualizarComunidad } = useComunity();
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true);
    try {
        console.log(data)
      await ActualizarComunidad(data, idComunidad);
      setLoading(false);
      // Puedes agregar aquí algún mensaje de éxito o redireccionar si es necesario
    } catch (error) {
      console.error("Error al actualizar la comunidad:", error);
      setLoading(false);
      navigate("/comunidad")
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Actualizar Comunidad</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="nombre_comunidad" className="block text-sm font-medium">
            Nombre de la comunidad
          </label>
          <input
            type="text"
            id="nombre_comunidad"
            {...register("nombre_comunidad", { required: true })}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600"
          />
          {errors.nombre_comunidad && (
            <p className="text-red-500 text-sm mt-1">Nombre de la comunidad es requerido</p>
          )}
        </div>
        
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium">
            Descripción
          </label>
          <textarea
            id="descripcion"
            {...register("descripcion", { required: true })}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600"
          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm mt-1">Descripción es requerida</p>
          )}
        </div>
        
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium">
            Categoría
          </label>
          <input
            type="text"
            id="categoria"
            {...register("categoria", { required: true })}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600"
          />
          {errors.categoria && (
            <p className="text-red-500 text-sm mt-1">Categoría es requerida</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          disabled={loading}
        >
          {loading ? "Actualizando..." : "Actualizar Comunidad"}
        </button>
      </form>
    </div>
  );
};

export default UpdateComunidad;