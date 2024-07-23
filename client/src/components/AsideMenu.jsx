import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '../svg/CloseIcon';

export default function AsideMenu({ isVisible, toggleAsideMenu }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isLinksPage = location.pathname === '/links';
    const { user, logout } = useAuth();

    const goLinksPage = () => {
        navigate('/links');
      }
      const goProfilePage = () => {
        navigate('/perfil');
      }
    
      const handleViewLinks = () => {
        navigate(`/profile/${user.username}`, { state: { user: user } });
      }
  return (
    <aside className={`fixed md:hidden p-4 top-0 right-0 w-64 h-full bg-white shadow-md transform transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'} z-50`}>
      <div className="p-4 text-right">
        <button onClick={toggleAsideMenu} >
          <CloseIcon />
        </button>
        <div className="mt-4 text-left">
          <ul className='flex flex-col gap-4'>
            <li><button onClick={goLinksPage}>Links</button></li>
            <li><button onClick={goProfilePage}>Ver perfil</button></li>
            <li><button onClick={handleViewLinks}>Ver enlaces</button></li>
            <li><button onClick={() => logout()}>Cerrar Sesion</button></li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
