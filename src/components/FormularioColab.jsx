import React, { useState } from 'react'
import useProyectos from '../hooks/useProyecto'
import Alerta from './Alerta'

const FormularioColab = () => {
    const [email, setEmail] = useState("")

    const {alerta, setAlerta, submitColaborador} = useProyectos()

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email === "") {
            setAlerta({
                msg: "Campo Obligatorio",
                error: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000)
            return
        }
        setAlerta({})

        submitColaborador(email)
        setEmail("")
    } 

    const {msg} = alerta;

    return (
        <>
            <form
                className={`${msg ? "pt-0 pb-10" : "py-10" } bg-white px-5 w-full lg:w-1/2 rounded-lg shadow`}
                onSubmit={handleSubmit}
            >

                {msg && <Alerta alerta={alerta} />}
                <div className='mb-5'>
                    <label 
                        htmlFor="email" 
                        className='text-gray-700 uppercase font-bold text-sm'
                    >
                        Email del Colaborador
                    </label>
                    
                    <input 
                        type='email' 
                        name='email'
                        id='email'
                        placeholder='Ejemplo: pepito@gmail.com'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className='bg-sky-500 hover:bg-sky-400 transition-colors mt-3 py-3 w-full text-white uppercase font-bold rounded-md text-sm'
                >Buscar Colaborador</button>
            </form>
        </>
    )
}

export default FormularioColab