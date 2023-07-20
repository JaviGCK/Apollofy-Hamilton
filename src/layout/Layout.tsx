
import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/navbar/NavBar'
import { SoundBar } from '../components/soundBar/SoundBar'
import { UserContextProvider } from '../context/UserContextProvider'
import { TrackListContextProvider } from '../context/TrackListContextProvider'
import { ListDetailContextProvider } from '../context/ListDetailContextProvider'

export const Layout = () => {
  return (
    <>
      <UserContextProvider>
        <TrackListContextProvider>
          <ListDetailContextProvider>
            <Outlet />
            <SoundBar />
            <NavBar />
          </ListDetailContextProvider>
        </TrackListContextProvider>
      </UserContextProvider>
    </>
  )
}
