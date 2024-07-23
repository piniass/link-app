import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import LinksComponent from '../components/LinksComponent'
import ProfileComponent from '../components/ProfileComponent'
import Details from '../components/Details'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLinks } from '../context/LinkContext'
import { Toaster } from 'react-hot-toast'
import AsideMenu from '../components/AsideMenu'

export default function MainPage() {
  const location = useLocation()
  const { link, getLinks } = useLinks()
  const [asideMenuVisible, setAsideMenuVisible] = useState(false)

  useEffect(() => {
    getLinks()
    // console.log("links: ", link)
  }, [])

  const toggleAsideMenu = () => {
    setAsideMenuVisible(!asideMenuVisible)
  }

  const renderComponents = () => (
    location.pathname === '/links'
      ? <LinksComponent getLinks={getLinks} link={link} />
      : <ProfileComponent />
  )

  return (
    <main className="w-screen h-screen grid grid-cols-3 grid-rows-9 gap-4 bg-slate-100 p-4 relative">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <Header toggleAsideMenu={toggleAsideMenu} />
      <Details link={link} />
      {renderComponents()}
      <AsideMenu isVisible={asideMenuVisible} toggleAsideMenu={toggleAsideMenu} />
    </main>
  )
}
