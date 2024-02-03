import React from 'react'
import FormularioColab from '../components/FormularioColab'
import useProyectos from '../hooks/useProyecto'
import ColaboradorPreview from '../components/ColaboradorPreview'

const NuevoColaborador = () => {

    const {proyecto, alerta, setAlerta, busquedaColaborador} = useProyectos()

    const {msg} = alerta;

    return (
        <>
            <div className='md:flex md:items-center gap-5'>    
                <h1
                    className='text-4xl font-black '
                >Añadir Colaboradores / <span className='text-slate-600 font-semibold'>Proyecto: {proyecto.nombre}</span></h1>
                
            </div>

            <p className='mt-5 text-gray-600 text-lg'>Agrega Colaboradores buscando su correo</p>
            <div className='mt-10 flex justify-center items-center flex-col space-y-10' >
                <FormularioColab />

                {/* Object.values o keys nos retorna un array, entonces podemos utilizar los metodos para este */}
                {Object.values(busquedaColaborador).length ? <ColaboradorPreview /> : null}                
                
            </div>
        </>
    )
}

export default NuevoColaborador