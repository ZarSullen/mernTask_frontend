import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"

import { AuthProvider } from "./context/AuthProvider"
import { ProyectoProvider } from "./context/ProyectoProvider"

import Login from "./pages/Login"
import Registrar from "./pages/Registrar"
import OlvidePassword from "./pages/OlvidePassword"
import NuevoPassword from "./pages/NuevoPassword"
import ConfirmarCuenta from "./pages/ConfirmarCuenta"
import RutaProtegida from "./layouts/RutaProtegida"
import Proyectos from "./pages/Proyectos"
import NuevoProyecto from "./pages/NuevoProyecto"
import Proyecto from "./pages/Proyecto"
import EditarProyecto from "./pages/EditarProyecto"
import NuevoColaborador from "./pages/NuevoColaborador"
import HistorialCompletado from "./pages/HistorialCompletado"

function App() {

  return (
    <BrowserRouter>
        <AuthProvider>
        <ProyectoProvider>
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path="registrar" element={<Registrar />} />
                    <Route path="olvide-password" element={<OlvidePassword />} />
                    {/* Router dinámico para tratar con el password nuevo */}
                    <Route path="olvide-password/:token" element={<NuevoPassword />} />
                    <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                </Route>

                {/* Area Privada para lo usuario ya autenticados */}
                <Route path="/proyectos" element={<RutaProtegida />}>
                    <Route index element={<Proyectos/>} />
                    <Route path="crear-proyecto" element={<NuevoProyecto/>} />
                    <Route path="nuevo-colaborador/:id" element={<NuevoColaborador/>} />
                    <Route path="historial/:id" element={<HistorialCompletado/>} />
                    {/* Las rutas dinamicas es importante ponerlas al final */}
                    <Route path=":id" element={<Proyecto />} />
                    <Route path="editar/:id" element={<EditarProyecto/>} />
                </Route>
            </Routes>
        </ProyectoProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
