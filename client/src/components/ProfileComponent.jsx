import React, { useState } from 'react';
import AvatarComponent from './AvatarComponent';
export default function ProfileComponent() {
  const [imagePreview, setImagePreview] = useState('');
  const [fileName, setFileName] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className='bg-white col-span-2 row-span-8 p-7 flex flex-col items-start gap-5'>
      <h1 className='font-bold text-3xl'>Detalles del perfil</h1>
      <p className='text-gray-400'>Añade tus detalles para darle un toque personal a tu perfil</p>
      <section className='flex flex-col justify-between gap-4 w-full h-full'>
        {/* <form className='flex items-center justify-between bg-red-100 w-full p-4'>
          <div className='flex flex-col'>
            <p>Foto de perfil</p>
            <label className='bg-blue-500 text-white p-2 cursor-pointer my-2'>
              Selecciona una imagen
              <input 
                type="file" 
                name="file" 
                id="file" 
                className='hidden' 
                onChange={handleImageChange} 
              />
            </label>
          </div>
          <div>
            {imagePreview ? (
              <div className='flex flex-col items-center justify-center'>

              <img src={imagePreview} alt="Profile Preview" className='size-52 rounded-md object-cover' />
              {fileName && <p className='mt-2 text-gray-600'>Nombre del archivo: {fileName}</p>}

              </div>
            ) : (
              <p>No image selected</p>
            )}
          </div>
          <div>
            <p>La imagen debe ser de 1024x1024px</p>
            <p>Usa el formato JPG, PNG o BMP</p>
            <button type="submit" className='bg-blue-500 text-white p-2 w-40 ml-auto rounded-md'>Cambiar imagen</button>

          </div>
        </form> */}
        <AvatarComponent/>
        <section className='bg-slate-100 w-full p-4 flex flex-col justify-around items-start gap-4 h-full'>
          <article className='w-full flex gap-4'>
            <label htmlFor="username" className='w-1/3 p-2 text-left'>Nombre de usuario</label>
            <input type="text" name="username" id="username" className='w-2/3 p-2' />
          </article>

          <article className='w-full flex gap-4'>
            <label htmlFor="email" className='w-1/3 p-2 text-left'>Correo electrónico</label>
            <input type="email" name="email" id="email" className='w-2/3 p-2' />
          </article>
        </section>
        <button type="submit" className='bg-blue-500 text-white p-2 w-40 ml-auto rounded-md'>Guardar cambios</button>
      </section>
    </section>
  );
}
