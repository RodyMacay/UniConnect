import { useContext, createContext, useState, useEffect } from "react";
import { AuthLogin, AuthRegister, verifyToken } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    return console.log("El useAuth no puede estar afuera del AuthProvider");

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState([]);
  const [autenticacion, setAutenticacion] = useState(false);
  const [loading, setLoading] = useState(true)

  const register = async (values) => {
    try {
      const res = await AuthRegister(values);
      console.log(res);
      setUser(res.data);
      setAutenticacion(true);
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  const login = async (values) => {
    try {
      const res = await AuthLogin(values);
      setUser(res.data);
      console.log(res.data)
      setAutenticacion(true);
    } catch (error) {
      console.log(error.response.data.error)
      setError(error.response.data.error);
    }
  };

  const checkLogin = async () => {
    const cookies = Cookies.get();

    if (!cookies.token) {
      setAutenticacion(false);
      setLoading(false)
      return setUser(null);
    }

    try {
      const res = await verifyToken(cookies.token);
      console.log(res.data)
      if(!res.data) {
        setAutenticacion(false)
        setLoading(false)
        return
      }
      setAutenticacion(true)
      setUser(res.data.id)
      setLoading(false)
    } catch (error) {
      console.log(error.response.data.error)
      setAutenticacion(false);
      setUser(null);
      setLoading(false)
    }
  };

  const logaut = async() => {
    Cookies.remove('token')
    setAutenticacion(false)
    setUser(null)
  }

  useEffect(() => {
    if (error.length > 0) {
      const time = setTimeout(() => {
        setError([]);
      }, 3000);
      return () => clearTimeout(time);
    }
  }, [error]);

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider value={{ register, error, autenticacion, login, user, loading , logaut}}>
      {children}
    </AuthContext.Provider>
  );
};