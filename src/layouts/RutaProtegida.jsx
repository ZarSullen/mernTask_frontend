import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import SideBar from "../components/SideBar"

const RutaProtegida = () => {
    //* Lógica para evitar que el usuario no visite componentes si no ha iniciado sesión y layout de las rutas protegidas


    const {auth, cargando} = useAuth()

    // cargando lo usamos por el doble render de React, entonces cuando entramos a /proyectos aun si ya estamos autenticados al principio auth seria un objeto vacío entonces caería en el : <Navigate to"/" />
    if(cargando) return "Cargando..."
    
    return (
        <>
        {/* Si no esta autenticado lo llevamos de nuevo a login y si esta autenticado le permitimos entrar a todas las paginas de esa ruta protegida*/}
            {auth._id ? (
                <>
                    <div className="bg-gray-100">
                        <Header/>

                        <div className="md:flex md:min-h-screen">
                            <SideBar/>

                            <main className="p-10 flex-1">
                                <Outlet/>
                            </main>
                        </div>
                    </div>
                </>
            ) : <Navigate to="/"/>}
        </>
    )
}

export default RutaProtegida