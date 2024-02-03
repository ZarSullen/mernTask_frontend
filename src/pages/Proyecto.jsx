import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyecto'
import ModalFormTarea from '../components/ModalFormTare'
import Tarea from '../components/Tarea'
import ModalBorrarTarea from '../components/ModalBorrarTarea'
import Colaborador from '../components/Colaborador'
import ModalBorrarColaborador from '../components/ModalBorrarColaborador'
import useAdmin from "../hooks/useAdmin"
import io from "socket.io-client"

let socket;

const Proyecto = () => {

    const {obtenerProyecto, proyecto, setEditar, handleDestroyProyecto, openModal, submitTareasProyecto, destroyTareasProyecto, editarTareasProyecto, completarTareasPoryecto} = useProyectos();

    const {id} = useParams();

    const navigate = useNavigate();

    const {cliente, fechaEntrega, nombre, _id, descripcion, colaboradores, tareas} = proyecto;


    useEffect(() => {
        obtenerProyecto(id);
    }, []);

    useEffect(() => {
        socket = io("http://localhost:4000");
        socket.emit("abrir proyecto", id)
    }, []);

    useEffect(() => {
        socket.on("tarea agregada", (tareaNueva) => {
            // Validacion pq cuando inicia el effect no hay nada en el objeto de proyecto entonces por eso tira error
            if(tareaNueva.proyecto === proyecto._id) {
                submitTareasProyecto(tareaNueva)
            };
        })
        socket.on("eliminar tarea", tarea => {
            if(tarea.proyecto === proyecto._id) {
                destroyTareasProyecto(tarea._id)
            }
        })
        socket.on("tarea editada", tareaEditar => {
            if(tareaEditar.proyecto._id === proyecto._id) {
                editarTareasProyecto(tareaEditar)
            }
        })
        socket.on("tarea completada", tarea => {
            if(tarea.proyecto._id === proyecto._id) {
                completarTareasPoryecto(tarea)
            }
        })
    })


    
    return  (
            
        <>
            <div className='md:flex justify-between'>
                <h1 className='font-black text-4xl'>{nombre}</h1>
                
                {useAdmin() ? (
                    <div className='flex gap-10 items-center justify-center mt-5 md:mt-0'>
                        <Link
                            to={`/proyectos/editar/${id}`}
                            className='text-gray-500 hover:text-black transition-colors'
                            onClick={() => setEditar(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            
                            <span className='font-semibold text-sm uppercase'>Editar</span>
                        </Link>

                        <button
                            onClick={() => {
                                handleDestroyProyecto(_id)
                                navigate("/proyectos")
                            }} 
                            className='text-gray-500 hover:text-black transition-colors'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                            <span className='font-semibold text-sm uppercase'>Eliminar</span>
                        </button>
                    </div>
                ) : null }
                

            </div>
            
            {useAdmin() ? (
                <button
                    onClick={openModal}
                    type='button'
                    className='mt-5 py-3 px-5 bg-sky-600 text-white uppercase font-bold text-sm rounded-md hover:bg-sky-500 transition-colors w-full md:w-auto'
                >Agregar Tarea</button>
            ) : null}

            <h2 className='mt-10 text-3xl font-bold'>{tareas?.length ? "Tareas" : "No hay Tareas"}</h2>
          

            <div className='bg-white shadow mt-10 rounded-lg'>
                {tareas?.length ? (
                    tareas?.map(tarea => (
                        <Tarea key={tarea._id} tarea={tarea}/>
                    ))
                ) : (<p className='py-10 text-center font-semibold'>No hay tareas</p>) }
            </div>

            <div className='flex items-center justify-between mt-10'>
                <h2 className=' text-3xl font-bold'>Colaboradores</h2>
                
                {useAdmin() ? (
                    <button 
                        className='flex flex-col items-center justify-center text-gray-500 hover:text-black transition-colors uppercase text-sm '
                        onClick={() => navigate(`/proyectos/nuevo-colaborador/${proyecto._id}`)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span>Añadir</span>
                    </button>
                ) : null }

            </div>

            <div className='bg-white shadow mt-10 rounded-lg w-full '>
                {proyecto.colaboradores?.length ? (
                    proyecto.colaboradores?.map(colaborador => <Colaborador key={colaborador._id} colaborador={colaborador}/>)
                ) : ( <p className='py-10 text-center font-semibold'>No hay Colaboradores</p>)}
            </div>

            <ModalFormTarea />
            <ModalBorrarTarea />
            <ModalBorrarColaborador />
        </>
    )
}

export default Proyecto