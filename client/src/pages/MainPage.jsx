import React, { useEffect } from 'react'
import Header from '../components/Header'
import LinksComponent from '../components/LinksComponent'
import ProfileComponent from '../components/ProfileComponent'
import Details from '../components/Details'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLinks } from '../context/LinkContext'

export default function MainPage() {
  const location = useLocation()
  const { user } = useAuth()
  const { link, getLinks } = useLinks()

  useEffect(() => {
    getLinks()
    console.log("links: ",link)
  },[])


  const renderComponents = () => (
    location.pathname === '/links'
      ? <LinksComponent getLinks={getLinks} link={link}/>
      : <ProfileComponent/>
  )

  return (
    <main className="w-screen h-screen grid grid-cols-3 grid-rows-9 gap-4 bg-slate-100 p-4">
      <Header />
      <Details user={user} link={link}/>
      {renderComponents()}
    </main>
  )
}
