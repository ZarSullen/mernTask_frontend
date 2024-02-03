
import React, { useState } from 'react'
import clienteAxios from '../config/clienteAxios';
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'

const OlvidePassword = () => {
    const [email, setEmail] = useState("")
    const [alerta, setAlerta] = useState({})

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const {data} = await clienteAxios.post(`/usuarios/recuperar-password`, {email});
            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    };

    const {msg} = alerta
    return (
    <div>
        <h1 className='text-sky-600 text-6xl capitalize font-bold '>Recupera tu acceso y no pierdas tus<span className='text-slate-700'> proyectos</span></h1>
        
        {alerta && msg ? <Alerta alerta={alerta} /> : null}
        <form 
            className='my-10 bg-white shadow p-10 rounded-lg space-y-5'
            onSubmit={handlePasswordSubmit}
        >
            
            <div className=' space-y-3'>
                <label 
                    htmlFor="email" 
                    className='block text-2xl uppercase text-gray-600 font-bold'
                >Email</label>
                <input 
                    type="email" 
                    name='email' 
                    id='email' 
                    placeholder='ej: correo@hotmail.com'
                    className='w-full p-3 text-xl border rounded-xl bg-gray-50'
                    value={email}
                    onChange={(e) => setEmail(e.target.value) }
                />
            </div>
            
            <button
                type='submit'
                className='bg-sky-700 py-3 w-full uppercase text-white font-bold text-xl rounded hover:bg-sky-500 transition-colors'
            >
                Enviar Correo
            </button>
        </form>

        <nav className='lg:flex lg:justify-between'>
            <Link
                className='block text-center my-5 text-slate-500 uppercase text-sm '
                to="/"
            >¿Ya tienes una Cuenta? Entra!</Link>
            
            <Link
                className='block text-center my-5 text-slate-500 uppercase text-sm '
                to="/registrar"
            >¿No tienes una cuenta? Regístrate</Link>
        </nav>

    </div>
    )
}

export default OlvidePassword