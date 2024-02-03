import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useProyectos from '../hooks/useProyecto'
import Alerta from "../components/Alerta"

// Como esto sera un ENUM (Valores que son fijos) se recomienda que sea escrito en mayusculas, que sea una constante
const PRIORIDAD = ["Baja", "Media", "Alta"]

export default function ModalFormTarea() {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("")
    const [prioridad, setPrioridad] = useState("")
    const [fecha, setFecha] = useState("")
    const [id, setId] = useState("")

    const {closeModal, isOpen, submitTarea, alerta, setAlerta, proyecto, editarTarea, tareaEditar } = useProyectos();

    useEffect(() => {
        if(editarTarea) {
            setNombre(tareaEditar.nombre)
            setDescripcion(tareaEditar.descripcion)
            setFecha(tareaEditar.fechaEntrega?.split("T")[0])
            setPrioridad(tareaEditar.prioridad)
            setId(tareaEditar._id)
        } else {
            setNombre("")
            setDescripcion("")
            setFecha("")
            setPrioridad("")
        }
    }, [editarTarea])

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, descripcion, prioridad, fecha].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }

        // lo hacemos asyncrono para que hasta acabe la consulta se reinicie el State
        await submitTarea({
            nombre,
            descripcion,
            prioridad,
            fechaEntrega: fecha,
            proyecto: proyecto._id,
            id
        })

        setNombre("")
        setDescripcion("")
        setPrioridad("")
        setFecha("")
    };

    const {msg} = alerta;

    return (
        <>
            <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={closeModal}
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            {alerta && msg ? <Alerta alerta={alerta}/> : null}

                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0  sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-xl leading-6 font-bold text-gray-900">
                                        {editarTarea ? "Actualizar Tarea" : "Crear Tarea"}
                                    </Dialog.Title>

                                    <form 
                                        className='my-10'
                                        onSubmit={handleSubmit}
                                    >
                                        <div className='mb-5'>
                                            <label 
                                                htmlFor="nombre" 
                                                className='text-gray-700 uppercase font-bold text-sm'
                                            >
                                                Nombre Tarea
                                            </label>
                                            
                                            <input 
                                                type='text' 
                                                name='nombre'
                                                id='nombre'
                                                placeholder='Nombre de la Tarea'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={nombre}
                                                onChange={e => setNombre(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label 
                                                htmlFor="descripcion" 
                                                className='text-gray-700 uppercase font-bold text-sm'
                                            >
                                                Descripción Tarea
                                            </label>
                                            
                                            <textarea  
                                                name='descripcion'
                                                id='descripcion'
                                                placeholder='Descripción de la Tarea'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={descripcion}
                                                onChange={e => setDescripcion(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label 
                                                htmlFor="fecha" 
                                                className='text-gray-700 uppercase font-bold text-sm'
                                            >
                                                Fecha Entrega
                                            </label>
                                            
                                            <input
                                                type='date'  
                                                name='fecha'
                                                id='fecha'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={fecha}
                                                onChange={e => setFecha(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label 
                                                htmlFor="prioridad" 
                                                className='text-gray-700 uppercase font-bold text-sm'
                                            >
                                                Prioridad 
                                            </label>
                                            
                                            <select 
                                                name="prioridad" 
                                                id="prioridad"
                                                className='block mt-2 border-2 p-2 rounded-md text-gray-400 w-full md:w-auto text-center'
                                                value={prioridad}
                                                onChange={e => setPrioridad(e.target.value)}
                                            >
                                                <option value="">-- Seleccionar --</option>
                                                {PRIORIDAD.map(opcion => (
                                                    <option key={opcion} value={opcion}>{opcion}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <button
                                            type="submit"
                                            className='bg-sky-500 hover:bg-sky-400 transition-colors mt-3 py-3 w-full text-white uppercase font-bold rounded-md text-sm'
                                        >{editarTarea ? "Guardar Cambios" : "Agregar Tarea" }</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
        </>
    )
}
