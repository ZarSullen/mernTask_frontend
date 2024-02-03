import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const Registrar = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");
    const [alerta, setAlerta] = useState({})

    const handleRegistroSubmit = async e => {
        e.preventDefault();


        if([nombre, email, password, repetirPassword].includes("")) {
            setAlerta({
                msg:"Todos los Campos son Obligatorios",
                error: true
            })
            return
        }

        if(password !== repetirPassword) {
            setAlerta({
                msg: "Los password no son idéntico",
                error: true
            })
            return
        }

        if( !/\d/.test(password) || !/\d/.test(repetirPassword)) {
            setAlerta({
                msg: "El password Necesita un Numero al menos.",
                error: true
            })
            return
        }

        if(password.length < 6) {
            setAlerta({
                msg: "Password Demasiado Corto",
                error: true
            })
            return
        }
        try {
            const {data} = await clienteAxios.post(`/usuarios`, {nombre, email, password});
            setAlerta({
                msg: data.msg,
                error: false
            })

            setNombre("")
            setEmail("")
            setPassword("")
            setRepetirPassword("")
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            return
        }

    }

    const {msg} = alerta;

    return (
        <div>
            
            <h1 className='text-sky-600 text-6xl capitalize font-bold '>Crea tu Cuenta y Administra tus<span className='text-slate-700'> proyectos</span></h1>

            {msg && alerta ? <Alerta alerta={alerta}/> : null}
            
            <form 
                className='my-10 bg-white shadow p-10 rounded-lg space-y-5'
                onSubmit={handleRegistroSubmit}
            >
                <div className=' space-y-3'>
                    <label 
                        htmlFor="nombre" 
                        className='block text-2xl uppercase text-gray-600 font-bold'
                    >Nombre</label>
                    <input 
                        type="text" 
                        name='nombre' 
                        id='nombre' 
                        placeholder='Tu Nombre'
                        className='w-full p-3 text-xl border rounded-xl bg-gray-50'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
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
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className=' space-y-3'>
                    <label 
                        htmlFor="password" 
                        className='block text-2xl uppercase text-gray-600 font-bold'
                    >Password</label>
                    <input 
                        type="password" 
                        name='password' 
                        id='password' 
                        placeholder='Password de registro'
                        className='w-full p-3 text-xl border rounded-xl bg-gray-50'
                        
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    
                    <p className='text-sm text-gray-500'>El password tiene que ser mayor a 6 letras y contener al menos un numero</p>
                </div>
                <div className=' space-y-3'>
                    <label 
                        htmlFor="password2" 
                        className='block text-2xl uppercase text-gray-600 font-bold'
                    >Repetir Password</label>
                    <input 
                        type="password" 
                        name='password2' 
                        id='password2' 
                        placeholder='Repite tu password'
                        className='w-full p-3 text-xl border rounded-xl bg-gray-50'
                        
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)}
                    />
                    <p className='text-sm text-gray-500'>Repite el password</p>
                </div>
                <button
                    type='submit'
                    className='bg-sky-700 py-3 w-full uppercase text-white font-bold text-xl rounded hover:bg-sky-500 transition-colors'
                >
                    Crear Cuenta
                </button>


            </form>
                <nav className='lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm '
                        to="/"
                    >¿Ya tienes una Cuenta? Entra!</Link>
                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm '
                        to="/olvide-password"
                    >Olvide mi Password</Link>
                </nav>
        </div>
    )
}

export default Registrar