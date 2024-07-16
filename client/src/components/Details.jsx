import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LinkDetail from './LinkDetail';
import { LINKS_RSS } from './SocialMediaLinks';
import foto from '../assets/default.webp'

export default function Details(props) {
    const { link } = props;
    const { user } = useAuth();

    console.log("usuario",user)

    const selectColor = (link) => {
        let className = 'p-2 w-full rounded-md flex items-center justify-between ';

        switch(link){
            case "Github":
                className += "bg-purple-500 text-white";
                break;
            case "Facebook":
                className += "bg-blue-300 text-white";
                break;     
            case "Instagram":
                className += "bg-fuchsia-500 text-white";
                break;
            case "Twitter":
                className += "bg-slate-500 text-white";
                break;
            case "LinkedIn":
                className += "bg-blue-500 text-white";
                break;
            case "TikTok":
                className += "bg-slate-700 text-white";
                break;
            case "Reddit":
                className += "bg-orange-300 text-white";
                break;
            case "YouTube":
                className += "bg-red-400 text-white";
                break;
            default:
                className += "bg-gray-500 text-white";
                break;
        }
        return className;
    }

    const findImage = (name) => {
        const social = LINKS_RSS.find(rss => rss.nombre === name);
        return social ? social.imagen : null;
    }

    return (
        <section className='bg-white col-span-1 row-span-8 flex flex-col items-center justify-start gap-2'>
            <article className='flex flex-col items-center justify-center gap-4 mt-4'>
               
                        {user ? <img src={user.image.url} alt="" className='rounded-full object-cover size-52'/> :  <img src={foto} alt="" className='rounded-full object-cover size-52'/>}
                    
             
                {user ? <p>{user.username}</p> : <p>Nombre de usuario</p>}
                {user ? <p>{user.email}</p> : <p>Correo electrónico</p>}
            </article>
            <article className='w-full overflow-auto'>
                <ul className='p-4 pt-0 grid grid-cols-1 gap-2 w-full'>
                    {link && link.length > 0 ? 
                        link.map((carta, index) => (
                            <li key={index} className={selectColor(carta.pagina)}>
                                <LinkDetail
                                    key={index}
                                    className={selectColor(carta.pagina)}
                                    image={findImage(carta.pagina)}
                                    name={carta.pagina}
                                    enlace={carta.enlace}
                                />
                            </li>
                        ))
                        : <li>No hay links</li>
                    }
                </ul>
            </article>
        </section>
    );
}
