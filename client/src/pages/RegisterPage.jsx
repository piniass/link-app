import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
    const {register, handleSubmit, formState: { errors }} = useForm()
    const navigate = useNavigate();
    const {signup,isAuthenticated, error} = useAuth()

    const handleGoRegister = () => {
        navigate("/");
    };

    useEffect(() => {
      if(isAuthenticated){
        navigate('/links')
      }
    }, [isAuthenticated])

    const onSubmit = async(usuario) => {
        await signup(usuario)
    }
  return (
    <main className="w-screen h-screen flex items-center justify-center bg-slate-100">
        <form className="bg-white border rounded-md flex flex-col gap-9 p-4 sm:p-9 w-[300px] sm:w-[500px]" 
            onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-bold">Crear usuario</h1>
        
        <input
          type="text"
          name="username"
          className="p-2 border rounded-md"
          placeholder="Introduce tu nombre de usuario..."
          {...register("username")}
          id="username"
        />
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
          Crear Usuario
        </button>
        <button
          type="button"
          onClick={handleGoRegister}
          className="border border-blue-500 text-blue-500 p-2 rounded-md hover:bg-blue-500 hover:text-white"
        >
          Volver al inicio
        </button>
      </form>
    </main>
  )
}
