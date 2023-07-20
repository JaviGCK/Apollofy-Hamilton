
import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/navbar/NavBar'
import { SoundBar } from '../components/soundBar/SoundBar'
import { UserContextProvider } from '../context/UserContextProvider'

export const Layout = () => {
  return (
    <>
      <UserContextProvider>
        <Outlet />
        <SoundBar />
        <NavBar />
      </UserContextProvider>
    </>
  )
}
