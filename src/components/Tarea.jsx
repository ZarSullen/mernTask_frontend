import React from 'react'
import { formatearFecha } from '../helpers/formatearFecha'
import useProyectos from '../hooks/useProyecto'
import useAdmin from '../hooks/useAdmin'
import { Link } from 'react-router-dom'

const Tarea = ({tarea}) => {

    const {editarTareaModal, HandleModalBorrarTarea, proyecto, completarTarea} = useProyectos()
    const {descripcion, fechaEntrega, nombre, prioridad, _id, estado, completado} = tarea

    return (
        <div className='p-5 border-b flex flex-col md:flex-row space-y-5 md:space-y-0 justify-between items-center'>
            
            <div className='space-y-1'>
                <p className='text-xl'>{nombre}</p>
                <p className='text-md uppercase text-gray-500'>{descripcion}</p>
                <p className='text-xl'>Fecha de Entrega: {formatearFecha(fechaEntrega)}</p>
                <p className='text-xl text-gray-600'>Prioridad: {prioridad}</p>
                {estado &&  <p className='text-xs bg-green-600 uppercase p-1 rounded-lg text-white w-fit font-semibold'>Completada por {completado.nombre}</p>}
            </div>

            <div className='flex flex-col gap-2 '>
                {useAdmin() ? (
                    <button
                    onClick={() => editarTareaModal(tarea)}
                        className='bg-indigo-600 py-3 px-4 text-white font-bold uppercase text-sm rounded-lg'
                    >Editar</button>
                ) : null}

                <button
                    onClick={() => completarTarea(_id)}
                    className={` ${estado ? "bg-green-600" : "bg-gray-600"} py-3 px-4 text-white font-bold uppercase text-sm rounded-lg`}
                >{estado ? "Completa" : "Incompleta" }</button>

                {useAdmin() ? (    
                    <button
                        onClick={() => HandleModalBorrarTarea(tarea)}
                        className='bg-red-600 py-3 px-4 text-white font-bold uppercase text-sm rounded-lg'
                    >Eliminar</button>
                ) : null}
                
                <Link
                    className='bg-sky-600 py-3 px-4 text-white font-bold uppercase text-sm rounded-lg'
                    to={`/proyectos/historial/${_id}`}
                >Historial/Cambios</Link>
            </div>
            

            
        </div>
    )
}

export default Tarea