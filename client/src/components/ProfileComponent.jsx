import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useForm } from 'react-hook-form';
import FormularioImagen from './FormularioImagen';
import FormularioDatos from './FormularioDatos';
export default function ProfileComponent() {
  

  return (
    <section className='bg-white col-span-3 md:col-span-2 row-span-8 p-7 flex flex-col items-start gap-5'>
      <h1 className='font-bold text-3xl'>Detalles del perfil</h1>
      <p className='text-gray-400'>Añade tus detalles para darle un toque personal a tu perfil</p>
      <section className='flex flex-col gap-4 w-full h-full overflow-auto'>
        <FormularioImagen/>
        <FormularioDatos/>
        
        
      </section>
    </section>
  );
}
