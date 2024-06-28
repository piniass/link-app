import React from 'react';
import { useForm } from "react-hook-form";
import { useLinks } from '../context/LinkContext';

export default function LinkCard(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createLink } = useLinks();
  console.log("Props en carta:", props)

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await createLink(data);
      props.getLinks()
    } catch (error) {
      console.error("Error al crear el enlace:", error);
    }
  };

  return (
    <div className='w-full bg-gray-200 rounded-md p-4'>
        <div className='flex'>
            <p>Link</p>
            <button className='ml-auto'>Eliminar</button>
        </div>
        <form className='w-full flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="pagina" className='text-left text-xs mt-2'>Plataforma</label>
            <input type="text" name="pagina" id="pagina" className="p-2" {...register("pagina", { required: true })}/>
            {errors.pagina && <span>Este campo es requerido</span>}
            <label htmlFor="enlace" className='text-left text-xs mt-2'>Enlace</label>
            <input type="text" name="enlace" id="enlace" className='p-2' {...register("enlace", { required: true })}/>
            {errors.enlace && <span>Este campo es requerido</span>}
            <button type='submit' className='mr-auto py-2 mt-4 border border-slate-400 px-6 rounded-md bg-gray-300 hover:bg-gray-200'>Añadir</button>
        </form>
    </div>
  )
}
