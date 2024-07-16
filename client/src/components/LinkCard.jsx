import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLinks } from '../context/LinkContext';
import RedditIcon from '../svg/RedditIcon';
import { LINKS_RSS } from './SocialMediaLinks';

export default function LinkCard(props) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { createLink, deleteLink, updateLink } = useLinks();
  const [isOtherPage, setIsOtherPage] = useState(false);

  const id = props.id;
  const link = props.link;

  useEffect(() => {
    if (link) {
      setValue("pagina", link.pagina);
      setValue("enlace", link.enlace);
      setIsOtherPage(!LINKS_RSS.some(rss => rss.nombre === link.pagina));
    }
  }, [link, setValue]);

  const onSubmit = async (data) => {
    if (link) {
      const enlace = link._id.toString(); // Convertir ObjectId a string
      await editLink(data, enlace);
    } else {
      await crearLink(data);
    }
  };

  const editLink = async (data, enlace) => {
    try {
      await updateLink(data, enlace);
      await props.getLinks();
    } catch (error) {
      console.error("Error al editar el enlace:", error);
    }
  }

  const crearLink = async (data) => {
    try {
      await createLink(data);
      await props.getLinks();
    } catch (error) {
      console.error("Error al crear el enlace:", error);
    }
  }

  const handleDelete = async (id) => {
    props.setCardId(id);
    await deleteLink(link._id);
    await props.getLinks();
  }

  return (
    <div className='w-full bg-gray-200 rounded-md p-4'>
      <div className='flex'>
        <p>Link</p>
        <button className='ml-auto' onClick={() => handleDelete(id)}>Eliminar</button>
      </div>
      <form className='w-full flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="pagina" className='text-left text-xs mt-2'>Plataforma</label>
        {!isOtherPage ? (
          <>
            <select
              name="pagina"
              id="pagina"
              {...register("pagina", { required: true })}
              className="p-2"
              onChange={(e) => setIsOtherPage(e.target.value === "Otra página")}
            >
              {LINKS_RSS.map(rss => (
                <option key={rss.nombre} value={rss.nombre}>{rss.nombre}</option>
              ))}
              <option value="Otra página">Otra página</option>
            </select>
            {errors.pagina && <span>Este campo es requerido</span>}
          </>
        ) : (
          <input
            type="text"
            name="pagina"
            id="pagina"
            className='p-2'
            {...register("pagina", { required: true })}
          />
        )}

        <label htmlFor="enlace" className='text-left text-xs mt-2'>Enlace</label>
        <input
          type="text"
          name="enlace"
          id="enlace"
          className='p-2'
          {...register("enlace", { required: true })}
        />
        {errors.enlace && <span>Este campo es requerido</span>}

        <button
          type='submit'
          className='mr-auto py-2 mt-4 border border-slate-400 px-6 rounded-md bg-gray-300 hover:bg-gray-200'>
          {link ? ("Editar") : ("Añadir")}
        </button>
      </form>
    </div>
  );
}
