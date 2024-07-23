import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLinks } from '../context/LinkContext';
import { LINKS_RSS } from './SocialMediaLinks';
import toast from 'react-hot-toast';

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
      await toast.promise(
        updateLink(data, enlace).then(() => props.getLinks()),
        {
          loading: 'Cargando...',
          success: <b>Enlace editado</b>,
          error: <b>No se pudo editar correctamente.</b>,
        }
      );
    } catch (error) {
      console.error("Error al editar el enlace:", error);
    }
  };

  const crearLink = async (data) => {
    try {
      await toast.promise(
        createLink(data).then(() => props.getLinks()),
        {
          loading: 'Cargando...',
          success: <b>Enlace creado!</b>,
          error: <b>No se pudo crear el enlace.</b>,
        }
      );
    } catch (error) {
      console.error("Error al crear el enlace:", error);
    }
  };

  const handleDelete = async (id) => {
    props.setCardId(id);
    toast.promise(
      deleteLink(link._id),
      {
        loading: 'Cargando...',
        success: <b>Enlace eliminado</b>,
        error: <b>No se pudo eliminar el enlace.</b>,
      }
    ).then(() => {
      props.getLinks();
    }).catch((error) => {
      console.error("Error al eliminar el enlace:", error);
    });
  };

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
            {errors.pagina && <span className='text-sm'>Este campo es requerido</span>}
          </>
        ) : (
          <>
            <input
              type="text"
              name="pagina"
              id="pagina"
              className='p-2'
              {...register("pagina", { required: true })}
            />
            <span className='text-left text-sm'>Escribe el nombre del página</span>
          </>
        )}

        <label htmlFor="enlace" className='text-left text-xs mt-2'>Enlace</label>
        <input
          type="text"
          name="enlace"
          id="enlace"
          className='p-2'
          {...register("enlace", { required: true })}
        />
        {errors.enlace && <span className='text-left text-sm'>Este campo es requerido</span>}

        <button
          type='submit'
          className='mr-auto py-2 mt-4 border border-slate-400 px-6 rounded-md bg-gray-300 hover:bg-gray-200'>
          {link ? ("Editar") : ("Añadir")}
        </button>
      </form>
    </div>
  );
}
