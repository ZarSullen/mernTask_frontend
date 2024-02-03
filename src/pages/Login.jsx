import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({});

    const {infoLoginUsuario} = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault();

        if([email, password].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return
        };

        try {
            const {data} = await clienteAxios.post("/usuarios/login", {email, password});

            // Guardamos la autorización que es el JWT en localStorage
            localStorage.setItem("JWT", data.token)
            // Guardamos en el context la info de la autenticación
            infoLoginUsuario(data)
            // Reseteamos la alerta
            setAlerta({})
            // redireccionamos a /proyectos
            navigate("/proyectos")
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const {msg} = alerta
    return (
        <div>
            <h1 className='text-sky-600 text-6xl capitalize font-bold '>Inicia sesión y administra tus<span className='text-slate-700'> proyectos</span></h1>

            {alerta && msg ? (
                <Alerta  alerta={alerta}/>
            ) : null }

            <form 
                className='my-10 bg-white shadow p-10 rounded-lg space-y-5'
                onSubmit={handleSubmit}
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
                        autoComplete="current-password"
                        placeholder='Password'
                        className='w-full p-3 text-xl border rounded-xl bg-gray-50'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                
                <button
                    type='submit'
                    className='bg-sky-700 py-3 w-full uppercase text-white font-bold text-xl rounded hover:bg-sky-500 transition-colors'
                >
                    Iniciar Sesión
                </button>

            </form>
                <nav className='lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm '
                        to="/registrar"
                    >¿No tienes una cuenta? Regístrate</Link>
                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm '
                        to="/olvide-password"
                    >Olvide mi Password</Link>
                </nav>
        </div>
    )
}

export default Login