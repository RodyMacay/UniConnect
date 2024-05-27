
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Uni from "../img/Uni01.png"
import { useAuth } from "../contexts/authContexts";
export const RegisterPages = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { register: Registro, error, autenticacion } = useAuth();
  const onSubmit = (values) => {
    Registro(values);
  };

  const navegate = useNavigate();

  useEffect(() => {
    if (autenticacion) navegate("/comunidad");
  }, [autenticacion]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <main className="flex flex-col items-center px-4 py-8">
          
          <div style={{ position: 'relative' }} ><img src={Uni} alt="UniConnect" style={{ width: '300px', height: 'auto', position: 'relative', top: '2px', right: '110px' }} />
             
           </div>
      </main>
      <div className="bg-slate-900 shadow-md rounded-lg px-8 py-6 w-full max-w-md">
        <h2 className="text-white text-3xl font-medium mb-4 text-center">Registrarse</h2>
        {error && (
          <div className="text-red-500 mb-2">
            {error.map((errMsg, i) => (
              <div key={i}>{errMsg}</div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <input
            type="text"
            placeholder="Usuario"
            {...register("nombre", { required: true })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-3"
          />
          {errors.nombre && (
            <p className="text-red-500 mt-1">Nombre es requerido</p>
          )}

      
          <input
            type="email"
            placeholder="Email"
            {...register("correo", { required: true })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-3"
          />
          {errors.correo && (
            <p className="text-red-500 mt-1">Email es requerido</p>
          )}

        
          <div className="relative">
            <input
            placeholder="Contraseña"
              type={showPassword ? "text" : "password"}
              {...register("contraseña", { required: true })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-3"
            />
            <button
              type="button"
              className="absolute top-2 right-2 focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </div>
          {errors.contraseña && (
            <p className="text-red-500 mt-1">Password es requerido</p>
          )}

          <button
            type="submit"
            className="block w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-orange-400"
          >
            Registrarse
          </button>
        </form>
        <div id="login_reg_separator" class="flex items-center my-4">
          <span class="border-t border-gray-400 flex-grow"></span>
          <span class="px-2 bg-slate-900 text-white">O</span>
          <span class="border-t border-gray-400 flex-grow"></span>
        </div>
        <p className="text-center">
          <Link
            to="/login"
            className="block w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-orange-400"
          >
            iniciar Sesion
          </Link>
        </p>
      </div>
    </div>
  );
};
