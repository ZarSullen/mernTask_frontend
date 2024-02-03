import React from 'react'
import useProyectos from '../hooks/useProyecto'

const ColaboradorPreview = () => {
    const {cargando, busquedaColaborador, agregarColaborador} = useProyectos()

    const {nombre, email} = busquedaColaborador;

    if(cargando) return <p className='mt-10'>Cargando...</p>

    return (
        <div className='bg-white px-5 py-10 w-full lg:w-1/2 rounded-lg shadow'>
            <h2 className='text-center text-2xl font-bold'>Resultado</h2>
            <div className='flex gap-5 justify-between items-center mt-7 '>

                <div className='flex flex-col gap-5'>
                    <p className='text-xl text-gray-700 font-bold'>Colaborador: <span className='font-normal'>{nombre}</span></p>
                    <p className='text-xl text-gray-700 font-bold'>Email: <span className='font-normal'>{email}</span></p>
                </div>

                <button
                    type='button'
                    onClick={() => agregarColaborador(busquedaColaborador)}
                    className='bg-slate-500 px-5 py-2 rounded-lg uppercase font-bold text-white text-sm'
                >Agregar al proyecto</button>
            </div>
        </div>
    )
}

export default ColaboradorPreview