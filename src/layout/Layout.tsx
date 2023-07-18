
import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/navbar/NavBar'
import { SoundBar } from '../components/soundBar/SoundBar'

export const Layout = () => {
  return (
    <>
      <Outlet />
      <SoundBar />
      <NavBar />
    </>
  )
}
