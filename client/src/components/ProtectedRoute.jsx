import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function ProtectedRoute() {
    const {loading, user, isAuthenticated} = useAuth()
    console.log(loading, isAuthenticated)
    if(!loading && !isAuthenticated) return <Navigate to='/' replace/>
  return (
    <Outlet/>
  )
}
