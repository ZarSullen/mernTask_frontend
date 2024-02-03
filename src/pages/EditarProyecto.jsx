import React, { useEffect } from 'react'
import useProyectos from '../hooks/useProyecto'
import { useParams } from 'react-router-dom'
import FormularioProyecto from '../components/FormularioProyecto'

const EditarProyecto = () => {
    const {obtenerProyecto, proyecto} = useProyectos()

    const {id} = useParams()

    const {cliente, fechaEntrega, nombre, _id, descripcion, colaboradores} = proyecto

    useEffect(() => {
        obtenerProyecto(id);
    }, [])


    return (
        <div>
            <h1 className='font-black text-4xl'>Editar: {nombre}</h1>

            <div className='mt-10 flex-row justify-center'>
                        
                <FormularioProyecto />
            </div>
        </div>

    )
}

export default EditarProyecto