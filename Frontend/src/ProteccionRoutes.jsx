import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/authContexts";


const ProteccionRoutes = () => {
    const {user, autenticacion, loading} = useAuth()

    if(loading) return <h1>....Loanding</h1>
    if(!loading && !autenticacion) return <Navigate to= "/login" replace/>
    return(
        <Outlet/>
    )
}

export default ProteccionRoutes