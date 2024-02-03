import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const SideBar = () => {

    const {auth} = useAuth()
    
    return (
        <aside className="md:w-80 lg:w-96 px-5 py-10 border-r">
            <p className="text-xl font-bold">Hola {auth?.nombre}!</p>
            
            <Link
                to="crear-proyecto"
                className="bg-sky-600 w-fll p-3 text-white uppercase font-bold rounded-lg block mt-5 text-center "
            >Nuevo Proyecto</Link>
        </aside>
    )
}

export default SideBar