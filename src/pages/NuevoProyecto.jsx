import React from 'react'
import FormularioProyecto from '../components/FormularioProyecto'

const NuevoProyecto = () => {
  return (
    <>
        <h1 className='text-4xl font-black '>Crear Proyecto</h1>
        <div className=' mt-5 h-2 bg-sky-200 lg:5/6 xl:w-1/2 mx-auto rounded'></div>
        <div className='mt-10 flex-row justify-center'>
            
            <FormularioProyecto />
        </div>
    </>
  )
}

export default NuevoProyecto