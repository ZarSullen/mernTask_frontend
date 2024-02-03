import axios from "axios";


// De esta forma tenemos una url de base para los llamados para no escribirlo siempre
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`
})

export default clienteAxios