import React, { useEffect, useState } from 'react'
import useProyectos from '../hooks/useProyecto'
import Alerta from '../components/Alerta'
import { useLocation, useParams } from 'react-router-dom'

const FormularioProyecto = () => {
    const [nombre, setNombre] = useState("")
    const [idProyecto, setIdProyecto] = useState(null)
    const [descripcion, setDescripcion] = useState("")
    const [cliente, setCliente] = useState("")
    const [fechaEntrega, setFechaEntrega] = useState("")

    const {submitProyecto, alerta, setAlerta, proyecto, setEditar} = useProyectos()

    // Si hay un id en los params significa que estamos editando entonces rellenamos los valores de los inputs con el proyecto a editar que esta en el state
    const {id} = useParams()
    const location = useLocation()

    useEffect(() => {
        if(location.pathname === `/proyectos/crear-proyecto`) {
            setNombre("")
            setDescripcion("")
            setCliente("")
            setFechaEntrega("")
        } else {
            setNombre(proyecto.nombre);
            setDescripcion(proyecto.descripcion)
            setCliente(proyecto.cliente)
            setIdProyecto(proyecto._id)
            // partimos la fecha solo para contener dia mes y año
            const fecha = proyecto.fechaEntrega.slice(0,10);
            setFechaEntrega(fecha)
        }
    }, [])

    const handleProyectoForm = async e => {
        e.preventDefault()
        
        if([nombre, descripcion, cliente, fechaEntrega].includes("")) {
            setAlerta({
                msg: "Todos los Campos son obligatorios",
                error: true
            })
            return
        }

        setAlerta({})

        if(calcularFecha(fechaEntrega)) return

        // Podemos hacerlo asyncrona para que cuando se cumpla se borre despues el formulario
        if(id) {
            await submitProyecto({
                nombre, 
                descripcion,
                fechaEntrega,
                cliente,
                id: idProyecto
            }); 
        } else {
            setEditar(false)

            await submitProyecto({
                nombre, 
                descripcion,
                fechaEntrega,
                cliente,
            });
        }

        setNombre("")
        setIdProyecto(null)
        setDescripcion("")
        setCliente("")
        setFechaEntrega("")
    }

    const calcularFecha = date => {
        // We divided the data so we could change the format of the date
        const year = date.slice(0,4)
        const month = date.slice(5,7)
        const day = date.slice(8,10)

        const newDay = Number(day) 

        // todays date
        const actualDate = new Date()
        actualDate.setUTCHours(0, 0, 0, 0);

        // ? Diferente Approach a todo lo que hice atras (que borre, solo comparaba con un if las diferentes fechas y tenia dividio de actualDate por mes, año y dia con getFullYear getMonth y getDate), sin tener que separar por variables el actualDate ya que en JS se pueden comparar fechas
        // Creamos la fecha nueva con el input que nos traemos del formulario
        const inputDate = new Date(`${year}-${month}-${newDay}`);
        inputDate.setUTCHours(0, 0, 0, 0);

        if (inputDate < actualDate) {
            setAlerta({
                msg: "Fecha ya pasada bombon :P",
                error: true
            });
            return true
        } else {
            return false
        }
    }
    const {msg} = alerta

    return (
        <>
            <form 
                className='bg-white py-10 px-5 rounded shadow w-full mx-auto lg:w-5/6 xl:w-1/2 space-y-5'
                onSubmit={handleProyectoForm}
            >
                <div className='space-y-2'>
                    <label 
                        htmlFor="nombre"
                        className='text-gray-700 uppercase font-bold rounded text-sm'
                    >Nombre</label>

                    <input 
                        type="text" 
                        id='nombre'
                        name='nombre'
                        className='border w-full p-2 rounded-lg placeholder-gray-400'
                        placeholder='Nombre del Proyecto'
                        value={ nombre }
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='space-y-2'>
                    <label 
                        htmlFor="descripcion"
                        className='text-gray-700 uppercase font-bold rounded text-sm'
                    >Descripción</label>

                    <textarea 
                        id='descripcion'
                        name='descripcion'
                        className='border w-full p-2 rounded-lg placeholder-gray-400'
                        placeholder='Descripcion del Proyecto'
                        
                        value={ descripcion }
                        onChange={e => setDescripcion(e.target.value)}
                    />
                </div>
                <div className='space-y-2'>
                    <label 
                        htmlFor="fecha-entrega"
                        className='text-gray-700 uppercase font-bold rounded text-sm'
                    >Fecha entrega</label>

                    <input 
                        type='date' 
                        id='fecha-entrega'
                        name='fecha-entrega'
                        className='border w-full p-2 rounded-lg placeholder-gray-400'
                        value={ fechaEntrega }
                        onChange={e => setFechaEntrega(e.target.value)}
                    />
                </div>
                <div className='space-y-2'>
                    <label 
                        htmlFor="cliente"
                        className='text-gray-700 uppercase font-bold rounded text-sm'
                    >Cliente</label>

                    <input 
                        type="text" 
                        id='cliente'
                        name='cliente'
                        className='border w-full p-2 rounded-lg placeholder-gray-400'
                        placeholder='Cliente del Proyecto'
                        
                        value={ cliente }
                        onChange={e => setCliente(e.target.value)}
                    />
                </div>

                <button
                    type='submit'
                    className='bg-sky-600 hover:bg-sky-400 transition-colors w-full p-2 text-white uppercase font-bold rounded '
                >{id ? "Guardar Cambios" : "Crear Proyecto"}</button>

                {msg && alerta ? <Alerta alerta={alerta} /> : null} 
            </form>
        </>
    )
}

export default FormularioProyecto