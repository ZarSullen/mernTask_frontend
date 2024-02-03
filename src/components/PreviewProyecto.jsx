import React from 'react'
import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyecto'
import useAuth from '../hooks/useAuth'
import useAdmin from '../hooks/useAdmin'

const PreviewProyecto = ({proyecto}) => {
    const {handleDestroyProyecto} = useProyectos()
    const {auth} = useAuth()
    const {cliente, descripcion, nombre, _id, colaboradores} = proyecto;


    return (
        <div className='border-b flex p-5 items-center'>

            <p className='text-xl font-semibold flex-1 '>
                {nombre}
                <span className='text-sm text-gray-500 uppercase border-l-2 border-black ml-3 pl-1'> {cliente}</span>    
            </p>

            <div className='flex gap-5 items-center justify-center'>
                {proyecto.creador === auth._id ? (
                    <button
                    type='button'
                    onClick={() => handleDestroyProyecto(_id)}
                    className='text-red-600 hover:text-red-800 uppercase font-bold transition-colors text-xs'
                    >
                        Eliminar
                    </button>
                ) : <p className='text-xs  font-bold p-1 rounded-lg bg-green-500 text-white uppercase'>Colaborador</p> }
                

                <Link
                    to={`${_id}`}
                    className='text-gray-600 hover:text-gray-800 uppercase font-bold transition-colors text-xs   '
                >Ver Proyecto</Link>
            </div>
        </div>
    )
}

export default PreviewProyecto