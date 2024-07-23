import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useLinks } from '../context/LinkContext';
import { LINKS_RSS } from '../components/SocialMediaLinks';
import LinkDetail from '../components/LinkDetail';
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'; 

export default function LinkPage() {
    const location = useLocation();
    const navigate = useNavigate() 
    const {link, getLinks} = useLinks()
    const user = location.state.user

    useEffect(() => {
        getLinks()
    },[])

    const handleBackEditor = () => {
      navigate(-1)
    }

    const findImage = (name) => {
    //   console.log(name)
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

  const copyToClipboard = () => {
    const username = user.username;
    const linkToCopy = `${window.location.origin}/user/${username}`;
    navigator.clipboard.writeText(linkToCopy);
    toast.success('Enlace copiado al portapapeles');
};
    // console.log("Links: ",link)
    // console.log("Usuario: ",location.state.user)
  return (
    <div className='h-screen overflow-hidden bg-slate-100'>
        <Toaster
  position="bottom-center"
  reverseOrder={false}
/>
        <header className='w-full p-6 bg-blue-500 h-[200px] rounded-b-3xl'>
            <div className='p-2 w-full rounded-lg bg-white flex justify-between'>
                <button className='text-gray-500 p-4' onClick={handleBackEditor}>Volver al editor</button>
                <button className='text-blue-500 hover:bg-blue-500 hover:text-white p-4 rounded-md' onClick={copyToClipboard}>Compartir</button>
            </div>
        </header>
        <main className='h-screen flex items-start justify-center relative'>
          <article className='bg-white absolute top-[-50px] rounded-md shadow-md'>
              <div className='p-4 flex flex-col gap-4 justify-center items-center'>
                <img src={user.image.url} alt="Imagen de avatar" className='size-32 md:size-52 object-cover rounded-full'/>
                <h3>{user.username}</h3>
                <h4>{user.email}</h4>
              </div>
              <ul className='flex flex-col gap-4 w-full md:w-[350px] h-[250px] overflow-auto p-2'>
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
        </main>
    </div>
  )
}
