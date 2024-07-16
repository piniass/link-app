import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useForm } from 'react-hook-form';

export default function FormularioImagen() {
    const [imagePreview, setImagePreview] = useState('');
  const [fileName, setFileName] = useState('');
  const { formImage } = useAuth();
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const file = data.image[0];
    console.log("envio archivo: ", file);
    if (file) {
      await formImage(file);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFileName(file.name);
      setValue('image', [file]); // Update the form value for image
    }
  };
  return (
    <form className='flex items-center justify-between bg-slate-100 w-full p-4 h-80' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col'>
            <p>Foto de perfil</p>
            <label className='bg-blue-500 text-white p-2 cursor-pointer my-2'>
              Selecciona una imagen
              <input 
                type="file" 
                name="image" 
                id="image" 
                className='hidden' 
                onChange={handleImageChange} // Handle image change event
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
        </form>
  )
}
