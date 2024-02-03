import React, { useEffect, useState } from 'react'
import useProyectos from '../hooks/useProyecto'
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid/non-secure'
import { formatearFechaHistorial } from '../helpers/formatearFecha';

const HistorialCompletado = () => {
    const [historial, setHistorial] = useState([])

    const {id} = useParams();
    const {proyecto, obtenerNombreHistorial} = useProyectos();

    useEffect(() => {
        const fetchData = async () => {
            const tareas = proyecto.tareas.filter((tarea) => tarea._id === id);
            tareas[0].historial.map((persona) => {
                persona.key = nanoid()
            });
            // Fetch the data asynchronously and update the state
            const historialData = await Promise.all(
                tareas[0]?.historial?.map(async (persona) => {
                const nombre = await obtenerNombreHistorial(persona._id);
                return { ...persona, nombre };
                })
            );

            console.log(historialData)
            setHistorial(historialData);
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className='space-y-5 '>
                <h1 className='text-4xl font-black text-gray-800'>Historial de completado</h1>
                <p className='text-lg text-slate-500'>Cada que haya cambios en el completado se mostrara la persona que hizo el cambio</p>

                <div className='bg-white shadow rounded-lg lg:w-2/3'>
                    {historial?.map(persona => (
                        <div key={persona.key} className='border-b p-5 lg:flex lg:justify-between space-y-3 lg:space-y-0'>
                            <p className='text-lg text-slate-800 font-semibold'>Nombre: <span className='font-normal text-gray-600'>{persona.nombre}</span></p>

                            <p className='text-lg text-slate-800 font-semibold'>Completado/Cambio: {""}<span className='font-normal text-gray-600'>{formatearFechaHistorial(persona.fecha)}</span></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HistorialCompletado