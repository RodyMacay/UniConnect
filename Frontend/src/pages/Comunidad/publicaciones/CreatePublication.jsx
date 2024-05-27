import { useForm } from "react-hook-form";
import { useComunity } from "../../../contexts/comunidadContexts";

const CreatePublication = ({idComunidad}) => {
  const { CreatePublication, publicacion, error } = useComunity();
  const { register, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = async (values) => {
    try {
        await CreatePublication(values, idComunidad)
    } catch (error) {
        console.log(error.response.data.error)
    }
    
  };
  return (
    <div className="bg-white p-4 shadow-md m-7 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Crear Publicación</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Titulo</label>
        <input
          type="text"
          {...register("titulo", { required: true })}
          className="mb-2 p-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-600"
        />
        {errors.titulo && (
          <p className="text-red-500 mt-1">
            Es requerido tener un titulo
          </p>
        )}
        <label>Contenido</label>
        <textarea {...register("contenido", {required: true})}  className="mb-2 p-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-600"/>
        {errors.contenido && (
            <p className="text-red-500 mt-1">
            Es requerido tener un titulo
          </p>
        )}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Publicar</button>
      </form>
    </div>
  );
};
export default CreatePublication;
