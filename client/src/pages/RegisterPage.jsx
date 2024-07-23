import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster, toast } from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { signup, isAuthenticated, error } = useAuth();

    const handleGoRegister = () => {
        navigate("/");
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/links');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (usuario) => {
        await toast.promise(
            signup(usuario),
            {
                loading: 'Cargando...',
                success: <b>Usuario creado con éxito</b>,
                error: <b>No se pudo crear el usuario</b>,
            }
        );
    };

    return (
        <main className="w-screen h-screen flex items-center justify-center bg-slate-100">
            <Toaster position="bottom-center" reverseOrder={false} />
            <form className="bg-white border rounded-md flex flex-col gap-9 p-4 sm:p-9 w-[300px] sm:w-[500px]" 
                onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-xl font-bold">Crear usuario</h1>
                
                <input
                    type="text"
                    name="username"
                    className="p-2 border rounded-md"
                    placeholder="Introduce tu nombre de usuario..."
                    {...register("username", { required: "El nombre de usuario es obligatorio" })}
                    id="username"
                />
                {errors.username && <p className="text-red-500 text-left">{errors.username.message}</p>}
                
                <input
                    type="email"
                    name="email"
                    className="p-2 border rounded-md"
                    placeholder="Introduce tu correo..."
                    {...register("email", { required: "El correo es obligatorio" })}
                    id="email"
                />
                {errors.email && <p className="text-red-500 text-left">{errors.email.message}</p>}
                
                <input
                    type="password"
                    name="pwd"
                    className="p-2 border rounded-md"
                    placeholder="Introduce tu contraseña..."
                    {...register("password", { required: "La contraseña es obligatoria" })}
                    id="pwd"
                />
                {errors.password && <p className="text-red-500 text-left">{errors.password.message}</p>}
                
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                    Crear Usuario
                </button>
                {error && error.map((err, index) => (
                    <p key={index} className="text-red-500 text-left">{err}</p>
                ))}
                <button
                    type="button"
                    onClick={handleGoRegister}
                    className="text-blue-500 p-2 rounded-md hover:bg-blue-500 hover:text-white"
                >
                    Volver al inicio
                </button>
            </form>
        </main>
    );
}
