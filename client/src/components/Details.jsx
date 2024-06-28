import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Details(props) {
    const link = props.link
    const user = props.user

    console.log("user: ", user)
  return (
    <section className='bg-white col-span-1 row-span-8 flex flex-col items-center justify-start gap-2'>
        <article className='flex flex-col items-center justify-center gap-4 mt-4'>
            <div className='size-52 bg-green-500 rounded-full'></div>
            {user ? <p>{user.username}</p> : <p>Nombre de usuario</p>}
            {user ? <p>{user.email}</p> : <p>Correo electrónico</p>}
        </article>
        <article className='w-full'>
            <ul className='p-4 grid grid-cols-1 gap-2 w-full'>
            {link && link.length > 0 ? 
            link.map((carta, index) => (
                <li key={index} className='p-4 bg-blue-500 text-white w-full'>{carta.pagina}</li>
            ))
            : <li>No hay links</li>
            }
            </ul>
            
        </article>
        
    </section>
  )
}
