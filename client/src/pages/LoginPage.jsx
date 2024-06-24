import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import axios from "axios";


export default function LoginPage() {
    const {register, handleSubmit, formState: { errors }} = useForm()
    const navigate = useNavigate();

    const handleGoRegister = () => {
        navigate("/register");
    };

    const onSubmit = (usuario) => {
        // ev.preventDefault()
        console.log(usuario)
        axios.post('http://localhost:3000/api/login', {
            email: usuario.email,
            password: usuario.password
          })
          .then(function (response) {
            console.log(response.data.message);
            // console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          });
    }

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-slate-100">
      <form className="bg-white border rounded-md flex flex-col gap-9 p-4 sm:p-9 w-[300px] sm:w-[500px]" 
            onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-bold">Linkeados</h1>
        <input
          type="email"
          name="email"
          className="p-2 border rounded-md"
          placeholder="Introduce tu correo..."
          {...register("email",{
            required: {
                value: true,
                message: "El campo es requerido."
            }
          })}
          id="email"
        />
        {errors.email && <span className="text-white bg-red-500 rounded-md p-2">El campo email es requerido</span>}
        <input
          type="password"
          name="pwd"
          className="p-2 border rounded-md"
          placeholder="Introduce tu contraseña..."
          {...register("password")}
          id="pwd"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Iniciar sesion
        </button>
        <button
          type="button"
          onClick={handleGoRegister}
          className="border border-blue-500 text-blue-500 p-2 rounded-md"
        >
          Registrarse
        </button>
      </form>
    </main>
  );
}
