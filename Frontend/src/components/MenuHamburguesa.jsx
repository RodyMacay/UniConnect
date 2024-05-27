import  { useState } from 'react';
import { Link } from 'react-router-dom';

import { BiHomeAlt2 } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineMessage } from 'react-icons/ai';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';
import Uni from "../img/Uni01.png"
import { useAuth } from '../contexts/authContexts';

const Hamburguesa = () => {
  const [open, setOpen] = useState(false);
  const { user, logaut } = useAuth();


  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="py-10"></div>
    
  
      <div className='py-2' style={{ position: 'relative' }} ><Link to='/publicacion'><img className="rounded-full hover:bg-orange-400/50 "src={Uni} alt="UniConnect" style={{ width: '45px', height: 'auto', position: 'relative', top: '2px', left: '78px'}}></img> </Link> </div>
        
      
        <div className='rounded-full font-bold text-slate-900 text-xl hover:bg-orange-400 cursor-pointer py-4 ml-20 flex items-center'>
            <BiHomeAlt2 className='ml-2'/>
          <Link to="/publicacion" onClick={toggleMenu} className="ml-4">
             Inicio
          </Link>
        </div>

        <div className='rounded-full font-bold text-slate-900 text-xl hover:bg-orange-400 cursor-pointer py-4 ml-20 flex items-right'>
         <IoMdNotificationsOutline className='ml-2 text-2xl'/>
          <Link to="/principal" onClick={toggleMenu} className='ml-4'>
            Notificaciones
          </Link>
        </div>

        <div className='rounded-full font-bold text-slate-900 text-xl hover:bg-orange-400 cursor-pointer py-4 ml-20 flex items-center'>
          <AiOutlineMessage className='ml-2'/>
          <Link to="/registro" onClick={toggleMenu} className="ml-4">
            Mensajes
          </Link>
        </div>

        <div className='rounded-full font-bold text-slate-900 text-xl hover:bg-orange-400 py-4 ml-20 cursor-pointer flex items-center'>
        <HiOutlineUserGroup className='ml-2 '/>
          <Link to="/comunidad" onClick={toggleMenu} className='ml-4'>
            Comunidad
          </Link>
        </div>

        <div className='rounded-full font-bold text-slate-900 text-xl hover:bg-orange-400 cursor-pointer py-4 ml-20 flex items-center'>
          <CgProfile className='ml-2'/>
          <Link to="/perfil" onClick={toggleMenu} className='ml-4'>
            Perfil
          </Link>
        </div>
        {user && (
      <div className='rounded-full font-bold text-slate-900 text-xl hover:bg-orange-400 cursor-pointer py-4 ml-20 flex items-center'>
        <BiLogOut className="ml-2"/>
        <Link to="/login" onClick={logaut} className="ml-2">
          Logout
        </Link>
      </div>
)}
        
      <button class="boton" className="rounded-full bg-slate-900 hover:bg-orange-400 text-white px-12 py-3 text-lg ml-20 flex items-center mt-3"><Link to="/publicar">Publicar</Link></button>
        </div>
  );
  

};
   

export default Hamburguesa;
