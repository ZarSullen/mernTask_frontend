import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate()

    const infoLoginUsuario = (data) => {
        setAuth(data)
    };

    useEffect(() => {

        const autenticarUsuario = async () => {
            // Sacamos el token de localStorage
            const token = localStorage.getItem("JWT");

            // Solo si hay un token intentaremos autenticar el usuario
            if(!token) {
                setCargando(false)
                return
            };

            // Como necesitamos la autorización con el bearer token necesitamos hacer la configuración 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                const {data} = await clienteAxios("/usuarios/perfil", config);

                setAuth(data)
                navigate("/proyectos")
            } catch (error) {
                setAuth({})
            } finally {
                setCargando(false)
            }

        };

        autenticarUsuario()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                infoLoginUsuario,
                auth,
                cargando,
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export {
    AuthProvider
}