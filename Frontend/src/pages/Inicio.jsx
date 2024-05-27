import { Link } from 'react-router-dom'
import Uni from '../img/Uni01.png'
import { BsCompass } from 'react-icons/bs';
export default function Presentacion() {
return (
    <main className="flex flex-col items-center px-4 py-8">

    <h1 className="py-8 font-serif text-4xl font-bold text-slate-950">
        Bienvenido a UniConnect
    </h1>
    <div>
  <img src={Uni} alt="UniConnect" style={{ width: '300px', height: 'auto' }} />


    {/* <h1 className="text-3xl text-center bg-gradient-to-r from-yellow-400 via-green-500 to-blue-200 text-transparent bg-clip-text font-serif">UNICONNECT</h1> */}
    </div>

    <p className="font-serif mt-4 text-2xl text-slate-900">
        La plataforma para conectarse y colaborar en tu universidad
    </p>
   
    <button className="button m-5">
   <BsCompass className='text-3xl'/>
   <Link className='text-slate-900' to="/login" > Explorar</Link>
   
</button>

    
    

    </main>
)

}
