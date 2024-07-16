import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import { AuthProvider } from './context/AuthContext';
import { LinkProvider } from './context/LinkContext';
import ProtectedRoute from './components/ProtectedRoute';
import LinkPage from './pages/LinkPage';
import ShareLinkPage from './pages/ShareLinkPage';

function App() {
  return (
    <AuthProvider>
      <LinkProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<div>No existe esta pagina</div>} />

            <Route element={<ProtectedRoute />}>
              <Route path="links" element={<MainPage />} />
              <Route path="perfil" element={<MainPage />} />
            </Route>
            
            <Route path="/profile/:username" element={<LinkPage />} />
            <Route path="/user/:username" element={<ShareLinkPage />} />

          </Routes>
          </BrowserRouter>
      </LinkProvider>
    </AuthProvider>
  );
}

export default App;
