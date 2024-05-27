import { Route, Routes, BrowserRouter } from "react-router-dom";
import Community from "./pages/Community";
import ComunidadPages from "./pages/ComunidadPages";
import CreateCommunityPages from "./pages/CreatecommunityPage";
import { LoginPages } from "./pages/loginPages";
import { RegisterPages } from "./pages/RegisterPages";
import ProteccionRoutes from "./ProteccionRoutes";
import CrearPerfil from "./pages/CrearPerfil";
import Perfil from "./pages/Perfil";
import Publicaciones from "./pages/Verpublicaciones";
import PublicacionComponent from "./pages/CrearPublicacion";
import ChatGlobal from "./components/ChatGlobal";
import EditarPerfilForm from "./components/FormEditarperfil";
import EditarPerfil from "./components/Editarperfil";
import Presentacion from "./pages/Inicio";
import { CrearPublicacion } from "./api/publicacioGeneral";
import { AuthProvider } from "./contexts/authContexts";
import {ComunidadProvider} from './contexts/comunidadContexts'
function App() {
  return (
  <BrowserRouter>
    <AuthProvider>
      <ComunidadProvider>
          <Routes>
            <Route path="/" element={<Presentacion/>}/>
            <Route path="/publicacion" element={<Publicaciones/>} />
            <Route path="/publicar" element={<PublicacionComponent/>} />
            <Route path="/login" element={<LoginPages />} />
            <Route path="/register" element={<RegisterPages />} />
            <Route element={<ProteccionRoutes />}>
            <Route path="/perfil" element={<Perfil />} />
              <Route path="/crear-perfil" element={<CrearPerfil />} />
              <Route path="/editar-perfil" element={<EditarPerfil />} />
              <Route path="/editar-perfilForm" element={<EditarPerfilForm />} />
              <Route path="/comunidad" element={<ComunidadPages />} />
              <Route path="/add-comunidad" element={<CreateCommunityPages/>} />
              <Route path="/comunidad-view" element={<Community/>}/>
              <Route path="/comunidad/publicacion-add" element={<CrearPublicacion/>}/>
              <Route path="/chatGlobal" element={<ChatGlobal/>}/>

            </Route>
          </Routes>
      </ComunidadProvider>
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
