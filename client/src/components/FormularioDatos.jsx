import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast'; // Importa toast desde react-hot-toast

export default function FormularioDatos() {
    const { editProfile, user } = useAuth();
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (user) {
            setValue('username', user.username);
            setValue('email', user.email);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        try {
            // console.log(data);
            await toast.promise(
                editProfile(data),
                {
                    loading: 'Guardando cambios...',
                    success: <b>Cambios guardados exitosamente!</b>,
                    error: <b>No se pudo guardar los cambios.</b>,
                }
            );
        } catch (error) {
            // console.error("Error al editar:", error);
        }
    };

    return (
        <form className='w-full flex flex-col justify-between gap-5 h-full' onSubmit={handleSubmit(onSubmit)}>
            <section className='bg-slate-100 w-full p-4 flex flex-col justify-around items-start gap-4 h-full'>
                <article className='w-full flex md:flex-row flex-col gap-4'>
                    <label htmlFor="username" className='w-full md:w-1/3 p-2 text-left'>Nombre de usuario</label>
                    <input type="text" name="username" id="username" className='w-full md:w-2/3 p-2' {...register('username')} />
                </article>
                <article className='w-full flex md:flex-row flex-col gap-4'>
                    <label htmlFor="email" className='w-full md:w-1/3 text-left'>Correo electrónico</label>
                    <input type="email" name="email" id="email" className='w-full md:w-2/3 p-2' {...register('email')} />
                </article>
            </section>

            <button type="submit" className='bg-blue-500 text-white p-2 w-40 ml-auto rounded-md'>Guardar cambios</button>
        </form>
    );
}
