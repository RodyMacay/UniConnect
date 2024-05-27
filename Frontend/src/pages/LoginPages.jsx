import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Uni from "../img/Uni01.png"
import { useAuth } from "../contexts/authContexts";

export const LoginPages = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const { login, autenticacion, error} = useAuth ()

  const onSubmit = async (data) => {
    try {
      await login(data);
      // Si el inicio de sesión tiene éxito, podrías redirigir aquí
      navigation("/publicacion");
    } catch (error) {
      // Manejar el error aquí, ya sea mostrándolo al usuario o registrándolo en la consola
      console.error("Error de inicio de sesión:", error);
    }
  };
  
  const navigation = useNavigate();

  useEffect(() => {
    if (autenticacion) navigation("/publicacion");
  }, [autenticacion, navigation]); // Agrega los valores que dependen aquí

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <main className="flex flex-col items-center px-4 py-8">
          
          <div style={{ position: 'relative' }} ><img src={Uni} alt="UniConnect" style={{ width: '300px', height: 'auto', position: 'relative', top: '2px', right: '110px' }} />
            
          </div>
       </main>
      <div className="bg-slate-900 shadow-md rounded-lg px-8 py-6  w-full max-w-md">
        <h2 className="text-white text-2xl font-medium mb-4 text-center">Iniciar sesión</h2>
        {error && (
          <div className="text-red-500 mb-2">
            {error.map((errMsg, i) => (
              <div key={i}>{errMsg}</div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          
          <input
            type="email"
            placeholder="Email"
            {...register("correo", { required: true })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-3"
          />
          {errors.correo && (
            <p className="text-red-500 mt-1">Correo electrónico es requerido</p>
          )}

          <input
            type="password"
            placeholder="Contraseña"
            {...register("contraseña", { required: true })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-3"
          />
          {errors.contraseña && (
            <p className="text-red-500 mt-1">Contraseña es requerida</p>
          )}

          <button
            type="submit"
            className="block w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-orange-400"
          >
            Iniciar sesión
          </button>
          <div id="login_reg_separator" class="flex items-center my-4">
            <span class="border-t border-gray-400 flex-grow"></span>
            <span class="px-2 bg-slate-900 text-white">O</span>
            <span class="border-t border-gray-400 flex-grow"></span>
          </div>
        </form>
        <p className="text-center">
          <Link
            to="/register"
            className="block w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-orange-400"
          >
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
};

