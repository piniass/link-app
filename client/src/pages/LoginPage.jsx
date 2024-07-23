import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const { signin, isAuthenticated, error,clearErrors } = useAuth()

  useEffect(() => {
    clearErrors(); // Limpiar errores cuando el componente se monta
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/links')
    }
  }, [isAuthenticated])

  const handleGoRegister = () => {
    navigate("/register");
  };

  const onSubmit = async (usuario) => {
    // ev.preventDefault()
    await signin(usuario)
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-slate-100">
      <form className="bg-white border rounded-md flex flex-col p-4 sm:p-9 w-[300px] sm:w-[500px]"
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-bold">Linkeados</h1>


        <input
          type="email"
          name="email"
          className="p-2 border rounded-md my-5"
          placeholder="Introduce tu correo..."
          {...register("email", { required: "El correo es obligatorio" })}
          id="email"
        />
        {errors.email && <p className="text-red-500 text-left">{errors.email.message}</p>}

        <input
          type="password"
          name="pwd"
          className="p-2 border rounded-md my-5"
          placeholder="Introduce tu contraseña..."
          {...register("password", { required: "La contraseña es obligatoria" })}
          id="pwd"
        />
        {errors.email && <p className="text-red-500 text-left">{errors.email.message}</p>}
        {error && error.map((err, index) => (
          <p key={index} className="text-red-500 text-left">{err}</p>
        ))}
        <button type="submit" className="my-5 bg-blue-500 text-white p-2 rounded-md">
          Iniciar sesion
        </button>
        
        {error && console.log("error:", error)}
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
