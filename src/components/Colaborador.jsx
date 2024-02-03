import React from 'react'
import useProyectos from '../hooks/useProyecto';
import useAuth from '../hooks/useAuth';

const Colaborador = ({colaborador}) => {

    const {HandleModalBorrarColaborador, proyecto} = useProyectos()
    const { auth } = useAuth()
    const {nombre, email, _id} = colaborador;

    return (
        <div className='p-5 border-b flex justify-between items-center '>
            <div>
                <p className='text-lg'>{nombre}</p>
                <p className='text-md text-gray-700'>{email}</p>
            </div>
            <div>
                {auth._id === proyecto.creador ? (
                    <button
                        type='button'
                        onClick={() => HandleModalBorrarColaborador(colaborador)}
                        className='bg-red-600 uppercase font-bold py-3 px-4 text-sm text-white rounded-lg' 
                    >Eliminar</button>
                ) : null }
            </div>
        </div>
    )
}

export default Colaborador