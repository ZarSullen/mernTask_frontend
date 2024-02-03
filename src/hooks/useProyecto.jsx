import ProyectoContext from "../context/ProyectoProvider"
import { useContext } from "react"

const useProyectos = () => {
  return useContext(ProyectoContext)
}

export default useProyectos