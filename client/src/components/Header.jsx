import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation();
    const isLinksPage = location.pathname === '/links';
    const { user,logout } = useAuth()

    const goLinksPage = () => {
        navigate('/links')
    }
    const goProfilePage = () => {
        navigate('/perfil')
    }

    const handleViewLinks = () => {
      navigate(`/profile/${user.username}`,{state:{user:user}})
    }
  return (
    <header className='col-span-3 row-span-1 bg-white flex items-center justify-between p-7'>
        <div>LINKEADOS</div>
        <div className='flex items-center gap-10'>
          <button
            className={`p-3 rounded-md ${isLinksPage ? 'bg-blue-500 text-white ' : 'bg-transparent text-gray-400 hover:bg-blue-500 hover:text-white'}`}
            onClick={goLinksPage}
          >
            Links
          </button>
          <button 
            onClick={goProfilePage}

            className={`p-3 rounded-md ${!isLinksPage ? 'bg-blue-500 text-white ' : 'bg-transparent text-gray-400 hover:bg-blue-500 hover:text-white'}`}>
              Ver perfil
              </button>
        </div>
        
        <div className='flex gap-5 '>
        <button className='text-blue-500 rounded-md p-3 hover:bg-blue-500 hover:text-white' onClick={handleViewLinks}>
          Ver enlaces
        </button>
        <button 
        onClick={() => logout()}
        className=' bg-white text-gray-400 rounded-md p-3 hover:bg-blue-500 hover:text-white'>
          Cerrar sesión
        </button>
        </div>
        
    </header>
  )
}
