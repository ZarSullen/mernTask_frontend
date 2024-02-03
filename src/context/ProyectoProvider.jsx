import React, { useEffect } from 'react'
import { createContext, useState } from 'react'
import clienteAxios from "../config/clienteAxios"
import {useLocation, useNavigate} from "react-router-dom"
import useAuth from '../hooks/useAuth'
import io from "socket.io-client"

let socket;

const ProyectoContext = createContext()

const ProyectoProvider = ({children}) => {
    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [alerta, setAlerta] = useState({});
    const [editar, setEditar] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [editarTarea, setEditarTarea] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [borrarColaboradorIsOpen, setBorrarColaboradorIsOpen] = useState(false);
    const [tareaEditar, setTareaEditar] = useState({});
    const [tareaBorrar, setTareaBorrar] = useState({});
    const [busquedaColaborador, setBusquedaColaborador] = useState({});
    const [colaborador, setColaborador] = useState({});
    const [buscador, setBuscador] = useState(false)

    const navigate = useNavigate();
    const {pathname} = useLocation();

    const {auth, setAuth} = useAuth();

    useEffect(() => {
        // Funcion para obtener proyectos
        if(proyectos.length === 0) {
            const obtenerProyectos = async () => {
                try {
                    const token = localStorage.getItem("JWT");
    
                    if(!token) return 
    
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    };
    
                    const {data} = await clienteAxios("/proyectos", config);
                    setProyectos(data)
                } catch (error) {
                    console.log(error)
                }
            };
            obtenerProyectos()
        };
    }, [auth]);

    useEffect(() => {
        setAlerta({})
    }, [pathname])

    useEffect(() => {
        // Abrimos la conexión con socket io
        socket = io("http://localhost:4000");
    }, [])

    const submitProyecto = async proyecto => {
        try {
            // Tenemos que hacer esto siempre que hagamos algun llamado ya que es la autenticación que se requiere 
            const token = localStorage.getItem("JWT");

            if(!token) return console.log("NO!")

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            // Modo editar para los cursos ya creados //* Para actualizar el proyecto
            if(editar) {
                const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config);

                //! const actualizarStateProyecto = proyectos.filter( proyectoState => proyectoState._id !== proyecto.id)

                // si el proyecto que esta dentro del state es igual al que sale de data retornar el data sino, retornar el state

                const actualizarStateProyecto = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState);

                setProyectos(actualizarStateProyecto)

                setAlerta({
                    msg: "Proyecto Actualizado Correctamente",
                    error: false
                });

                setEditar(false)
            } else {
                const { data } = await clienteAxios.post("/proyectos", proyecto, config);
    
                setProyectos([...proyectos, data])
    
                setAlerta({
                    msg: "Proyecto Creado Correctamente",
                    error: false
                });
            };

            setTimeout(() => {
                // Eliminamos la alarma
                setAlerta({})

                // redireccionamos a /proyectos despues de 2 segundos
                navigate("/proyectos")
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    };

    const obtenerProyecto = async id => {
        try {
            // Tenemos que hacer esto siempre que hagamos algun llamado ya que es la autenticación que se requiere 
            const token = localStorage.getItem("JWT");

            if(!token) return console.log("NO!")

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const {data} = await clienteAxios(`/proyectos/${id}`, config);
            setProyecto(data)
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

            navigate("/proyectos")

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }
    };

    const handleDestroyProyecto = async id => {
        if(confirm("¿Deseas eliminar este proyecto?")) {
            try {
                const token = localStorage.getItem("JWT");
    
                if(!token) return console.log("NO!")
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };
    
                const {data} = await clienteAxios.delete(`/proyectos/${id}`, config);
    
                // Sacar del State el proyecto
                const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id);
    
                setProyectos(proyectosActualizados);

                setAlerta({
                    msg: data.msg,
                    error: true
                })
                
                setTimeout(() => {
                    setAlerta({})
                }, 2000);
            } catch (error) {
                console.log(error)
            }
        }
    };
    
    const submitTarea = async (datos) => {
        try {
            const token = localStorage.getItem("JWT");

            if(!token) return console.log("NO!")

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            // Si hay una tarea a editar en el State que se haga un PUT
            if(editarTarea) {
                const {data} = await clienteAxios.put(`/tareas/${datos.id}`,datos , config);

                socket.emit("editar tarea", data)
                
                
                
                setIsOpen(false);
                setEditarTarea(false);
                setAlerta({});
                setTareaEditar({})
                
            } else { 
                const {data} = await clienteAxios.post("/tareas", datos, config);
    
                
                // Agregar la tarea al State //*No rompe con las reglas de inmutabilidad, no estamos modificando el state directamente, sino, usando una variable para copiar los datos del proyeccto actual, y luego actualizar las tareas para despues ahora si pasarlo al State
                
                //? Socket.io maneja el sincronizado del state de las tareas, ver hasta al final del provider 

                setIsOpen(false)
                setAlerta({})

                
                //* SOCKET.IO
                // creamos nuestro primer evento usando emit
                socket.emit("crear tarea", data)
            }

        } catch (error) {
            console.log(error)
        }
    }
    
    
    const handleBorrarTarea = async tarea => {
        try {
            const token = localStorage.getItem("JWT");
            
            if(!token) return console.log("NO!");
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            
            const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`, config);
            // Hacemos una copia de el proyecto 
            setAlerta({
                msg: data.msg,
                error: false
            });

            setTimeout(() => {
                setAlerta({})
            }, 3000);

            // TODO

            socket.emit("borrar tarea", tarea)
            
            setDeleteIsOpen(false);
            setTareaBorrar({})
        } catch (error) {
            console.log(error)
        }
    };

    const submitColaborador = async email => {
        setCargando(true)
        try {
            const token = localStorage.getItem("JWT");
            
            if(!token) return console.log("NO!")
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const {data} = await clienteAxios.post('/proyectos/colaboradores', {email}, config)

            setBusquedaColaborador(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });

            setTimeout(() => {
                setAlerta({})
            }, 3000);
            setBusquedaColaborador({})
        } finally {
            setCargando(false)
        }
    };

    const agregarColaborador = async colab => {
        try {
            const token = localStorage.getItem("JWT");
            
            if(!token) return console.log("NO!")
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, {email: colab.email}, config)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setBusquedaColaborador({})
            setTimeout(() => {
                
                setAlerta({})
            }, 3000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    };

    const handleBorrarColaborador = async id => {
        try {
            const token = localStorage.getItem("JWT");
            
            if(!token) return console.log("NO!")
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            
            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, id, config);
            
            const proyectoActualizado = {...proyecto};

            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colabState => colabState._id !== id.id)

            setProyecto(proyectoActualizado);

            setAlerta({
                msg: data.msg,
                error: false
            });

            setColaborador({})

            setTimeout(() => {
                setAlerta({})
            }, 3000);
            
            setBorrarColaboradorIsOpen(false)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    };

    const completarTarea = async id => {
        try {
            const token = localStorage.getItem("JWT");
            
            if(!token) return console.log("NO!")
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            
            const {data} = await clienteAxios.post(`/tareas/estado/${id}`, {}, config);

            socket.emit("completar tarea", data)
        } catch (error) {   
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    };

    const obtenerNombreHistorial = async (id) => {
        try {
            const token = localStorage.getItem("JWT");
            
            if(!token) return console.log("NO!")
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const {data} = await clienteAxios(`/tareas/obtenerUsuario/${id}`, config);

            return data.nombre
        } catch (error) {
            console.log(error)
        }
    }
    
    const cerrarSesion = () => {
        localStorage.removeItem("JWT");
        
        setAuth({})
        setProyectos([])
        setProyecto({})
        setAlerta({})
    };
    
    function closeModal() {
        setIsOpen(false)
        setEditarTarea(false)
    
    }
    const editarTareaModal = tarea => {
        // en vez de pasar solo el id pase toda la tarea y solo la puse en el State
        setTareaEditar(tarea);
        // Se setea a true para que se pasen los valores automaticamente con el Effect
        setEditarTarea(true);
        // Abrimos el modal
        setIsOpen(true)
    };

    function openModal() {
        setIsOpen(true)
    };

    function HandleModalBorrarTarea(tarea) {
        setDeleteIsOpen(!deleteIsOpen)
        setTareaBorrar(tarea)
    };

    function HandleModalBorrarColaborador(colaborador) {
        setBorrarColaboradorIsOpen(!borrarColaboradorIsOpen)
        setColaborador(colaborador);
    };

    const handleBuscador = () => {
        setBuscador(!buscador)
    };

    // * SOCKET.IO
    const submitTareasProyecto = (tareaNueva) => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tareaNueva]
        setProyecto(proyectoActualizado)
    };

    const destroyTareasProyecto = id => {
        const proyectoActualizado = {...proyecto};
        const tareaEliminada = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== id)
        proyectoActualizado.tareas = tareaEliminada;
        setProyecto(proyectoActualizado);
    };

    const editarTareasProyecto = tareaEditar => {
        // Modificamos las tareas para que esten actualiazdas con la nueva información
        const tareaActualizada = proyecto.tareas?.map(tarea => tarea._id === tareaEditar._id ? tareaEditar : tarea);
        // Hacemos una copia de el proyecto 
        const proyectoActualizado = {...proyecto};
        // Modificamos las tareas con las actualizadas de el proyecto
        proyectoActualizado.tareas = tareaActualizada;
        // Sincronizamos el State porque es el proyecto actual que esta abierto, entonces lo sincronizamos
        setProyecto(proyectoActualizado);
    };

    const completarTareasPoryecto = tareaCompletar => {
        const proyectoActualizado = {...proyecto}
        const tareasActualizadas = proyectoActualizado.tareas.map(tarea => tarea._id === tareaCompletar._id ? tareaCompletar : tarea);
        proyectoActualizado.tareas = tareasActualizadas;
        setProyecto(proyectoActualizado);
    }

    return (
        <ProyectoContext.Provider 
            value={{
                proyectos,
                submitProyecto,
                setAlerta,
                alerta,
                obtenerProyecto,
                proyecto,
                setProyecto,
                setEditar,
                handleDestroyProyecto,
                cerrarSesion,
                closeModal,
                openModal,
                isOpen,
                submitTarea,
                setEditarTarea,
                editarTarea,
                editarTareaModal,
                tareaEditar,
                HandleModalBorrarTarea,
                deleteIsOpen,
                setTareaBorrar,
                tareaBorrar,
                handleBorrarTarea,
                submitColaborador,
                busquedaColaborador,
                cargando,
                agregarColaborador,
                borrarColaboradorIsOpen,
                HandleModalBorrarColaborador,
                colaborador,
                handleBorrarColaborador,
                completarTarea,
                buscador,
                handleBuscador,
                submitTareasProyecto,
                destroyTareasProyecto,
                editarTareasProyecto,
                completarTareasPoryecto,
                obtenerNombreHistorial
            }}
        >{children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoContext

export {
    ProyectoProvider
}