import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <div>Registrarse</div>,
    },
    {
      path: "*",
      element: <div>No existe esta pagina</div>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App
