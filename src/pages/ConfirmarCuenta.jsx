
import React, { useEffect, useState } from 'react'
import clienteAxios from '../config/clienteAxios';
import { useParams, Link} from 'react-router-dom'
import Alerta from '../components/Alerta'

const ConfirmarCuenta = () => {
    const [alerta, setAlerta] = useState({})
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const {id} = useParams();
    
    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/usuarios/confirmar/${id}`
                const {data} = await clienteAxios(url);

                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setCuentaConfirmada(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        };

        return () => confirmarCuenta()
    }, [])

    const {msg} = alerta;

    return (
        <>
            <h1 className='text-sky-600 text-6xl capitalize font-bold '>Confirma tu cuenta y comienza a crear tus <span className='text-slate-700'> Proyectos</span></h1>

            <div className='px-5 py-10 bg-white mt-20 md:mt-10 rounded-xl shadow-xl'>
                {alerta && msg ? <Alerta alerta={alerta}/> : null}

                {cuentaConfirmada ? 
                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm '
                        to="/"
                    >Inicia Sesión</Link> : null}
            </div>
        </>
    )
}

export default ConfirmarCuenta