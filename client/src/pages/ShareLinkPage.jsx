import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { LINKS_RSS } from '../components/SocialMediaLinks';
import LinkDetail from '../components/LinkDetail';
import axios from '../api/axios'

export default function ShareLinkPage() {
    const location = useLocation();
    const usernamePath = location.pathname.slice(6);
    const [user, setUser] = useState()
    const [links, setLinks] = useState()

    const findImage = (name) => {
        console.log(name)
        const social = LINKS_RSS.find(rss => rss.nombre === name);
        return social ? social.imagen : null;
    }
  
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

    const getUser = async (username) => {
        try {
            const res = await axios.get(`/user/${username}`);
            // console.log(res.data);
            setUser(res.data)
        } catch (error) {
            console.error("Error fetching user:", error.response ? error.response.data : error.message);
        }
    };

    const getLinksByUser = async (username) => {
        try {
            const res = await axios.get(`/link/user/${username}`);
            // console.log(res.data);
            setLinks(res.data)
        } catch (error) {
            console.error("Error fetching links:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getUser(usernamePath);
            await getLinksByUser(usernamePath);
        };

        fetchData();
    }, [usernamePath]); // Añadir usernamePath como dependencia para asegurarse de que el efecto se ejecute cuando cambie

    // console.log(usernamePath);
    // console.log(user)
    return (
        <div className='h-screen overflow-hidden bg-slate-100'>
            <header className='w-full p-6 bg-blue-500 h-[200px] rounded-b-3xl'></header>
            <main className='h-screen flex items-start justify-center relative'>
          <article className='bg-white absolute top-[-50px] rounded-md shadow-md'>
              <div className='p-4 flex flex-col gap-4 justify-center items-center'>
              {user && user.image && (
                <>
                    <img src={user.image.url} alt="Imagen de avatar" className='size-52 object-cover rounded-full'/>
                    <h3>@{user.username}</h3>
                </>
            )}
                
              </div>
              <ul className='flex flex-col gap-4 w-[350px] h-[250px] overflow-auto p-2'>
              {links && links.length > 0 ? 
                        links.map((carta, index) => (
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
        </main>
        </div>
    );
}
