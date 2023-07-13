
import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/navbar/NavBar'

export const Layout = () => {
  return (
    <>
      <Outlet/>
      <NavBar />
    </>
  )
}
