import React from 'react'
import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyecto'
import Busqueda from './Busqueda';

const Header = () => {

    const {cerrarSesion, buscador, handleBuscador} = useProyectos();

    return (
        <header className='px-4 py-5 bg-white border-b'>
            <div className='flex flex-col gap-5 md:flex-row md:gap-0  md:justify-between md:items-center'>
                <h2 className='text-4xl text-sky-600 font-black text-center'>UpTask</h2>

                <div className='flex flex-col text-center md:flex-row md:items-center gap-4'>
                    <button
                        type='button'
                        className='font-bold uppercase'
                        onClick={handleBuscador}
                    >Buscar Proyecto</button>

                    <Link
                        to="/proyectos"
                        className='font-bold uppercase'
                    >Proyectos</Link>

                    <button
                        type='button'
                        onClick={cerrarSesion}
                        className='text-white text-sm bg-sky-600 p-2 rounded-md uppercase font-bold'
                    >Cerrar Sesión</button>
                </div>
                <Busqueda />
            </div>
        </header>
    )
}

export default Header