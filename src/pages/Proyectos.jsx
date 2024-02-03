import React, { useEffect } from 'react'
import useProyectos from '../hooks/useProyecto'
import PreviewProyecto from '../components/PreviewProyecto'
import Alerta from "../components/Alerta"


const Proyectos = () => {

    const {proyectos, setProyecto, alerta, setAlerta} = useProyectos()


    const {msg} = alerta;
    return (
        <>
            <h1 className='text-4xl font-black text-gray-800'>Proyectos</h1>

            {msg && alerta ? <Alerta alerta={alerta}/> : null}

            <div className='bg-white shadow mt-10 rounded-lg'>
                {proyectos.length ? proyectos.map(proyecto => <PreviewProyecto proyecto={proyecto} key={proyecto._id}/>) : <p className=' text-center text-gray-600 uppercase py-5'>No hay Proyectos aun</p>}
            </div>
        </>
    )
}

export default Proyectos