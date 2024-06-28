import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function LoginPage() {
    const {register, handleSubmit, formState: { errors }} = useForm()
    const navigate = useNavigate();
    const {signin,isAuthenticated, error} = useAuth()

    useEffect(() => {
      if(isAuthenticated){
        navigate('/links')
      }
    }, [isAuthenticated])

    const handleGoRegister = () => {
        navigate("/register");
    };

    const onSubmit = async(usuario) => {
        // ev.preventDefault()
        await signin(usuario)
    }

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-slate-100">
      <form className="bg-white border rounded-md flex flex-col gap-9 p-4 sm:p-9 w-[300px] sm:w-[500px]" 
            onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-bold">Linkeados</h1>
        {error && error.map((err,index) => {
          <p key={index} className="bg-red-500 text-white p-2">{err}</p>
        })}

        <input
          type="email"
          name="email"
          className="p-2 border rounded-md"
          placeholder="Introduce tu correo..."
          {...register("email")}
          id="email"
        />
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
        <div className="flex justify-between items-center">
        <p>¿No tienes una cuenta aún?</p>
        <button
          type="button"
          onClick={handleGoRegister}
          className=" text-blue-500"
        >
          Registrarse
        </button>
        </div>
        
      </form>
    </main>
  );
}
