import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useComunity } from "../contexts/comunidadContexts";
import Layout from "../components/layout";
const CreateCommunityPages = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { CreateComunidad, error } = useComunity();
  const navigation = useNavigate();

  const onSubmit = async (values) => {
    const result = await CreateComunidad(values);
    console.log(result.error1)

    if (!result.error1) {
      navigation("/comunidad");
    }
  };

  return (
    <Layout>
    <form onSubmit={handleSubmit(onSubmit)} className="cont10 p-4 border rounded-lg bg-white ml-8">
      <h2 className="text-xl font-semibold mb-4 text-slate-900">Crear Comunidad</h2>
      {error && (
        <div className="mb-2">
          {error.map((err, i) => (
            <div key={i} className="text-red-500">
              {err}
            </div>
          ))}
        </div>
      )}
      <label className="block mb-2 text-slate-900">Nombre de la comunidad</label>
      <input
        type="text"
        {...register("nombre_comunidad", { required: true })}
        className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-600"
      />
      {errors.nombre_comunidad && (
        <p className="text-red-500 mt-1 ">Nombre de la comunidad es requerido</p>
      )}
      <label className="block mb-2 text-slate-900">Descripción</label>
      <textarea
        {...register("descripcion", { required: true })}
        className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-600"
      />
      {errors.descripcion && (
        <p className="text-red-500 mt-1">Descripción es requerida</p>
      )}

      <label className="block mb-2 text-slate-900 " >Categoría</label>
      <input
        type="text"
        {...register("categoria", { required: true })}
        className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-600"
      />
      {errors.categoria && (
        <p className="text-red-500 mt-1">Categoría es requerida</p>
      )}
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
      >
        Crear
      </button>
    </form>
    </Layout>
  );
};

export default CreateCommunityPages;
