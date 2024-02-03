import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta'

const NuevoPassword = () => {
    const [modificado, setModificado] = useState(false)
    const [tokenValido, setTokenValido] = useState(false)
    const [password, setPassword] = useState("")
    const [alerta, setAlerta] = useState({})

    const {token} = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password.length < 6) {
            setAlerta({
                msg: "El Password Es demasiado Corto.",
                error: true
            })
            return
        } 
        if(!/\d/.test(password)) {
            setAlerta({
                msg: "El password Necesita al menos un numero",
                error: true
            })
            return
        }

        try {
            const {data} = await clienteAxios.post(`/usuarios/recuperar-password/${token}`, {password});
            setModificado(true)

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

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/recuperar-password/${token}`);
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
                setTokenValido(false)
            }
        }; 
        comprobarToken()
    }, [])

    const {msg} = alerta

    return (
        <div>
            <h1 className='text-sky-600 text-6xl capitalize font-bold '>Restablece tu <span className='text-slate-700'> Password</span></h1>

            {alert && msg ? <Alerta alerta={alerta}/> : null}
            
            {tokenValido ? (
                <form 
                className='my-10 bg-white shadow p-10 rounded-lg space-y-5'
                onSubmit={handleSubmit}
            >
                
                <div className=' space-y-3'>
                    <label 
                        htmlFor="password" 
                        className='block text-2xl uppercase text-gray-600 font-bold'
                    >New Password</label>
                    <input 
                        type="password" 
                        name='password' 
                        id='password' 
                        placeholder='Escribe Tu Nuevo Password'
                        className='w-full p-3 text-xl border rounded-xl bg-gray-50'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className='text-sm text-gray-500'>El password tiene que ser mayor a 6 letras y contener al menos un numero</p>
                </div>
                
                <button
                    type='submit'
                    className={`bg-sky-700 py-3 w-full uppercase text-white font-bold text-xl rounded hover:bg-sky-500 transition-colors `}
                >
                    Guardar Contraseña
                </button>

            </form>
            ) : null}
            {modificado ? <Link
                    className='block text-center my-5 text-slate-500 uppercase text-sm '
                    to="/"
                >Iniciar Sesión</Link> : null}
        </div>
    )
}

export default NuevoPassword